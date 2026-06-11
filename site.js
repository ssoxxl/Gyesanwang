(function () {
  const storageKey = "gyesanwang_theme";

  function getTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.textContent = theme === "dark" ? "◐" : "◑";
      toggle.setAttribute("aria-label", theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환");
    }
  }

  function bootTheme() {
    applyTheme(getTheme());
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-theme-toggle]");
      if (!button) {
        return;
      }
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  function bindCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(function (button) {
      button.addEventListener("click", async function () {
        const value = button.getAttribute("data-copy");
        try {
          await navigator.clipboard.writeText(value);
          const original = button.textContent;
          button.textContent = "복사 완료";
          window.setTimeout(function () {
            button.textContent = original;
          }, 1200);
        } catch (error) {
          window.alert("복사에 실패했습니다. 직접 선택해서 복사해 주세요.");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bootTheme();
    bindCopyButtons();
    const year = document.querySelector("[data-year]");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  });
})();
