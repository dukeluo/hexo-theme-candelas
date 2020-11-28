(function ($) {
  let $banner = $('#cover #banner');
  let bannerUrls = $banner.attr('data-banners').split(';');
  let randomBannerUrl = bannerUrls[Math.floor(Math.random() * bannerUrls.length)];

  $banner.css('background-image', 'url(' + randomBannerUrl + ')');
})(jQuery);
