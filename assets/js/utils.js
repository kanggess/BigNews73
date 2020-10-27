//在$.ajaxPrefilter函数内部统一拼接请求路径
$.ajaxPrefilter(function(options){
    //console.log(options);
     // 这个函数中的options选项就包含着$.ajax()函数中的对象数据
     options.url='http://ajax.frontend.itheima.net'+options.url;

     //统一设置token
     //1.只要发送ajax请求就会通过这个拦截器中的options拿到所有的参数
     //2.登录和注册是不需要携带tokan的
     //3.因此我们可以根据url中是否存在'/my'来判断是否要携带token
     if(options.url.includes("/my")){
         options.headers={
            'Authorization':window.localStorage.getItem('token')
        }
         
     }
})