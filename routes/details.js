const express=require("express");
const router=express.Router();
const pool=require('../pool');

router.get("/",(req,res)=>{
    var tid=req.query.tid;
    var obj={ product:{},categories:[],pics:[]};
    //1.按tid查询一个商品的信息--异步
    (async function(){
        var sql="SELECT * FROM qy_travel_product WHERE tid=?";
        await new Promise(function(open){
            pool.query(sql,[tid],(err,result)=>{
                if (err) throw err;
                obj.product=result[0];
                open();
            })
        })
        //2.按照tid的查询的相同不同的类型
        var sql="SELECT tid,category FROM qy_travel_product WHERE family_id=(SELECT family_id FROM qy_travel_product WHERE tid=?)"
         await new Promise(function(open){
             pool.query(sql,[tid],(err,result)=>{
                 if(err) throw err;
                 obj.categories=result;
                 open();
             })
         })
         //3. 按tid查询图片列表——异步
        var sql=`SELECT * FROM qy_product_pic WHERE product_id=?`;
        await new Promise(function(open){
            pool.query(sql,[tid],(err,result)=>{
                if(err) console.log(err);
                obj.pics=result;
                open(); 
            })
        })
        res.send(obj);//4. 返回结果
    })()
})




module.exports=router;