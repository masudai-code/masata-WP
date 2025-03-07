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
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
    });

    // service__titleスクロールしたときのアニメーション
    $(window).on("scroll load", function () {
      $(".service__title").each(function () {
        var position = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        // 要素が画面内に現れるタイミング（＋余裕を100pxで設定）
        if (scroll > position - windowHeight + 110) {
          $(this).addClass("animate");
        }
      });
    });

    // works-list__item-titleの文字数を全角24文字(半角45文字)に制限
    document.querySelectorAll(".works-list__item-title").forEach(function (el) {
      const text = el.textContent;
      if (text.length > 45) {
        el.textContent = text.slice(0, 45) + "...";
      }
    });

    // works__title左から右へ出現
    gsap.from(".works__title", {
      x: -100, // 開始位置（左に100px）
      opacity: 0, // 開始時は透明
      duration: 1, // アニメーション時間（秒）
      scrollTrigger: {
        trigger: ".works", // アニメーション開始のトリガー要素
        start: "top 110px", // アニメーション開始位置
        markers: true, // マーカー表示
      },
    });
  });
});
