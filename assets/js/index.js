$(function () {
    //     getUserInfo()
    //   $function getUserInfo(){
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // headers:{
            //   //  需要在请求头中携带 Authorization
            //     'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1MTgsInVzZXJuYW1lIjoia2FuZ2dlIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MDM3NjA1MjIsImV4cCI6MTYwMzc5NjUyMn0.GxRS5JaR1PaZYkJqX7_fPqocY7DdAlnzPNB5WUHBrqg' 
            //  },
            success: function (res) {
                // console.log(res);
                if (res.status == 0) {
                    //1.2将昵称或用户名与头像渲染到对应位置
                    //左侧欢迎语
                    $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${res.data.nickname ? res.data.nickname : res.data.username}`);
                    //左侧欢迎语的头像位置
                    if (!res.data.user_pic) {
                        //没有头像

                        if (!res.data.nickname) {
                            $('.userInfo .text-avatar,.layui-header .text-avatar').text(res.data.
                                username.slice(0, 1).toUpperCase());
                        } else {
                            $('.userInfo .text-avatar,.layui-header .text-avatar').text(res.data.
                                //文字大写 toUpperCase
                                nickname.slice(0, 1).toUpperCase());
                        }
                    } else {
                        //显示对应的头像
                        $('.userInfo .text-avatar,.layui-header .text-avatar').hide().next().
                            show().attr('src', res.data.user_pic);
                    }
                }
            }
        })

    }
    //一个单独的介绍文件就是一个独立的作用域不同作用域中的数据是不可以直接访问
    //为了让别的作用域能够使用当前使用域的数据，需要将当前作用育德数据向外道出于暴露
    //window是浏览器中顶级对象，在个作用域中是可以直接访问的
    // 将当前的函数，向外暴露一下
    window.getUserInfo = getUserInfo

    //2.退出功能
    //2.1给退出按钮注册事件
    $('.logout').on('click', function () {
        //2.2弹出提示框
        layer.confirm('确定要退出吗', { icon: 3, title: '提示' }, function (index) {
            //do something 
            //2.3单击按钮后要删除本地存储中的token
            window.localStorage.removeItem('token');
            //2.4跳转登录页面
            window.location.href = "./login.html";
            layer.close(index);
        });
    })

})