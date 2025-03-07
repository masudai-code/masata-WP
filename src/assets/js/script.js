// スクロールアニメーション
$(function () {
  $(".service__title").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).addClass("is-inview");
    }
  });
});

// 文字列の長さをチェックして省略記号を追加
document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".works-list__item-title");

  titles.forEach((title) => {
    const text = title.textContent;
    if (text.length > 24) {
      title.textContent = text.slice(0, 24) + "...";
    }
  });
});
