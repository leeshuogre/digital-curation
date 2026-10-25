import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const progressFill = document.querySelector(".reading-progress-fill");
const main = document.querySelector("main");
const chapters = Array.from(document.querySelectorAll("[data-chapter]"));
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const chapterStatus = document.querySelector(".site-nav");

if (!prefersReducedMotion.matches) {
  gsap.utils.toArray("[data-reveal]").forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      },
    );
  });

  if (main && progressFill) {
    gsap.fromTo(
      progressFill,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      },
    );
  }
}

chapters.forEach((chapter, index) => {
  ScrollTrigger.create({
    trigger: chapter,
    start: "top 48%",
    end: "bottom 48%",
    onToggle: (self) => {
      if (!self.isActive) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === "#" + chapter.id;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      if (chapterStatus) {
        chapterStatus.dataset.activeChapter = String(index + 1);
      }
    },
  });
});

const entryChoices = Array.from(document.querySelectorAll("[data-entry-choice]"));
const pollStatus = document.querySelector("#poll-status");
let initialImpression = "";

entryChoices.forEach((button) => {
  button.addEventListener("click", () => {
    initialImpression = button.dataset.entryChoice ?? "";
    entryChoices.forEach((choice) => {
      choice.setAttribute("aria-pressed", String(choice === button));
    });
    if (pollStatus) {
      pollStatus.textContent = "已記下你的入場印象。離場時可以回來看看是否想補充。這項選擇不會自行送出。";
    }
  });
});

const feedbackForm = document.querySelector("#feedback-form");
const feedbackInput = document.querySelector("#reflection-input");
const feedbackConsent = document.querySelector("#feedback-consent");
const feedbackSubmit = document.querySelector("#feedback-submit");
const feedbackStatus = document.querySelector("#feedback-status");
const characterCount = document.querySelector("#character-count");
const endpoint = (import.meta.env.VITE_FEEDBACK_ENDPOINT ?? "").trim();

function isAppsScriptEndpoint(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      url.pathname.startsWith("/macros/s/") &&
      url.pathname.endsWith("/exec");
  } catch {
    return false;
  }
}

const endpointConfigured = isAppsScriptEndpoint(endpoint);
if (feedbackSubmit) {
  feedbackSubmit.disabled = !endpointConfigured;
}
if (feedbackStatus && endpointConfigured) {
  feedbackStatus.textContent = "回饋連線已設定；送出後請由主辦者確認試算表是否新增紀錄。";
}

feedbackInput?.addEventListener("input", () => {
  if (characterCount) {
    characterCount.textContent = feedbackInput.value.length + " / 280";
  }
});

feedbackForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!endpointConfigured || !feedbackInput || !feedbackConsent?.checked || !feedbackStatus || !feedbackSubmit) {
    return;
  }

  feedbackSubmit.disabled = true;
  feedbackSubmit.textContent = "送出中…";
  feedbackStatus.textContent = "正在送出匿名回饋。";

  const body = new URLSearchParams();
  body.set("reflection", feedbackInput.value.trim());
  body.set("initialImpression", initialImpression);
  body.set("consent", "true");

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      body,
    });
    feedbackForm.reset();
    initialImpression = "";
    entryChoices.forEach((choice) => choice.setAttribute("aria-pressed", "false"));
    if (characterCount) characterCount.textContent = "0 / 280";
    feedbackStatus.textContent = "送出請求已完成。瀏覽器無法讀取 Apps Script 的寫入結果，請由主辦者確認試算表紀錄。";
  } catch {
    feedbackStatus.textContent = "目前無法送出。請稍後再試，或直接告知展覽主辦者。";
  } finally {
    feedbackSubmit.disabled = false;
    feedbackSubmit.innerHTML = '送出匿名回饋 <span aria-hidden="true">↗</span>';
  }
});
