jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる// ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-drawer").toggleClass("is-open");

      // ドロワーが開いたときにロゴを変更（遅延を追加）
      if ($(".js-drawer").hasClass("is-open")) {
        setTimeout(function () {
          $(".header__logo img").attr(
            "src",
            "./assets/images/common/logo02.svg"
          );
        }, 200); // 0.5秒の遅延
      } else {
        // 閉じるときは遅延なし
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

    // スマホ表示時のみnews-list__textの文字数を制限する関数
    function truncateNewsText() {
      if (window.matchMedia("(max-width: 767px)").matches) {
        // スマホ表示時のみ実行
        $(".news-list__text").each(function () {
          const text = $(this).text();
          if (text.length > 63) {
            $(this).text(text.slice(0, 63) + "...");
          }
        });
      } else {
        // PC表示時は46文字で制限
        $(".news-list__text").each(function () {
          const originalText = $(this).attr("data-original-text");
          if (originalText) {
            if (originalText.length > 69) {
              $(this).text(originalText.slice(0, 69) + "...");
            } else {
              $(this).text(originalText);
            }
          }
        });
      }
    }

    // 初期表示時に元のテキストを保存
    $(".news-list__text").each(function () {
      $(this).attr("data-original-text", $(this).text());
    });

    // 初期表示時にも実行
    truncateNewsText();

    // リサイズ時にも実行
    $(window).on("resize", function () {
      truncateNewsText();
    });

    // sub-news-blog__article-textの文字数を制限する関数
    function truncateArticleText() {
      $(".sub-news-blog__article-text").each(function () {
        const text = $(this).text();
        if (text.length > 65) {
          $(this).text(text.slice(0, 65) + "...");
        }
      });
    }

    // 初期表示時に実行
    truncateArticleText();

    // リサイズ時にも実行
    $(window).on("resize", function () {
      truncateArticleText();
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

    // works-list__item-titleの文字数を全角24文字(半角45文字)に制限（TOPページ用）
    document
      .querySelectorAll(
        ".works-list__item-title:not(.works-list__item-title--sub)"
      )
      .forEach(function (el) {
        const text = el.textContent;
        if (text.length > 49) {
          el.textContent = text.slice(0, 49) + "...";
        }
      });

    // works-list__item-title--subの文字数を制限（worksページ用）
    function truncateWorksTitle() {
      document
        .querySelectorAll(".works-list__item-title--sub")
        .forEach(function (el) {
          const text = el.textContent;
          const isPc = window.matchMedia("(min-width: 768px)").matches;

          if (isPc) {
            // PC表示時：35文字で改行、71文字以降は点々
            if (text.length > 71) {
              const firstLine = text.slice(0, 35);
              const secondLine = text.slice(35, 71) + "...";
              el.textContent = firstLine + "\n" + secondLine;
            } else if (text.length > 35) {
              // 35文字を超えるが71文字未満の場合：改行のみ
              const firstLine = text.slice(0, 35);
              const secondLine = text.slice(35);
              el.textContent = firstLine + "\n" + secondLine;
            }
          } else {
            // スマートフォン表示時：51文字で点々
            if (text.length > 51) {
              el.textContent = text.slice(0, 51) + "...";
            }
          }
        });
    }

    // 初期表示時に実行
    truncateWorksTitle();

    // リサイズ時にも実行
    $(window).on("resize", function () {
      truncateWorksTitle();
    });

    // // sub-works-list__item-titleの文字数を48文字に制限
    // document
    //   .querySelectorAll(".sub-works-list__item-title")
    //   .forEach(function (el) {
    //     const text = el.textContent;
    //     const isPc = window.matchMedia("(min-width: 768px)").matches;
    //     const maxLength = isPc ? 92 : 51;
    //     if (text.length > maxLength) {
    //       el.textContent = text.slice(0, maxLength) + "...";
    //     }
    //   });

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

    // current-itemの文字数を10文字に制限
    document.querySelectorAll(".current-item").forEach(function (el) {
      const text = el.textContent;
      if (text.length >= 10) {
        el.textContent = text.slice(0, 10) + "...";
      }
    });
  });
});
