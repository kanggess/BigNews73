$(function(){
    //1.获取文章分类数据
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function(res){
            //1.2使用模板渲染页面数据
            if(res.status==0){
                var htmlStr=template('categoryList',res);
                $('#category').html(htmlStr)

                //更新全部
                layui.form.render();
            }
        }
    })
})