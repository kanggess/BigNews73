// $(function (){
//   // 1. 实现登陆与注册界面的切换
//   // 1.1 当单击'去注册账号'按钮的时候显示注册界面而隐藏登陆界面
//   $(".login a").on("click",function(){
//     // hide隐藏
//     // next找到下一个a
//     // show显示
//    $(".login").hide().next().show();
//   });
//   $(".register a").on("click",function(){
//     $(".register").hide().prev().show();
//   })
// })

$(function(){
  $(".login a").on("click",function(){
    $(".login").hide().next().show();
  });
  $(".register a").on("click",function(){
    $(".register").hide().prev().show();
  })
})