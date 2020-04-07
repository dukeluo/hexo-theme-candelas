;(function ($) {
  var $banner = $('#cover #banner');
  var bannerUrls = $banner.attr("data-banners").split(';');
  var randomBannerUrl = bannerUrls[Math.floor(Math.random() * bannerUrls.length)];

  $banner.css('background-image', 'url(' + randomBannerUrl + ')');
})(jQuery);
