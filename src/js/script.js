jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる// ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-drawer").toggleClass("is-open");

      // ドロワーが開いたときにロゴを変更
      if ($(".js-drawer").hasClass("is-open")) {
        $(".header__logo img").attr("src", "./assets/images/common/logo02.svg");
      } else {
        $(".header__logo img").attr("src", "./assets/images/common/logo01.svg");
      }
    });

    $(".js-drawer a[href]").on("click", function () {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").removeClass("is-open");
      $(".header__logo img").attr("src", "./assets/images/common/logo01.svg");
    });

    // resizeイベント
    $(window).on("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        // PC表示時はメニューを閉じる
        $(".js-hamburger").removeClass("is-open");
        $(".js-drawer").removeClass("is-open");
        $(".header__logo img").attr("src", "./assets/images/common/logo01.svg");
      }
    });

    // FV
    const fv__swiper = new Swiper(".js-fv-swiper", {
      // direction: "vertical",
      // loop: true,
      // speed: 2000,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
      allowTouchMove: false,
    });
  });
});
