const express = require("express");
const router = express.Router();
const pool = require("../pool");
//功能一 添加数据到我的收藏列表
router.post("/add", (req, res) => {
    var cid = req.body.cid;
    var uname = req.body.uname;
    var title = req.body.title;
    if (!title) {
        res.send({
            code: -1,
            msg: "添加到我的收藏失败了,请刷新页面再试一试"
        })
    }
    var subtitle = req.body.subtitle;
    if (!subtitle) {
        res.send({
            code: -1,
            msg: "添加到我的收藏失败了,请刷新页面再试一试"
        })
    }
    var price = req.body.price;
    if (!price) {
        res.send({
            code: -1,
            msg: "添加到我的收藏失败了,请刷新页面再试一试"
        })
    }
    var old_price = req.body.price;
    var sold_count = req.body.sold_count;
    var md_pic = req.body.md_pic;
    var uid = req.body.uid;
    var tid = req.body.tid;
    if(!tid) {
        res.send({
            code:-1,
            msg:"添加到我的收藏失败了,请刷新页面再试一试"
        })
    }
    var sql = "INSERT INTO `qy_collection`(`cid`, `uname`, `title`, `subtitle`, `price`, `old_price`, `sold_count`, `md_pic`, `uid`, `tid`) VALUES (null,?,?,?,?,?,?,?,?,?)";
    pool.query(sql, [uname, title, subtitle, price, old_price, sold_count, md_pic, uid, tid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                msg: "加入购物车成功"
            })
        } else {
            res.send({
                code: -1,
                msg: "加入购物车失败,请检查一下再试试吧!!"
            })
        }
    });
});
//功能二 删除数据 我的收藏列表
router.post("/delete", (req, res) => {
    var tid = req.body.tid;
    var sql = "DELETE FROM `qy_collection` WHERE tid = ?";
    pool.query(sql, [tid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                msg: "删除成功"
            })
        } else {
            res.send({
                code: -1,
                msg: "删除失败,请检查后再试"
            })
        }
    })
});
//功能三 查询收藏列表
router.get("/searchlist",(req,res)=>{
    var uname = req.query.uname;
    var sql = "SELECT `uname`, `title`, `subtitle`, `price`, `old_price`, `sold_count`, `md_pic`, `uid`, `tid` FROM `qy_collection` WHERE uname = ?";
    pool.query(sql,[uname],(err,result)=>{
       if(err) throw err;
    if(result.length>0){
       res.send({code:1,data:result,msg:"当前收藏列表"});
    }else{
        res.send({code:-1,data:result,msg:"当前收藏列表还没有任何东西哦,请去看看有没有喜欢的呢"})
    }
    });
});
//功能四 查询当前产品是否收藏在购物车中
router.get("/iscollection",(req,res)=>{
    var uname = req.query.uname;
    var tid = req.query.tid;
    var sql = "SELECT  `uname`, `title`, `subtitle`, `price`, `old_price`, `sold_count`, `md_pic`, `uid`, `tid` FROM `qy_collection` WHERE uname = ? AND tid = ?";
    pool.query(sql,[uname,tid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:"你已经收藏了这个产品,请到收藏列表看看吧"})
        }else{
            res.send({code:-1,msg:"当前收藏列表中没有这个商品哦,喜欢就赶紧收藏吧"})
        }
    })

});

module.exports = router;