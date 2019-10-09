//请求后台数据填充页面
new Vue({
    el: "#main",
    data() {
        return {
            res: [{
                    title: "",
                    details: "",
                    price: 0,
                    pic: "",
                    href: ""
                },
                {
                    title: "",
                    details: "",
                    price: 0,
                    pic: "",
                    href: ""
                },
                {
                    title: "",
                    details: "",
                    price: 0,
                    pic: "",
                    href: ""
                }
            ],
            ifshow: true,
            nowindex: 0,
            imgArray: []

        }

    },
    methods: {
        goto(index) {
            this.ifshow = true;
            this.nowindex = index;
        },
        getlist() {
            axios.get("http://127.0.0.1:3000/index/list").then(res => {
                //  this.imgArray=res.data;
                for (var i = 0; i < res.data.length; i++) {
                    this.imgArray[i] = res.data[i].img
                }
            })
        }

    },
    mounted() {
        setInterval(() => {
            this.nowindex++
            if (this.nowindex === this.imgArray.length) {
                this.nowindex = 0;
            } else {
                this.nowindex + 1
            }
        }, 2000)
    },
    created() {
        this.getlist(),
        axios.get(
                "http://127.0.0.1:3000/index/")
            .then(res => {
                //箭头函数的this会指向继承自外部的this
                this.res = res.data;
                //    console.log(this.res)
            });
         
    },
    computed: {
        // nextindex() {
        //     if (this.nowindex === this.imgArray.length - 1) {
        //         return 0
        //     } else {
        //         return this.nowindex + 1
        //     }
        // }
    }

})

//选项条
jQuery.fn.tab = function () {
    this //侵入
        .children("div.zw-home-titlerow")
        .children("ul:first")
        .addClass("tabs") //ul
        .children("li:first") //第一个li
        .addClass("active")
        .parent().children() //所有的li下的a元素
        .children("a") //a
        .attr("data-toggle", "tab")
        .parent().parent()
        .next().addClass("container") //div
        .children("div:first").addClass("active") //第一个div
    //触发事件的元素
    $(".tabs:has([data-toggle=tab])")
        .on("mouseover", "[data-toggle]", e => {
            var $tar = $(e.target);
            if (!$tar.parent().is(".active")) {
                $tar.parent().addClass("active")
                    .siblings().removeClass("active");
                var id = $tar.attr("data-target");
                $(id).addClass("show")
                    .siblings().removeClass("show");
            }
        })
}
$(function () { ////DOM操作加载完就提前执行,不等css和图片
    //选项卡
    $(".zw-home-wanle .zw-home-ziyouxing-warp").tab();
    $(".zw-home-ziyouxing .zw-home-ziyouxing-warp").tab();
    $(".zw-home-zhuanti .zw-home-ziyouxing-warp").tab();
    $("#zw-home-group .zw-home-ziyouxing-warp").tab();
})