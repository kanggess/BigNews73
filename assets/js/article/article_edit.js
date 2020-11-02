$(function(){
    // 1. 启用富文本编辑器
    initEditor()
 
    // 2. 创建裁切区
    // 2.1 获取裁剪区域的 DOM 元素
    var $img = $('#image')
  
    // 2.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 400 / 280,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 2.3 创建裁剪区域
    $img.cropper(options)
 
 
    // 3. 文章分类数据的渲染
   // 3.1 立即发送ajax请示
   $.ajax({
     type: 'get',
     url: '/my/article/cates',
     success: function (res) {
       // console.log(res)
       // 3.2 将数据渲染到下拉列表当中
       if (res.status == 0) {
         var htmlStr = template('categoryList', res)
         $('#category').html(htmlStr)
 
         // 重新渲染一下表单内容
         layui.form.render()
 
         //调用方法 进行数据回显
         getArticleDataById()
       }
     }
   })
 
   // 4. 待编辑文章的数据回显
   // 4.1 获取待编辑文章的id
   var artcileId = location.search.slice(4)
   // console.log('当前待编辑的文章id为:'+artcileId);
 
    // 4.2 向服务器端发送请示
    function getArticleDataById() {
     $.ajax({
       type: 'get',
       url: '/my/article/' + artcileId,
       success: function (res) {
         console.log(res)
         // 4.3 渲染文章数据
         if (res.status == 0) {
           layui.form.val('myForm', {
             Id: res.data.Id,  // 隐藏域Id
             title: res.data.title,
             cate_id: res.data.cate_id
           })
           // 富文本编辑中的数据需要单独来渲染
          tinyMCE.activeEditor.setContent(res.data.content)
           // 渲染图片
           $('#image')
             .cropper('destroy')      // 销毁旧的裁剪区域
             .attr('src','http://ajax.frontend.itheima.net' + res.data.cover_img)  // 重新设置图片路径
             .cropper(options)
         }
       }
     })
   }
   
   // 5. 图片的本地预览功能
 
   // 5. 更新文章
   // 5.1 给form表单注册click事件
   $('.btn').on('click', function (e) {
     // 5.2 阻止默认行为
     e.preventDefault()
     // console.log(e.target);
     // 5.3 准备数据
     var data = new FormData($('.myForm')[0])
 
     // 5.4 判断此文章是什么状态 '发布' '草稿'
     if ($(this).hasClass('btn-release')) {
       // 说明是 发布
       data.append('state', '已发布')
     } else {
       // 说明是 草稿
       data.append('state', '草稿')
     }
 
     $img
     .cropper('getCroppedCanvas', {
       width: 400,
       height: 280
     })
     .toBlob(function(blob) {
       // 将裁剪之后的图片，转化为 blob 对象
       data.append('cover_img', blob)
       data.append('content',tinyMCE.activeEditor.getContent())
       // 发起请求，把文章信息保存到服务器
       $.ajax({
         method: 'POST',
         url: '/my/article/edit',
         processData: false,
         contentType: false,
         data: data,
         success: function(res) {
           if (res.status !== 0) {
             return layer.msg('发表文章失败！')
           }
           // 发表文章成功之后，立即跳转到文章列表页面
           location.href = './article_list.html'
         }
       })
     })
 
   })
 })