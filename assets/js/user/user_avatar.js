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
})