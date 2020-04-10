; (function ($) {
  function getHeadlineOffset() {
    return $("#main h3, #main h4").map(function () {
      return $(this).offset().top;
    });
  }

  function getTocLink() {
    return $(".toc-wrap .toc-link");
  }

  function getHeaderHeight() {
    return $('#header').height();
  }

  var $tocLinks = getTocLink();
  var headerHeight = getHeaderHeight();
  var headlineInterval = Array.prototype.slice.call(getHeadlineOffset());

  headlineInterval.push(Math.max($(document).height(), $(window).height()));
  headlineInterval = headlineInterval.map(function (i) { return Math.floor(i) });

  $(window).scroll(function () {
    var scrollY = $(window).scrollTop() + headerHeight;

    for (let i = 0; i < headlineInterval.length - 1; i++) {
      var offsetA = headlineInterval[i];
      var offsetB = headlineInterval[i + 1];

      if (scrollY >= offsetA && scrollY < offsetB) {
        $tocLinks.each(function (index) {
          if (index === i) {
            $(this).addClass("toc-link-active");
          } else {
            $(this).removeClass("toc-link-active");
          }
        });
      }
    }
  });
})(jQuery);
