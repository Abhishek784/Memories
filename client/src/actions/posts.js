import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api';



export const getPosts=()=>async(dispatch)=>{

    try{
        const {data}= await api.fetchPost();

        dispatch({type: FETCH_ALL, payload:data});

    }catch(error){
        console.log(error.message);
    }
   
}
export const createPost=(post)=> async (dispatch)=>{

    console.log(post);
    try{
        
        const {data} =await api.createPost(post);

        dispatch({type:CREATE, payload:data});
    }
    catch(error){
        console.log("error");
    }
}

export const updatePost=(id, post)=> async (dispatch)=>{

    //console.log(post);
    try{
        
        const {data} =await api.updatePost(id, post);

        dispatch({type:UPDATE, payload:data});
    }
    catch(error){
        console.log("error");
    }
}

export const deletePost=(id)=> async (dispatch)=>{

    //console.log(post);
    try{
        console.log("id=",id);
        const response =await api.deletePost(id);

        dispatch({type:DELETE, payload:id});
    }
    catch(error){
        console.log(error);
    }
}

// export const likePost=(id)=> async (dispatch)=>{

//     console.log(id);
//     try{
//         const {data} =await api.likePost(id);
//         console.log("data=",data);
//         dispatch({type:UPDATE, payload:id});
//     }
//     catch(error){
//         console.log(error);
//     }
// }
export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};


export default api;