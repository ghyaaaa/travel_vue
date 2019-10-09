$(function(){
    $(`<link rel="stylesheet" href="CSS/i-footer.css">`).appendTo("head")
    $.ajax({
        url:"i-footer.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#i-footer")
            //console.log(res)
        }
    })
})