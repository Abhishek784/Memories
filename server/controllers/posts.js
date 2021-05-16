var PostMessage =require('../models/postMessage.js');
var mongoose =require('mongoose');

var uploadImage= require('../components/Uploader')


 const getPosts=async (req,res)=>{
    try{

        const postMessages=await PostMessage.find();
        res.status(200).json(postMessages);

    }catch(error){
        res.status(404).json({message:error.message});
    }
}


 const createPost=async(req,res)=>{

    let body=req.body;
    console.log("file-->",req.files,body);

    let file=req.files.selectedFile;
    // var ext = file.name.slice(file.name.lastIndexOf('.'));
    // var fileName = Date.now() + ext;
    let imageFullPath="";
    uploadImage(file,async (err,result)=>{
        if(result){
            
           body.selectedFile=await result.imageFullPath
            console.log("path=",result.imageFullPath);
            imageFullPath=result.imageFullPath
        }
        
    })
    console.log("img=",imageFullPath)
    const newPost=new PostMessage(body);
        try{
            await newPost.save();
            res.status(201).json(newPost);
        }catch(error){
            res.status(409).json({message:error.message});
        }

    
    console.log("body=",body,"imagepath=",imageFullPath);
   
}

 const updatePost=async(req,res)=>{

    const {id:_id} =req.params;
    const post=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id"); 

    const updatedPost= await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new: true});

    res.json(updatedPost);
}

 const deletePost=async(req,res)=>{
    console.log("fghjjgffgfs");
    const {id} =req.params;

    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id"); 

    const deletedPost= await PostMessage.findByIdAndRemove(id);

    res.json({message: "post deleted successfully"});
}

//  const likePost=async(req,res)=>{
//    console.log("like");
//     const {id} =req.params;

//     console.log(id);
//     if(!mongoose.Types.ObjectId.isValid(id))
//         return res.status(404).send("No post with that id"); 

//     const post= await PostMessage.findById(id);
//     const updatedPost= await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new: true});

//     res.json({updatedPost});
// }



 const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

module.exports={getPosts,createPost,likePost,updatePost,deletePost}