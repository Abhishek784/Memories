var fs = require('fs')
var path = require('path')
var async = require('async')


const uploadImage=(file, cb)=>{
    ////console.log('id uploader--',id,file)

    if (!file) {
    ////console.log('id uploader--',file)

      return cb(null,null);
    }
    var date = new Date();
    // var newFileName =
    //   StringHelper.randomString(7) +
    //   StringHelper.getExt(file.name || file.filename);
    var ext = file.name.slice(file.name.lastIndexOf('.'))
    var fileName =
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString() +
      date.getDate().toString() +
      date.getHours().toString() +
      date.getMinutes().toString() +
      date.getSeconds().toString() +
      "_"+ext ;


    // var ext = file.name.slice(file.name.lastIndexOf('.'));
    // var fileName = Date.now() + ext;

    let dir= path.resolve(__dirname, '../uploads/images');

   // var dir = path.join(imageTempFolder + "/" + module + "/" + id);
    
    //console.log('dir--',dir)

    if (!fs.existsSync(dir)){
      UtilsHelper.mkdirpSync(dir,'0777');
    }

    var fileFullPath = dir + "/" + fileName;
    //console.log('fileFullPath--',fileFullPath)

    async.auto({
      imageFullPath: function(callback){
        file.mv(fileFullPath, function(err) {
          //console.log('error--',err)
          if (err) {
            return cb(err);
          }
          
          callback(null, fileFullPath);
        });
      },
      
    }, function(err, result){
         //console.log('result---',result)
      cb(err, result);
    });
}

module.exports= uploadImage;

