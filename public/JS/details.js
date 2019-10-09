var vm = new Vue({
    el: "#app",
    data() {
        return {
            res: {
                product: [{
                    category: "",
                    departure: "",
                    price: "",
                    promise: "",
                    prompt: "",
                    sold_count: "",
                    subtitle: "",
                    title: "",
                    tid: "",
                    product_number: ""
                }, ],
                pics: [{
                    sm: "",
                    md: ""
                }, {
                    sm: "",
                    md: ""
                }, {
                    sm: "",
                    md: ""
                }, {
                    sm: "",
                    md: ""
                }, {
                    sm: "",
                    md: ""
                }, {
                    sm: "",
                    md: ""
                }, {
                    sm: "",
                    md: ""
                }, ],
                categories: [{
                    category: ""
                }, {
                    category: ""
                }, {
                    category: ""
                }, ],
            },
            aduts_count: 1,
            child_count: 1,
        }
    },
    methods: {
        modifed(i, e) {
            this.aduts_count += i;
            var input = document.querySelectorAll(".input_count_i");
            var aduts_input_i = input[0];
            var child_input_i = input[1];
            if (this.aduts_count <= 1) {
                this.aduts_count = 1;
                e.currentTarget.classList.add("disabled");
            } else if (this.aduts_count > 1) {
                aduts_input_i.classList.remove("disabled");
            }
        },
        child_modifed(i, e) {
            this.child_count += i;
            var input = document.querySelectorAll(".input_count_i");
            var child_input_i = input[1];
            if (this.child_count <= 0) {
                this.child_count = 0;
                e.currentTarget.classList.add("disabled");
            } else if (this.aduts_count > 1) {
                child_input_i.classList.remove("disabled");
            }
        },
    },
  computed:{
     total_price(){
         return this.res.product.price/2*this.child_count+this.res.product.price*this.aduts_count
     }
   },
    created() {
        if (location.search.indexOf("tid=") != -1) {
            //?tid=50
            var tid = location.search.split("=")[1];
            this.tid = tid;
            axios.get(
                `http://127.0.0.1:3000/details?tid=${tid}`,
            ).then(res => {
                console.log(res.data)
                this.res = res.data;
            })
        }
    },
    mounted() {
        (async function () {
            var $prev = $(".img_slide>div>p:first>img");
            var $next = $(".img_slide>div>p:last>img");
            var $ul = $(".sm_img_list");
            var moved = 0,
                LIWIDTH = 85;
            //往左移动
            $next.click(function () {
                var $next = $(this);
                //如果当前按钮不是禁用的
                if (!$next.is(".disabled")) {
                    moved++;
                    $ul.css("marginLeft", -LIWIDTH * moved);
                    $prev.removeClass("disabled");
                    if ($ul.children().length - 3 == moved) {
                        $next.addClass("disabled")
                    }
                }
            })
            //往右移动
            $prev.click(function () {
                var $prev = $(this);
                if (!$prev.is(".disabled")) {
                    moved--;
                    $ul.css("marginLeft", -LIWIDTH * moved);
                    $prev.removeClass("disabled");
                    if (moved == 0) {
                        $prev.addClass("disabled")
                    } else {
                        $next.removeClass("disabled")
                    }
                }
            })
            //更换图片
            var $limg = $(".lg_img>img");
            $ul.on("mouseover", "img", function () {
                var md = $(this).attr("data-md");
                $limg.attr("src", md);
            })
        })();
    }
});