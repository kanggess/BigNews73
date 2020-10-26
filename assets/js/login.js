$(function () {
  // 1. 单击去注册按钮 注册注册页面的显示
  $('.login a').on('click', function () {
    $('.login').hide().next().show()
  })
  // 2. 当单击去登陆按钮  要显示登陆界面
  $('.register a').on('click', function () {
    $('.register').hide().prev().show()
  })
  // 3. 实现校验规则
  // jquery文件向外暴露了一个对象 $或 jquery
  // layui.all.js文件向外暴露了一个对象layui
  var form = layui.form
  form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\''
      }
      // if(/^\d+\d+\d$/.test(value)){
      //   return '用户名不能全为数字';
      // }
    },
    // repass是用来校验两次输入的密码是否一致的问题
    repass: function (value, item) {
      // console.log(value); // value就是确认密码 已经获取到了
      // console.log(item);
      // 3.1 获取第一次输入的密码
      var passValue = $('.myForm .pass').val()
      // console.log(pass);
      // 3.2 进行比较 
      if (value !== passValue) {
        // 3.3 清空两个密码框
        $('.register .myForm .pass,.register .myForm .repass').val('')
        // 3.4 提示信息
        return '两次输入的密码不一致'
      }
    }
//我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    , pass: [  // \d数字
      /^[\d]{6,12}$/
      , '密码必须6到12位数字，且不能出现空格'
    ]
  })

//3.实现注册功能
//3.1给form表单注册submit事件
$(".register .myForm").on("submit",function(e){
  //3.2阻止默认行为
  e.preventDefault()
  //3.3发送ajax请求
  var root="http://ajax.frontend.itheima.net";
  $.ajax({
    type:"post",
    url:root+"/api/reguser",
    data:$(this).serialize(),
    success:function(res){
      //2.4请求成功的时候要显示登录表单
      var layer =layui.layer;
      layer.msg(res.message);
      if(res.status==0){      
        $(".login").show().next().hide();  
      }
    }
  })
})
//5.实现登录
//5.1给form标签注册submit事件
var root="http://ajax.frontend.itheima.net";
$(".login .myForm").on("submit",function(e){
  //5.2阻止form 标签的默认提交行为
e.preventDefault();
//5.3发送ajax请求有数据
$.ajax({
  type:'post',
  url:root+"/api/login",
  data:$(this).serialize(),
  success:function(res){
    //5.4要进行提示
    layer.msg(res.message)
    //5.5如果成功了要跳转主页面
    if(res.status==0){
      location.href='./log.html'
    }
  }
})
})
})