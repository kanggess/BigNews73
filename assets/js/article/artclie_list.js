$(function () {
    // 1. 获取文章分类数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            // 1.2 使用模板渲染页面数据
            if (res.status == 0) {
                var htmlStr = template('categoryList', res)
                $('#category').html(htmlStr)

                //更新全部
                layui.form.render()
            }
        }
    })

 //把文章列表的参数单独提出来，因为后面会变化
    var params = {

        pagenum: 1,    // 页码值
        pagesize: 3,// 每页显示的条数
        // cate_id:, 不写就是空 也就是默认是全部分类
        // state: 
        cate_id: $('#category').val(),
        state: $('#state').val()
    }
    renderList()
   //2.文章列表页中的列表数据渲染
    function renderList() {
        //2.1立即发送ajax请求
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: params,
            success: function (res) {
                console.log(res);
                // 2.2 使用模板进行渲染
                if (res.status == 0) {
                    var htmlStr = template('articleList', res)
                    $('tbody').html(htmlStr)

                    //启用分页插件
                    renderPage(res)
                }
            }
        })
    }
    //3.实现文章选功能要根据条件进行选
    //3.1给form表单注册submit事件
    $('.myForm').on("submit", function (e) {
        //3.2阻止默认提交行为
        e.preventDefault()

        //3.3获取最新
        params.cate_id=$('#category').val()
        params.state=$('#state').val()

        renderList()
        //3.3发送ajax请求需要带上参数
        // $.ajax({
        //     type: 'get',
        //     url: '/my/article/list',
        //     data: {
        //         pagenum: 1,
        //         pagesize: 3,
        //         cate_id: $('#category').val(),  //下拉菜单中的数据预示用val方法来获取input  select
        //         state: $("#state").val()
        //     },
        //     success: function (res) {
        //         //3.4渲染文章列表
        //         if (res.status == 0) {
        //             var htmlStr = template('articleList', res)
        //             $('tbody').html(htmlStr)
        //         } 
        //     }
 
       // }) 
    })
//实现分页功能
   function renderPage(res){
    var laypage = layui.laypage;
  
    //执行一个laypage实例
    laypage.render({
      elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
      ,count: res.total //数据总数，从服务端得到
      ,limit:params.pagesize  //当前页面显示的条数
      ,curr:params.pagenum//当前页码值
      ,limits:[2,3,5,10] //下拉选项
      ,groups:1//连连出现的页码值
      ,layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']

    //   count（总条目输区域）、prev（上一页区域）、page（分页区域）、next（下一页区域）、limit（条目选项区域）、refresh（页面刷新区域。注意：layui 2.3.0 新增） 、skip（快捷跳页区域）
        ,jump: function(obj,first){
            //obj包含了当前分页的所有参数，比如
            // console.log(obj.curr);//得到当前页，以便向服务端请求对应页的数据
            // console.log(obj.limit);//得到每页显示的条数

            params.pagenum=obj.curr//当前被单击的页码值
            params.pagesize=obj.limit //当前被单击页面显示的条数

            //首页不执行
            if(!first){
                renderList()
            }
        }
    });
   }

   //5.删除文章
   //5.1给删除按钮注册事件委托到的方式
   $('tbody').on('click','.btn-del',function(){
       //5.2获取文章的id
       var articleId=$(this).data('id')
      
       //5.7获取当前页的文章数量
       var count=$('tbody .btn-del').length
       //5.3弹出访问框
       layer.confirm('是否要真的删除此条文章', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            url:'/my/article/delete/'+articleId,
            type:'get',
            success:function(res){
                //5.5提示用户的是否成功
                layer.msg(res.message)
                //5.6如果成功则要重新渲染页面
                if(res.status==0){
                   // renderList()

                    //5.8判断显示当前页还是上一页的数据
                    if(count==1){
                        // params.pagenum=params.pagenum==1?1:params.pagenum-1
                        params.pagenum = params.pagenum == 1 ? 1 : params.pagenum - 1
                    }
                    renderList()
                }
            }
        })
        layer.close(index);
      });
   })
})