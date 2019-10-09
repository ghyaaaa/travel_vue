Vue.directive("focus",{
    inserted(el){
        el.focus()
    }
});
new Vue({
    el:"#app",
    data(){
        return{
            res:"",
            uname:"",
            upwd:"",
            email:"",
            phone:"",
            user_name:"",
            gender:"",
            v_code:"",  //当前输入验证码的值
            v_code_num:[], //当前动态生成的验证码
            v_code_text:"请输入验证码,注意大小写",
            promit_register:"",//动态接收服务器返回的注册结果
            v_codeClass:"alert alert-danger",
            unameClass:"alert alert-danger",
            upwdClass:"alert alert-danger",
            emailClass:"alert alert-danger",
            phoneClass:"alert alert-danger",
            user_nameClass:"alert alert-danger",
            orLoign:false,  //是否显示登录按钮
        }
    },
    methods:{
        // 返回指定范围随机数
        rn(min,max) {
            var n = parseInt(Math.random() * (max-min) + min);
            return n
        },
        //返回指定范围颜色
        rc(mix,max){
            var r = this.rn(mix,max);
            var g = this.rn(mix,max);
            var b = this.rn(mix,max);
            return `rgb(${r},${g},${b})`;
        },
        // 验证码
        vify_code(){
            var vify = document.getElementById("vify");
            var ctx = vify.getContext("2d");
            ctx.fillStyle = this.rc(180,230);
            ctx.fillRect(0,0,120,30);
            //创建4个字符
            var pool="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            for(var i=0;i<4;i++) {
                var c =pool[this.rn(0,pool.length)];
                ctx.textBaseline="top";
                ctx.font="23px SimHei";
                ctx.fillStyle=this.rc(80,180);
                ctx.fillText(c,i*28,5);
                // console.log(c)
                this.v_code_num+=c;
            }
            //创建六条干扰线
            for(var i=0;i<6;i++) {
                ctx.beginPath();
                ctx.strokeStyle=this.rc(0,255);
                ctx.moveTo(this.rn(0,120),this.rn(0,30));
                ctx.lineTo(this.rn(0,120),this.rn(0,30));
                ctx.stroke();
            }
            //创建30个干扰点
            for(var i=0;i<30;i++){
                ctx.beginPath();
                ctx.fillStyle=this.rc(0,255);
                ctx.arc(this.rn(0,120),this.rn(0,30),1,0,2*Math.PI);
                ctx.fill();
            }
             
        },
        // 点击变化验证码
        changeCode(){
            this.v_code_num=[];
            this.vify_code();
            
        },
        //注册
        submit() {
            axios.post("http://127.0.0.1:3000/users/register",
            Qs.stringify({
                uname:this.uname,
                upwd:this.upwd,
                email:this.email,
                phone:this.phone,
                user_name:this.user_name,
                gender:this.gender,
            })
            ).then(res=>{
                this.res=res.data;
                if(this.res.code==1){
                    this.promit_register="alert alert-success";
                    this.orLoign=true;
                }else{
                    this.promit_register="alert alert-danger";
                    this.orLoign=false;
                }
                
            })
         
        },
        //登录按钮跳转页面
        login(){
           window.location.href="http://127.0.0.1:3000/login.html";
        }
    },
    created() {
      
    },
    mounted() {
       this.vify_code();
    },
    watch:{
        uname(){
            var reg=/^[0-9a-zA-Z]{6,12}$/;
            if(this.uname.length>6 &&reg.test(this.uname)){
                this.unameClass="alert alert-success";
            }else{
                this.unameClass="alert alert-danger";
            }
        },
        upwd() {
            var reg=/^(?![a-z0-9]+$)(?![A-Za-z]+$)[A-Za-z0-9]{6,8}$/;
            if(this.upwd.length>6 &&reg.test(this.upwd)){
                this.upwdClass="alert alert-success";
            }else{
                this.upwdClass="alert alert-danger";
            }
        },
        email() {
            var reg=/^[^.@]+@[^.@]+\.(com|cn|net)$/;
            if(this.email.length>0&&reg.test(this.email)){
                this.emailClass="alert alert-success";
            }else{
                this.emailClass="alert alert-danger"
            }
        },
        phone() {
            var reg=/^[1][3578][0-9]{9}$/
            if(this.phone.length>0 &&reg.test(this.phone)){
                this.phoneClass="alert alert-success"
            }else{
                this.phoneClass="alert alert-danger"
            }
        },
        user_name() {
           if(this.user_name.length>0 &&this.user_name.length<16){
               this.user_nameClass="alert alert-success"
           }else{
               this.user_nameClass="alert alert-danger"
           }
        },
        v_code() {
           if(this.v_code==this.v_code_num){
               this.v_code_text="验证码正确";
               this.v_codeClass="alert alert-success"
           }    
            else{
                this.v_code_text="请重新输入验证码";
                this.v_codeClass="alert alert-danger"
            }
        },
        gender() {
            
        }
       
    }
})