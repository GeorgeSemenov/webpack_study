$(document).ready(function(){
  var $window = $(window);
  $(".navigation__content").removeClass("preload");
  $window.scroll(function () {//При скроле меняется цвет 
    if (($window.scrollTop()>=($window.height()-100)) && ($(window).width()>=767) ){
      $(".navigation").addClass('navigation_desktop-theme_dark navigation_desktop-theme_small-logo');
    }
    else{
      $(".navigation").removeClass('navigation_desktop-theme_dark navigation_desktop-theme_small-logo');
    }
  })

  /*При клике на ссылку навигации прокручивает к нужному сектору*/
  $(".navigation__item").click(function(){
    $("body,html").stop(true,false).animate({
      scrollTop:$("#" + $(this).data('target')).offset().top
    },1000);
  })
})