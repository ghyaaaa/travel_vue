$(function(){
    $(`<link rel="stylesheet" href="CSS/header.css"></link>`).appendTo("head");
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#header");
            new Vue({
                el:"#header",
                data(){
                    return{
                        islogin:false,
                        uanme:""
                    }
                },
                methods:{},
                created() {
                },
                mounted() {
                   axios.get("http://127.0.0.1:3000/users/islogin").then(res=>{
                       if(res.data.ok==1){
                           this.islogin=false;
                           this.uname=res.data.uname;
                           console.log(this.uname)
                       }else{
                           this.islogin=true;
                       }
                   })
                },
            })
            
            var $search=$(".input-group-append img")
             var $input=$(".zw-home-header-search>input");
             $search.click(function(){
                // open("products.html","_self")
                location.href=`http://127.0.0.1:3000/products.html?kw=${$input.val().trim()}`;
            })
            $input.keyup(function(e){
                if(e.keyCode==13){
                    //模拟触发
                    $search.click();
                }
            })
            //地址栏字符串查询
            if(location.search.indexOf("kw=")!=-1){
                var kw=decodeURI(location.search.split("=")[1]);
                $input.val(kw);
            }
        }
    })
});
