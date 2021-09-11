(function ($) {
  let $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  function startSearchAnim() {
    isSearchAnim = true;
  }

  function stopSearchAnim(callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  }

  $('#nav-search-btn').on('click', function () {
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function () {
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });
})(jQuery);
