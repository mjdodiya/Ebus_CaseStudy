document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav.classList.toggle("is-open", !isExpanded);
  menuToggle.querySelector(".menu-toggle-text").textContent = isExpanded ? "Menu" : "Close";
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
    menuToggle.querySelector(".menu-toggle-text").textContent = "Menu";
  }
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      if (link.hash === `#${entry.target.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  });
}, { rootMargin: "-30% 0px -60% 0px" });

document.querySelectorAll("#overview, #challenge, #approach, #interface, #reflection").forEach((section) => {
  sectionObserver.observe(section);
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const screenTriggers = [...document.querySelectorAll("[data-lightbox]")];
const lightboxScreens = [...new Map(screenTriggers.map((trigger) => [trigger.dataset.src, trigger])).values()];
const closeButton = lightbox.querySelector(".lightbox-close");
let activeScreenIndex = 0;
let returnFocusTo = null;

function showScreen(index, selectedTrigger = null) {
  activeScreenIndex = (index + lightboxScreens.length) % lightboxScreens.length;
  const trigger = selectedTrigger || lightboxScreens[activeScreenIndex];
  lightboxImage.src = trigger.dataset.src;
  lightboxImage.alt = trigger.querySelector("img")?.alt || trigger.getAttribute("aria-label") || "Application screenshot";
  lightboxCaption.textContent = trigger.dataset.caption || "";
}

screenTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    returnFocusTo = trigger;
    const screenIndex = lightboxScreens.findIndex((screen) => screen.dataset.src === trigger.dataset.src);
    showScreen(screenIndex, trigger);
    lightbox.showModal();
    closeButton.focus();
  });
});

lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showScreen(activeScreenIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showScreen(activeScreenIndex + 1));
closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  returnFocusTo?.focus();
});
lightbox.addEventListener("cancel", (event) => {
  event.preventDefault();
  lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    lightbox.close();
  }
  if (event.key === "ArrowLeft") showScreen(activeScreenIndex - 1);
  if (event.key === "ArrowRight") showScreen(activeScreenIndex + 1);
});

document.getElementById("current-year").textContent = new Date().getFullYear();
