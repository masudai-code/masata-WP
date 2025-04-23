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
      direction: "vertical",
      loop: true,
      speed: 2000,
      slidesPerView: 1,
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
      if (text.length > 49) {
        el.textContent = text.slice(0, 49) + "...";
      }
    });

    // プラグインを登録
    gsap.registerPlugin(ScrollTrigger);

    // works__title左から右へ出現
    gsap.from(".works__title", {
      x: -100, // 開始位置（左に100px）
      opacity: 0, // 開始時は透明
      duration: 1, // アニメーション時間（秒）
      scrollTrigger: {
        trigger: ".works", // アニメーション開始のトリガー要素
        start: "top 70%", // アニメーション開始位置
      },
    });

    // works-list__itemを上からふわっと出現
    gsap.fromTo(
      ".works__list", // アニメーションさせる要素
      {
        y: -100, // アニメーション開始前の縦位置(下に100px)
        autoAlpha: 0, // アニメーション開始前は透明
      },
      {
        y: 0, // アニメーション後の縦位置(上に100px)
        autoAlpha: 1, // アニメーション後に出現(透過率0)
        duration: 1, // アニメーションの時間（必要に応じて調整）
        ease: "power2.out",
        stagger: 0.2, // 各要素のアニメーション開始を0.2秒ずつずらす
        scrollTrigger: {
          trigger: ".works__list", // アニメーションが始まるトリガーとなる要素
          start: "top 70%", // アニメーションの開始位置
        },
      }
    );

    // news__title左から右へ出現
    gsap.from(".news__title", {
      x: -100, // 開始位置（左に100px）
      opacity: 0, // 開始時は透明
      duration: 1, // アニメーション時間（秒）
      scrollTrigger: {
        trigger: ".news", // アニメーション開始のトリガー要素
        start: "top 70%", // アニメーション開始位置
      },
    });

    // news__menuを下からふわっと出現
    gsap.fromTo(
      ".news__menu", // アニメーションさせる要素
      {
        y: 50, // アニメーション開始前の縦位置(下に100px)
        autoAlpha: 0, // アニメーション開始前は透明
      },
      {
        y: 0, // アニメーション後の縦位置(上に100px)
        autoAlpha: 1, // アニメーション後に出現(透過率0)
        duration: 1, // アニメーションの時間（必要に応じて調整）
        ease: "power2.out",
        stagger: 0.2, // 各要素のアニメーション開始を0.2秒ずつずらす
        scrollTrigger: {
          trigger: ".news__title", // アニメーションが始まるトリガーとなる要素
          start: "top 70%", // アニメーションの開始位置
        },
      }
    );

    // news__listを上からふわっと出現
    gsap.fromTo(
      ".news__list", // アニメーションさせる要素
      {
        y: -60, // アニメーション開始前の縦位置(下に100px)
        autoAlpha: 0, // アニメーション開始前は透明
      },
      {
        y: 0, // アニメーション後の縦位置(上に100px)
        autoAlpha: 1, // アニメーション後に出現(透過率0)
        duration: 1, // アニメーションの時間（必要に応じて調整）
        ease: "power2.out",
        stagger: 0.2, // 各要素のアニメーション開始を0.2秒ずつずらす
        scrollTrigger: {
          trigger: ".news-menu__item", // アニメーションが始まるトリガーとなる要素
          start: "top 70%", // アニメーションの開始位置
        },
      }
    );

    // sub-about__imgを下からふわっと出現（先に実行）
    gsap.fromTo(
      ".sub-fv__img", // アニメーションさせる要素
      {
        y: 100, // アニメーション開始前の縦位置(下に100px)
        autoAlpha: 0, // アニメーション開始前は透明
      },
      {
        y: 0, // アニメーション後の縦位置(上に100px)
        autoAlpha: 1, // アニメーション後に出現(透過率0)
        duration: 1, // アニメーションの時間（必要に応じて調整）
        ease: "power2.out",
        stagger: 0.2, // 各要素のアニメーション開始を0.2秒ずつずらす
        scrollTrigger: {
          trigger: ".sub-fv", // アニメーションが始まるトリガーとなる要素
          start: "top 70%", // アニメーションの開始位置
        },
      }
    );

    // sub-about左から右へ出現（遅延させて後から実行）
    gsap.from(".sub-fv__title", {
      x: -100, // 開始位置（左に100px）
      opacity: 0, // 開始時は透明
      duration: 1, // アニメーション時間（秒）
      delay: 0.5, // 0.5秒遅延させて実行
      scrollTrigger: {
        trigger: ".sub-fv", // アニメーション開始のトリガー要素
        start: "top 70%", // アニメーション開始位置
      },
    });

    // company__swiper(about)
    const companySwiper = new Swiper(".js-company-swiper", {
      loop: true,
      speed: 4000,
      slidesPerView: 2.05,
      spaceBetween: 4,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2.96,
          spaceBetween: 10,
        },
      },
      allowTouchMove: false,
    });
  });
});
