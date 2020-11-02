$(function () {
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
  
    //  3. 渲染文章分类数据
    // 3.1 直接发送ajax请求 获取分类数据
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        // 3.2 使用模板渲染页面数据
        if (res.status == 0) {
          var htmlStr = template('categoryList', res)
          $('#category').html(htmlStr)
  
          //更新全部
          layui.form.render()
        }
      }
    })
  
    // 4. 单击选择封面的按钮弹出选择图片对话框
    // 4.1 给选择封面按钮注册事件
    $('.btn-upload').on('click', function (e) {
      e.preventDefault()
      // 4.2 弹出选择图片的窗口
      $('#avatar').click()
    })
  
    // 5. 实现图片的本地预览功能
    // 5.1 给input标签注册change事件
    $('#avatar').on('change', function () {
      // 5.2 获取待上传的图片
      var file = this.files[0]
      // 5.3 生成图片的链接
      var imgUrl = URL.createObjectURL(file)
      // 5.4 实现本地预览功能 需要先销毁之前的 然后再显示新的
      $('#image')
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', imgUrl)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })
  
  
    // 6. 添加文章  已发布 草稿
    // 6.1 给两个按钮同时注册事件  获取数据  new FormData(form)
    $('.btn').on('click', function (e) {
      // 6.2 阻止默认行为
      e.preventDefault()
      // 6.3 准备数据
      var formData = new FormData($('.myForm')[0])
      // 6.4 判断当前是哪个按钮触发
      // console.log(this);
      // console.log(e.target);
      if($(this).hasClass('btn-release')){
        // 当前单击的是'已发布'按钮
        formData.append('state','已发布')
      }else {
        // 当前单击的按钮就是 '存为草稿'
        formData.append('state','草稿')
      }
  
      // 6.5 准备图片的二进制数据
      $('#image').cropper('getCroppedCanvas', {
        width: 400,
        height: 280
      })
      .toBlob(function(blod){
        // 有二进制图片数据了
        formData.append('cover_img',blod)
        // 将富文本编辑器的数据重新获取 添加到formData当中
        formData.append('content',tinyMCE.activeEditor.getContent()) 
        // 6.6 发送Ajax请求
        $.ajax({
          type:'post',
          url:'/my/article/add',
          data:formData,
          // 注意: FormData的数据发送给服务器的时候，一定一定一定要添加下面这两行代码
          contentType:false, // 不要添加那种请求头格式 'applica....'
          processData:false, // 内部不要转换成查询字符串
          success:function(res){
            // 6.7 提示用户是否成功
            layer.msg(res.message)
            // 6.8 如果成功则要跳转到列表页
            if(res.status == 0){
              location.href = './article_list.html'
            }
          }
        })
      })
  
    })
  
  })