const header = document.getElementById("header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelectorAll(".navigation a");
const timelineProgress = document.getElementById("timelineProgress");
const timelineLabel = document.getElementById("timelineLabel");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("[data-section]");

document.getElementById("currentYear").textContent = new Date().getFullYear();

// Mobile menu
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.classList.toggle("active");
  navigation.classList.toggle("active");
  document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.classList.remove("active");
    navigation.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Scroll progress
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
  timelineProgress.style.transform = `scaleY(${progress})`;
  header.classList.toggle("scrolled", scrollTop > 30);
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
revealElements.forEach((el) => revealObserver.observe(el));

// Active section tracking
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const name = entry.target.dataset.section;
      const id = entry.target.id;
      timelineLabel.textContent = name;
      navigationLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// Close menu on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menuButton.classList.remove("active");
    navigation.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});