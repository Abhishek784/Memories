var express = require('express');
var bodyParser = require('body-parser');
// var _path  = require('path');
// var bodyParser = require('body-parser');

//var _path2 = _interopRequireDefault(_path);

//fileTempFolder=_path2.default(__dirname, './uploads/');

var {getPosts,createPost, updatePost,deletePost,likePost} = require('../controllers/posts.js')



// var  multipart = require("connect-multiparty");
// var multipartMiddleware = multipart();

//var upload = multer({ dest: 'uploads/' })

  


const router=express.Router();

// router.use(multipartMiddleware)
//router.use(upload.single('selectedFile'))
//router.use(express.json());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost',likePost)


module.exports = router;