
Vue.directive("focus", {
    inserted(el) {
        el.focus()
    }
});
new Vue({
    el: "#app",
    data() {
        return {
            res: "",
            uname: "",
            upwd: "",
            login_active: "",
        }
    },
    methods: {
        login() {
            var res = axios.post("http://127.0.0.1:3000/users/signin",
                Qs.stringify({
                    uname: this.uname,
                    upwd: this.upwd
                })
            ).then(res => {
                console.log(res)
                this.res = res.data;
                if (res.data.ok == 0) {
                    this.login_active = "alert alert-danger";
                } else {
                    this.login_active = "alert alert-success";
                    setTimeout(()=>{
                        window.location.href="index.html"
                    },2000)
                }
            })
        }
    }
})