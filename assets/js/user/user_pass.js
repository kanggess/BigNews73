$(function(){
   // var form = layui.form
    layui.form.verify({
        
            // username: function (value, item) { //value：表单的值、item：表单的DOM对象
            //   if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            //     return '密码不能有特殊字符'
            //   }
            //   if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            //     return '密码首尾不能出现下划线\'_\''
            //   }
            //   // if(/^\d+\d+\d$/.test(value)){
            //   //   return '用户名不能全为数字';
            //   // }
            // },
      // repass是用来校验两次输入的密码是否一致的问题
      repass: function (value, item) {
        // console.log(value); // value就是确认密码 已经获取到了
        // console.log(item);
        // 3.1 获取第一次输入的密码
        var passValue = $('.myForm .pass').val()
        console.log(passValue);
        // // 3.2 进行比较 
        if (value !== passValue) {
          //   // 3.3 清空两个密码框
          $('.myForm .pass,.myForm .repass').val('')
          //   // 3.4 提示信息
          return '两次输入的密码不一致'
        }
  
      }
  
      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]ub
      ,pass: [  // \d数字
        /^[\d]{6,12}$/
        , '密码必须6到12位数字，且不能出现空格'
      ]
    })
  
  //2.实现密码的更新
  //2.1给form注册submit事件
  $(".myForm").on("submit",function(e){
    //2.2阻止默认提交行为
    e.preventDefault();
    //2.3发送ajax请求带上数据
    $.ajax({
        type:'post',
        url:'/my/updatepwd',
        data:$(this).serialize(),
        success:function(res){
            //2.4要提示是否成功
            layer.msg(res.message);
            //2.5清空表单
            if(res.status==0){
                $('.myForm')[0].reset();
            }
        }

    })
  })
  //2.2阻止默认提交行为
  //2.3发送ajax请求 带上数据
  //2.4要提示是否成功
})