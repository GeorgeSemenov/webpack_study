import {SwiperJSBreackpoints} from '../../JS-components/SwiperJSbreakpoints.js';
import Swiper from '../../vendor/swiperJS/swiper-bundle.js';
$(document).ready(function(){
  $(".menu__tab-container").click(function() {
    var listsParent = $(this).parent().siblings('.menu__lists-container');
    var BlockTrigger = $(this).data("trigger");
    
    listsParent.children(".menu__list").removeClass("menu__list_active");
    listsParent.children(`.menu__list[data-trigger= ${BlockTrigger} ]`).addClass("menu__list_active");

    $(this).siblings(".menu__tab-container").removeClass("menu__tab-container_active"); //заберет актив у всех ссылок
    $(this).addClass("menu__tab-container_active"); //присвоит нужной
  });

  SwiperJSBreackpoints({
    desWidth: '(min-width:991px)',
    carouselName: '.menu',
    spvMobile: 3,
    spvTablet: 5,
    spvDesktop: 6
  })
  // swiper = new Swiper('.menu', {
  //     slidesPerView: 2,
  //     spaceBetween: 0,
  //     breakpoints:{
  //       510:{
  //         slidesPerView: 5,
  //       },
  //       1100:{
  //         slidesPerView: 6,
  //       }
  //     }
  //   });
})
