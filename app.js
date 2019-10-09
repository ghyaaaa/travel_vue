const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const axios = require("axios");
//引入上传文件模块
const multer = require("multer");
const fs = require("fs");
//引入路由模块
const index = require("./routes/index");
const users = require("./routes/users");
const details = require("./routes/details");
const prodcuts = require("./routes/products");
const collection = require("./routes/collection");
const comment = require("./routes/comment");

var app = express();
//加载处理跨域模块
const cors = require("cors");
//允许那个地址跨域访问
app.use(cors({
    origin: ['http://localhost:8080','http://127.0.0.1:3001'],
    credentials: true
}));

var server = app.listen(3000);
//使用中间件
app.use(bodyParser.urlencoded({
    extended: false
}));
//托管静态资源到public目录下
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret:'随机字符串',
    resave:false,
    saveUninitialized:true
}));
//配置文件上传 
  //接收上传单个文件  指定目录
  var upload = multer({dest:"public/upload/"});
  //处理上传单个文件
  app.post("/uploads",upload.single("avatar_pic"),(req,res)=>{
      var f = req.file;//获取上传的文件信息
      console.log(f)
      //要求1 如果文件大小超过1MB 不允许上传
      var size = f.size/1024/1021;
      if(size >1){
          res.send({code:-1,msg:"图片太大了,不能超过 2MB"});
          return
      }
      //要求2 如果文件不是图片  不允许上传
      var type = f.mimetype;
      var i2 = type.indexOf("image");
      if(i2 == -1){
          res.send({code:-2,msg:"只能上传图片哦"});
          return
      }
      //创建新的文件名
      var src = f.originalname;//先获取原名字
      var i1 = src.lastIndexOf(".");//获取名字中最后一个点的下标位置
      var suffix = src.substring(i1,src.length);//截取后缀名;
      var newFileName = "./public/upload/"+new Date().getTime();
      newFileName += Math.floor(Math.random()*9999);
      newFileName += suffix;
      //3.将临时文件移动到upload目录下保存
       fs.renameSync(f.path,newFileName);
       res.send({code:1,msg:"保存成功"})
  });

//挂载路由
app.use("/index", index);
app.use("/users", users);
app.use("/details", details);
app.use("/products", prodcuts);
app.use("/collection",collection);
app.use("/comment",comment);