$(document).ready(function(){
  $(".main-screen__downward").click(function(){
    $("body,html").stop(true,false).animate({
      scrollTop:$("#" + $(this).data('screen-to-go')).offset().top
    },1000);
  })
})