const express=require("express");
const router=express.Router();
const pool=require("../pool");

//获取主页产品消息
router.get("/",(req,res)=>{
    var sql=`SELECT * FROM qy_index_product WHERE seq_recommended!=0 ORDER BY seq_recommended`;
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        //跨域访问
        // res.writeHead(200,{
        //     "Access-Control-Allow-Origin":"*"
        // })
        // res.write(JSON.stringify(result))
        // res.end()
        res.send(result);
    })
});
//获取轮播
router.get("/list",(req,res)=>{
    var sql = "SELECT `cid`, `img`, `title`, `href` FROM `qy_index_carousel` WHERE 1";
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
router.get("/recommend",(req,res)=>{
    (async function(){
        var pno = parseInt(req.query.pno);
        var pageSize = parseInt(req.query.pageSize);
        if(!pno){pno=1};
        if(!pageSize){pageSize=4};
        var data = {pno,pageSize};
        var sql = "SELECT count(qid) AS c from qy_index_product";
        await new Promise(function(resolve){
            pool.query(sql,[],(err,result)=>{
                if(err) throw err;
                var pageCount = Math.ceil(result[0].c/pageSize);
                data.pageCount = pageCount;
                resolve();
            })
        })
        var offset = parseInt((pno-1)*pageSize);
        var sql = "SELECT qid,details,pic,tid,price FROM `qy_index_product` LIMIT ?,?";
        pool.query(sql,[offset,pageSize],(err,result)=>{
            if(err) throw err;
            data.products = result;
            res.send({code:1,data})
        })
    })()
})

module.exports=router;