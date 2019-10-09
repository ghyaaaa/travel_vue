const express = require("express");
const router = express.Router();
const pool = require("../pool");

//注册功能
router.post("/register", (req, res) => {
    var uid = req.body.uid;
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var email = req.body.email;
    var phone = req.body.phone;
    var user_name = req.body.user_name;
    var gender = req.body.gender;
    var reg2 = /^[0-9a-zA-Z]{6,12}$/
    if (!uname) {
        res.send({
            code: -1,
            msg: "用户名格式不正确哦,请检查后再输入哦"
        })
        return
    };
    var reg = /^(?![a-z0-9]+$)(?![A-Za-z]+$)[A-Za-z0-9]{6,8}$/ //6-8位数字,字母结合,至少包含一个大写字母和数字;
    if (!upwd || !reg.test(upwd)) {
        res.send({
            code: -1,
            msg: "密码格式不正确,请检查后再输入哦"
        })
        return
    };
    if (!email) {
        res.send({
            code: -1,
            msg: "邮箱格式不正确,请检查后再输入哦"
        })
        return
    };
    var reg1 = /^[1][3578][0-9]{9}$/
    if (!phone || !reg1.test(phone)) {
        res.send({
            code: -1,
            msg: "手机号码格式不正确,请检查后再输入"
        })
        return
    };
    if (!user_name) {
        res.send({
            code: -1,
            msg: "用户姓名不能为空,请检查后再输入"
        })
        return
    };
    if (!gender) {
        res.send({
            code: -1,
            msg: "用户性别不能为空,请检查后重新输入哦"
        })
        return
    };
    var sql = "INSERT INTO `qy_user`(`uid`, `uname`, `upwd`, `email`, `phone`, `user_name`, `gender`) VALUES (null,?,?,?,?,?,?)";
    pool.query(sql, [ uname, upwd, email, phone, user_name, gender], (err, result) => {
        if (err) throw err;
        if (affectedRows = 1) {
            res.send({
                code: 1,
                msg: `注册成功,欢迎${uname}!请点击登录按钮登录`
            })
        }
    })
});
//注册验证用户名不能为一样
router.get("/verify",(req,res)=>{
    var uname = req.query.uname;
    if(!uname){
        res.send({code:-1,msg:'用户名不能为空'});
        return
    }
    var sql = "SELECT  `uname`,`phone` FROM `qy_user` WHERE uname=?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw  err;
        console.log(result.length);
        if(result.length!=0){
            res.send({code:-2,msg:"用户名已存在,换一个再试试"})
        }else{
            res.send({code:1,msg:"用户名可用"})
        }

    });
});
//登录功能 --带session
router.post("/signin", (req, res) => {
    var {
        uname,
        upwd
    } = req.body;
    var sql = "select *from qy_user where uname=? and upwd=?";
    pool.query(sql, [uname, upwd], (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
            req.session.uid=result[0].uid;//获取session
                res.write(JSON.stringify({
                    ok: 1,
                    msg: `登录成功,将跳转到主页.....`
                }));
        } else {
            res.write(JSON.stringify({
                ok: 0,
                msg: "用户名或者密码错误"
            }))
        }
        res.end();

    })
});
//验证是否登录 带session
router.get("/islogin",(req,res)=>{
    if(req.session.uid!==undefined){
        var uid=req.session.uid;
        var sql = "select * from qy_user where uid=?";
        pool.query(sql,[uid],(err,result)=>{
            if(err) throw err;
            res.send({ok:1,uname:result[0].uname,uid:result[0].uid})
        })
    }else{
        res.send({ok:0})
    }
});
router.get("/signout",(req,res)=>{
    req.session.uid=undefined;
    res.send();
});
module.exports = router;