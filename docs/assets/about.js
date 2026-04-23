const chars = "!@#$%^&*()_+-=.<>?/~[]";

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function animateScrambleOnce(el, targetText) {
  let i = 0;
  let scrambleFrame = 0;
  const SCRAMBLE_LIMIT = 2;

  function step() {
    if (!el.isConnected) return;

    if (i < targetText.length) {
      if (scrambleFrame < SCRAMBLE_LIMIT) {
        el.textContent = targetText.slice(0, i) + randomChar();
        scrambleFrame++;
        setTimeout(step, 35);
      } else {
        el.textContent = targetText.slice(0, i + 1);
        i++;
        scrambleFrame = 0;
        setTimeout(step, 35);
      }
      return;
    }

    el.textContent = targetText;
  }

  step();
}

function initAboutName() {
  const nameEl = /** @type {HTMLElement | null} */ (document.querySelector("[data-about-name]"));
  if (!nameEl || nameEl.dataset.scrambleInit) return;

  nameEl.dataset.scrambleInit = "true";
  const targetText = nameEl.dataset.aboutName || (nameEl.textContent || "").trim() || "Vithor";
  nameEl.textContent = "";
  animateScrambleOnce(nameEl, targetText);
}

initAboutName();
document.addEventListener("astro:page-load", initAboutName);
