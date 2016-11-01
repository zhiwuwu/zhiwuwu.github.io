$(function () {
  function resize() {
    var windowWidth = $(window).width();

    var isMobile = windowWidth < 768;
    $('#main_ad > .carousel-inner > .item').each(function (i,item) {
      var $item = $(item);
      var imgSrc =
        isMobile ? $item.data('image-xs') : $item.data('image-lg');
      $item.css('backgroundImage', 'url("' + imgSrc + '")');
      // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
      if (isMobile) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
      }
    });
  }
  $(window).on('resize', resize).trigger('resize');
})
