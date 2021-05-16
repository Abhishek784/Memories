var express =  require('express');
var bodyParser =  require('body-parser');
var mongoose =  require('mongoose');
var dotenv =  require('dotenv');
var cors =  require('cors');
var path =  require('path');

var fileUpload =  require('express-fileupload');
var cookieParser =  require('cookie-parser');


var postRoutes =  require('./routes/posts.js');

const app=express();
dotenv.config();

// var  multipart =  require('connect-multiparty');
// app.use(multipart());
// app.use(express.json());


app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

app.use('/images',express.static(path.join(__dirname ,'/uploads')));

app.use(function (req, res, next) {

    req.setEncoding('utf8');
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, user_id, authtoken, authorization");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.setHeader("Access-Control-Allow-Credentials", true);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(cors()); 

app.use(fileUpload());

app.use(cookieParser());


app.use('/posts', postRoutes);

app.get('/',(req,res)=>{
    res.send("Hello to memories API");
})

const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=>{console.log(err)});

mongoose.set('useFindAndModify', false);










// var express = require('express');
// var fileUpload = require('express-fileupload');
// var mongoose = require('mongoose');
// var bodyparser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var path = require('path');
// var methodOverride = require('method-override');
// var _ = require('lodash');

// var app = express();



// var postRoutes =require('./routes/posts.js');





// //==============Add middleware necessary for REST API's===============
// app.use(bodyparser.urlencoded(
//     {
//         limit: '50mb',
//         parameterLimit: 100000, 
//         extended: true 
//     }));
// app.use(bodyparser.json());
// app.use(fileUpload());

// app.use(cookieParser());


// app.use(methodOverride('X-HTTP-Method-Override'));


// //===========================CORS support==============================
// app.use(function (req, res, next) {

//     req.setEncoding('utf8');
//     // Website you wish to allow to connect
//     res.setHeader("Access-Control-Allow-Origin", "*");

//     // Request methods you wish to allow
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

//     // Request headers you wish to allow
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, user_id, authtoken, authorization");
//     //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
//     res.setHeader("Access-Control-Allow-Credentials", true);

//     if ('OPTIONS' == req.method) {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });
// //=========================Load the routes===============================

// // var  multipart =require('connect-multiparty');
// //  app.use(multipart());
// app.use('/posts', postRoutes);

// app.get('/',(req,res)=>{
//     res.send("Hello to memories API");
// })

// //===========================Connect to MongoDB==========================
// const PORT=process.env.PORT || 5000;

// mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
//     .then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
//     .catch((err)=>{console.log(err)});

// mongoose.set('useFindAndModify', false);







