; (function ($) {
  function getHeadlineInterval() {
    var offsets = $("#main h3, #main h4").map(function () {
      return $(this).offset().top;
    });
    var interval = Array.prototype.slice.call(offsets);

    interval.push(Math.max($(document).height(), $(window).height()));
    interval = interval.map(function (i) { return Math.floor(i) });

    return interval;
  }

  function getTocLink() {
    return $(".toc-wrap .toc-link");
  }

  function getHeader() {
    return $('#header-inner');
  }

  var $tocLinks = getTocLink();
  var $header = getHeader();
  var prevScrollY = $(window).scrollTop();
  var curScrollY;
  var prevDirection;
  var curDirection = 0;  // 0 - down, 1 - up
  var delta = 5;
  var clickedByToc = false;

  function toggleHeader(direction) {
    if (direction === 0) {
      $header.addClass('header-up');
    } else if (direction === 1) {
      $header.removeClass('header-up');
    }
  }

  function checkScroll(curScrollY) {
    if (Math.abs(curScrollY - prevScrollY) <= delta) {
      return;
    }

    if (clickedByToc) {
      clickedByToc = false;
      return toggleHeader(0);
    }

    if (curScrollY > prevScrollY && curScrollY > $header.height()) {
      curDirection = 0;
    } else if (curScrollY < prevScrollY) {
      curDirection = 1;
    }
    if (curDirection !== prevDirection) {
      toggleHeader(curDirection);
      prevDirection = curDirection;
    }
    prevScrollY = curScrollY;
  }

  function activeTocLink(curScrollY) {
    var headlineInterval = getHeadlineInterval();

    for (let i = 0; i < headlineInterval.length - 1; i++) {
      var offsetA = headlineInterval[i];
      var offsetB = headlineInterval[i + 1];

      if (curScrollY >= offsetA && curScrollY < offsetB) {
        $tocLinks.each(function (index) {
          if (index === i) {
            $(this).addClass("toc-link-active");
          }
          else {
            $(this).removeClass("toc-link-active");
          }
        });
      }
    }
  }

  $(window).scroll(function () {
    curScrollY = $(window).scrollTop();

    checkScroll(curScrollY);
    activeTocLink(curScrollY);
  });

  $tocLinks.click(function () {
    clickedByToc = true;
  });

})(jQuery);
