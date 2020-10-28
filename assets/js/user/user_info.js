$(function () {
    // 1. 发送ajax请求 获取当前登陆的用户的数据
   

    var form = layui.form;
    getUserData();
     // 1.1 直接发送ajax请求
   function getUserData(){
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            //1.2渲染页面
            console.log(res);
            if (res.status == 0) {
                layui.form.val('myForm', res.data);
            }
        }
    })
   }

    //2.开启表单验证

    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '昵称不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '昵称首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '昵称名不能全为数字';
            }
        }
    });

    //3.基本资料更新
    //3.1给form表单注册submit事件
    $(".myForm").on("submit", function (e) {
        //3.2一定要阻止默认提交行为 
        e.preventDefault();
        //3.3发送ajax请求里面是有数据
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            //serialize()表单序列化会将form标签内的所有的具有name属性的值一并获取并拼接成字符串
            data: $(this).serialize(),
            success: function (res) {
                //console.log(res);
                layer.msg(res.message)
                if (res.status == 0) {
                    //将最新的昵称显示在欢迎语位置
                    //parent在这里表示父页面
                    parent.window.getUserInfo();
                }
            }
        })
    })


    //4.基本资料重置
    //所谓资料重置，就是重新发送ajax请求重新渲染数据
    //4.1给重置按钮注册事件
    $('.btn-reset').on('click',function(e){
        //console.log(123);
        //4.2阻止form标签的默认提交行为
        e.preventDefault();
        //4.3调用方法进行重置
        getUserData();
    })
})