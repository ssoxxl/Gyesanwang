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
    if (!toggle) {
      return;
    }

    if (theme === "dark") {
      toggle.textContent = "◐";
      toggle.setAttribute("aria-label", "밝은 화면으로 전환");
    } else {
      toggle.textContent = "◑";
      toggle.setAttribute("aria-label", "어두운 화면으로 전환");
    }
  }

  function bootTheme() {
    applyTheme(getTheme());

    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-theme-toggle]");
      if (!button) {
        return;
      }

      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  function bindCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(function (button) {
      button.addEventListener("click", async function () {
        const value = button.getAttribute("data-copy");
        const original = button.textContent;

        try {
          await navigator.clipboard.writeText(value);
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
