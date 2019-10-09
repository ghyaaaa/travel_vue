$(function(){
    $(`<link rel="stylesheet" href="CSS/footer.css"></link>`).appendTo("head");
    $.ajax({
        url:"footer.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#M_footer")
        }
    })
})