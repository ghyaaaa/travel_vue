const express = require("express");
const router = express.Router();
const pool = require("../pool");

//功能一: 添加到评论列表功能
router.get("/add", (req, res) => {
    var com_id = req.query.com_id;
    var uname = req.query.uname;
    if (!uname) {
        res.send({
            code: -1,
            msg: "亲,请登录后再发表您的想法哦"
        })
        return;
    }
    var content = req.query.content;
    var reg = /^[操日妈傻b逼瓜娃麻|(cao)]|[卖买麦]|[批|皮]$/;
    if (reg.test(content)) {
        res.send({
            code: -2,
            msg: "亲,请文明用语哦,有什么事可以慢慢协商嘛"
        })
        return;
    }
    if (content.length < 2) {
        res.send({
            code: -3,
            msg: "亲,你输入的内容太少啦,至少2个字啦"
        })
        return;
    }
    var ctime = req.query.ctime;
    var tid = req.query.tid;
    var sql = "INSERT INTO `product_comment`(`com_id`, `uname`, `content`, `tid`, `ctime`) VALUES (null,?,?,?,now())";
    pool.query(sql, [uname, content, tid, ctime], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 1) {
            res.send({
                code: 1,
                msg: "发表成功"
            })
        } else {
            res.send({
                code: -1,
                msg: "发表失败"
            })
        }
    })

});
//功能二: 查询评论列表并分页
router.get("/searchcomment", (req, res) => {
    (async function () {
        //当前的页数
        var pno = parseInt(req.query.pno);
        if (!pno || pno<=0) {
            pno = 1;
        }
        //当前页数的数量
        var pageSize = parseInt(req.query.pageSize);
        if (!pageSize) {
            pageSize = 5;
        }
        var obj = {
            pno,
            pageSize
        };
        var tid = req.query.tid;
        //1.查询总共商品的页数
        var sql = "SELECT count(com_id) AS c FROM product_comment where tid=?";
        await new Promise(function (open) {
            pool.query(sql, [tid], (err, result) => {
                if (err) throw err;
                var pageCount = Math.ceil(result[0].c / pageSize);
                obj.pageCount = pageCount;
                open();
            });
        });
        //2.当前页内容
        var offset = parseInt((pno-1)*pageSize);
        var sql = "SELECT `com_id`, `uname`, `content`, `ctime` FROM `product_comment` WHERE tid=? ORDER BY `ctime` DESC LIMIT ?,?";
        await new Promise(function (open) {
            pool.query(sql, [tid, offset, pageSize], (err, result) => {
                if (err) throw err;
                obj.comments = result;
                res.send({
                    code: 1,
                    obj
                });
                open()
            })
        })
    })()
});
//功能三:删除某条评论功能
router.get("/delete", (req, res) => {
    var com_id = parseInt(req.query.com_id);
    if (!com_id) {
        res.send({
            code: -1,
            msg: "删除失败,请选择要删除的评论"
        });
        return
    }
    var sql = "DELETE FROM `product_comment` WHERE com_id = '?'"
    pool.query(sql, [com_id], (err, result) => {
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


module.exports = router;