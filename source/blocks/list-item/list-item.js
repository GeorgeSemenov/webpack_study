$(document).ready(function(){
  setTimeout(function(){setDots()}, 1000);
})

function setDots() {
  let circleWidth = 5;
  $('.list-item').each(function(){
    let inner = $(this).children('.list-item__name-and-price');
    let priceWidth = inner.children(".list-item__price").width();
    let dishNameWidth = inner.children(".list-item__dish-name").width();
    let containerWidth = inner.width();
    
    let freeSpaceWidth = containerWidth - priceWidth - dishNameWidth;
    inner.children(".list-item__dots").width(freeSpaceWidth);
    
    let howManyTimes = Math.floor(freeSpaceWidth/(circleWidth*2));
    for (let i = 0; i< howManyTimes; i++){
      inner.children(".list-item__dots").append('<div class= "list-item__dot"></div>');
    }
  })
}