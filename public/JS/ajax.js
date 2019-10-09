function ajax({url,type,data,dataType}){
    return new Promise(function(open,err){
        //1.创建xhr对象
        if(window.XMLHttpRequest){
            xhr=new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject("Microsoft XMLHttp")
        }
       // var xhr=new XMLHttpRequest();
        //2绑定监听事件
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                if(dataType!==undefined&&dataType.toLowerCase()==="json"){
                    var res=JSON.parse(xhr.responseText);
                }else{
                    var res=xhr.responseText;
                }open(res);
            }
        }
        //如果是get请求
        if(type.toLowerCase()=="get"&&data!=undefined){
            url+="?"+data;
        }
        //3打开链接
        xhr.open(type,url,true);
        if(type.toLowerCase()=="post"){
        //增加:设置请求头消息
          xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        //4.发送请求
        if(type.toLowerCase()=="post"&&data!==undefined){
            xhr.send(data);
        }else{
            xhr.send(null);
        }
    })
}
/*
(async function(){
var res=await ajax({
			url:"http://localhost:300/index",
			tpye:"get",
			dataTpye:"json"
})
})();


*/