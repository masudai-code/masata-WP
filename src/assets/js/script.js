// スクロールアニメーション
$(function () {
  $(".service__title").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).addClass("is-inview");
    }
  });
});
