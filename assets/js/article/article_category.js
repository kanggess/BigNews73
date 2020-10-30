$(function () {
    // 1. 获取文章分类数据
    // 1.1 直接发送Ajax请求
    renderTable()
    function renderTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // 1.2 使用模板渲染页面数据
                if (res.status == 0) {
                    var htmlStr = template('categoryList', res)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }

    // 2. 单击添加按钮 弹出添加分类的模态框
    // 2.1 给添加按钮注册事件
    $('.btn-add').on('click', function () {
        // 2.2 弹出模态框
        window.addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: '500px',
            content: $('#addForm').html()  // 弹出框的表单是动态创建出来的
        })
    })

    // 3. 添加文章分类 
    // 3.1 使用委托的方式来注册submit事件 
    // 对于动态创建出来的元素不可以直接 注册事件，是无效的
    $('body').on('submit', '.addForm', function (e) {
        // 3.2 阻止默认请求行为
        e.preventDefault()
        // alert(123)
        // 3.3 发送Ajax请求 获取数据
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // 3.4 添加成功后隐藏模态框
                if (res.status == 0) {
                    layer.close(window.addIndex)

                    // 3.5 重新渲染分类列表 
                    renderTable()
                }

            }
        })
    })
    $("tbody").on("click",".btn-del",function(){
        var categoryId=$(this).data("id")

    // 弹出提示框
    layer.confirm('真的要删除这条分类数据吗', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            type:'get',
            url:'/my/article/deletecate/'+categoryId,
            success:function(res){
                if(res.status==0){
                    // 4.5删除成功后要进行提示
                    layer.msg(res.message)
                    //4.6刷新分类列表数据
                    renderTable();
                }
            } 
        })
        layer.close(index);
      })
})

//更新时单击编辑按钮弹出对话框
//5.1给编辑按钮注册事件使用委托
$('tbody').on('click','.btn-edit',function(){
    //5.2获取当前按钮中的id
    var articleId=$(this).data('id')

    //5.3发送ajax请求
    $.ajax({
        type:'get',
        url:'/my/article/cates/'+articleId,
        success:function(res){
            if(res.status==0){
                //5.4渲染表单
                layui.form.val("myForm",res.data)
            }
        }
    })
    //5.2弹出模框 
    window.editIndex =layer.open({
        type:1,
        title:'更新文章分类',
        area:'500px',
        content:$('#editForm').html()//弹出框的表单是动态创建出来的
    })
})

//6.进行文章分类数据更新
//6.1给表单注册submit事件，注册此时要使用委托的方式
$('body').on('submit','.editForm',function(e){
    //6.2阻止默认提交行为
    e.preventDefault()
    //6.2发送ajax请求
    $.ajax({
        type:'post',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function(res){
            //6.3请求成功后要关闭弹出框
            if(res.status==0){
                layer.close(window.editIndex)
                //6.4刷新文章分类列表
                renderTable()
            }

        }
    })
})  
}) 