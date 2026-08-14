const goals = {
  app: {
    goal: "Build a useful mobile app",
    perspectiveTitle: "Prove the problem before adding more",
    perspective: "More features will not help until you know which problem users care enough to solve.",
    stepTitle: "Ask five people about the last time it happened",
    step: "Listen for the words they use, what they tried, and what the problem cost them in time or money."
  },
  restaurant: {
    goal: "Open a restaurant people return to",
    perspectiveTitle: "Build around a reason to come back",
    perspective: "A broad menu matters less than giving the right local customers a strong reason to choose you again.",
    stepTitle: "Compare three nearby restaurants at their busiest time",
    step: "Note who visits, what they order, how long they stay, and what seems to bring regular customers back."
  },
  repair: {
    goal: "Bring more clients to an auto repair shop",
    perspectiveTitle: "Find where interested customers stop",
    perspective: "More visibility will not solve a booking problem if callers do not get a fast answer, a useful estimate, or a reason to trust the shop.",
    stepTitle: "Review the last twenty customer inquiries",
    step: "Count how many asked for a quote, how many booked, and the most common point where the conversation ended."
  },
  carwash: {
    goal: "Open a self-service car wash",
    perspectiveTitle: "Make access part of the demand test",
    perspective: "Drivers may like the idea but still avoid a site that is hard to enter, leave, notice, or use during busy hours.",
    stepTitle: "Observe the location during three traffic periods",
    step: "Record visibility, entry turns, queues nearby, and how easily a driver could decide to stop without planning ahead."
  },
  skill: {
    goal: "Turn a useful skill into income",
    perspectiveTitle: "Sell the result before packaging the skill",
    perspective: "People are more likely to pay for a specific improvement than for a broad description of what you know.",
    stepTitle: "Write one offer for one type of person",
    step: "Name the problem, the result you can help create, what is included, and a simple way to test interest this week."
  },
  store: {
    goal: "Grow an online store",
    perspectiveTitle: "Find the product people return for",
    perspective: "More traffic helps only when shoppers quickly understand the product and trust the reason to buy it from you.",
    stepTitle: "Review your ten most recent product visits",
    step: "Compare what people viewed, where they left, and which questions were unanswered before checkout."
  },
  product: {
    goal: "Turn an idea into a real product",
    perspectiveTitle: "Test the smallest useful version",
    perspective: "A focused version can reveal what people value before you spend time building everything you imagined.",
    stepTitle: "Describe the first useful outcome",
    step: "Choose one person, one problem, and one result the first version must deliver well."
  },
  freelance: {
    goal: "Find better freelance clients",
    perspectiveTitle: "Make your value easier to recognize",
    perspective: "The right clients respond faster when your offer names a specific problem and the result you can help create.",
    stepTitle: "Rewrite your offer around one result",
    step: "State who you help, the outcome they receive, and one example that proves you can deliver it."
  }
};

const analyticsConsentKey = "WB_WebsiteAnalyticsConsent_V1";
const consentBanner = document.querySelector("[data-consent-banner]");
let analyticsLoaded = false;
let analyticsEnabled = false;

function readAnalyticsConsent() {
  try {
    return window.localStorage.getItem(analyticsConsentKey);
  } catch {
    return null;
  }
}

function writeAnalyticsConsent(value) {
  try {
    window.localStorage.setItem(analyticsConsentKey, value);
  } catch {
    // The choice still applies for the current page when storage is unavailable.
  }
}

function ensureGoogleTag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
}

function loadAnalytics() {
  ensureGoogleTag();
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted"
  });
  analyticsEnabled = true;
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  const host = window.location.hostname.toLowerCase();
  const measurementId = host.endsWith("wealthboost.ai") ? "G-2ZBGXN292R" : "G-1YTLLMRDJE";
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

function setAnalyticsConsent(value) {
  writeAnalyticsConsent(value);
  ensureGoogleTag();
  if (value === "granted") {
    loadAnalytics();
  } else {
    analyticsEnabled = false;
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied"
    });
  }
  consentBanner?.setAttribute("hidden", "");
}

ensureGoogleTag();
window.gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied"
});

const storedAnalyticsConsent = readAnalyticsConsent();
if (storedAnalyticsConsent === "granted") {
  loadAnalytics();
} else if (storedAnalyticsConsent === null) {
  consentBanner?.removeAttribute("hidden");
}

document.querySelector("[data-consent-accept]")?.addEventListener("click", () => {
  setAnalyticsConsent("granted");
});

document.querySelector("[data-consent-decline]")?.addEventListener("click", () => {
  setAnalyticsConsent("denied");
});

document.querySelectorAll("[data-consent-open]").forEach((button) => {
  button.addEventListener("click", () => consentBanner?.removeAttribute("hidden"));
});

const menuButton = document.querySelector("[data-menu-button]");
const mobileNavigation = document.querySelector("[data-mobile-nav]");
const siteHeader = document.querySelector("[data-site-header]");
const guidanceDemo = document.querySelector("[data-guidance-demo]");
let guidanceTimer;

function setMenu(open) {
  if (!menuButton || !mobileNavigation) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  mobileNavigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileNavigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.addEventListener("click", (event) => {
  if (!mobileNavigation?.classList.contains("is-open")) return;
  if (siteHeader?.contains(event.target)) return;
  setMenu(false);
});

function updateHeader() {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function updateGuidance(key, shouldScroll) {
  const content = goals[key];
  if (!content || !guidanceDemo) return;

  document.querySelectorAll(".goal-picker-button").forEach((button) => {
    const selected = button.dataset.goalChoice === key;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  window.clearTimeout(guidanceTimer);
  guidanceDemo.classList.add("is-changing");

  guidanceTimer = window.setTimeout(() => {
    guidanceDemo.querySelector("[data-guidance-goal]").textContent = content.goal;
    guidanceDemo.querySelector("[data-guidance-perspective-title]").textContent = content.perspectiveTitle;
    guidanceDemo.querySelector("[data-guidance-perspective]").textContent = content.perspective;
    guidanceDemo.querySelector("[data-guidance-step-title]").textContent = content.stepTitle;
    guidanceDemo.querySelector("[data-guidance-step]").textContent = content.step;
    guidanceDemo.classList.remove("is-changing");
  }, 180);

  if (shouldScroll) {
    window.setTimeout(() => {
      document.querySelector("#personalized")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}

document.querySelectorAll("[data-goal-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    updateGuidance(button.dataset.goalChoice, button.classList.contains("goal-bubble"));
  });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".faq-list details").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) return;
    document.querySelectorAll(".faq-list details[open]").forEach((other) => {
      if (other !== details) other.open = false;
    });
  });
});

document.querySelectorAll(".download-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (analyticsEnabled && typeof window.gtag === "function") {
      window.gtag("event", "app_store_click", {
        link_location: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page"
      });
    }
  });
});

document.querySelectorAll(".apps-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (analyticsEnabled && typeof window.gtag === "function") {
      window.gtag("event", "explore_apps_click", {
        link_location: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page"
      });
    }
  });
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
