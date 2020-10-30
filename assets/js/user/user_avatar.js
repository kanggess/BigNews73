$(function(){
  //1.实现裁切插件初始化
  //由于后面我们会用到这个参数所以将参数占时先提取出来
  $img=$('#image');
  var options={
    aspectRatio:1,//裁切比例
    preview:'.img-preview'
  }
  //调用方法实现初始化
  $img.cropper(options); 


  //2.弹出选择文件的窗口
  //2.1给上传按钮注册事件
  // $(".btn-upload").on("click",function(){
  //   //2.2弹出选择文件的窗口
  //   $("#avatar").click();
  // })
  $('.btn-upload').on('click', function () {
    // 2.2 弹出选择文件的窗口
    $('#avatar').click()
  })
  // //3.预览带上传的图片
  // //3.1给文件按钮注册change事件
  // $("#avatar").on("chenge",function(){
  //   //3.2获取待上传的图片
  //   var avatar=this.files[0];

  //   //3.3生成一个链接
  //   var imgUrl=URL.createObjectURL(avatar);

  //   //3.4显示到img标签内要重新初始化裁切区域
  //   $img.cropper('replace',imgSrc);
  $('#avatar').on('change', function () {

    // 3.2 获取待上传的图片
   var avatar = this.files[0]

    // 3.3 生成一个链接
    var imgUrl = URL.createObjectURL(avatar)

    // 3.4 显示到img标签内 要重新初始化裁切区域
    $img.cropper('replace',imgUrl);
  })
  //4.上传头像
  //4.1给确定按钮注册事件
  $(".btn-sure").on('click',function(e){
    e.preventDefault();
    //4.2生成base64格式的图片链接
    var dataURL=$img
    .cropper('getCroppedCanvas',{  // 创建一个 Canvas 画布
      width:100,
      height:100
    })
    .toDataURL('image/png')   // 将 Canvas 画布上的内容，转化为 base64 格式的字
    //4.3发送ajax请示
    $.ajax({
      type:'post',
      url:'/my/update/avatar',
      data:{
        avatar:dataURL
      },
      success:function(res){
        //4.4更新之后要提示一下
        layer.msg('更新头像成功')
        if(res.status==0){
          //4.5主页面上的头像要进行更替
          parent.window.getUserInfo()
        }
      }
    })
  })
})