// ─── Scroll-in animations ─────────────────────────────────────────────────────

function initScrollAnimations() {
  document.querySelectorAll<HTMLElement>(".scroll-item").forEach(el => {
    el.classList.remove("scroll-item");
    el.removeAttribute("data-visible");
    el.style.removeProperty("--delay");
  });

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          (target as HTMLElement).dataset.visible = "true";
          io.unobserve(target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
  );

  document.querySelectorAll<HTMLElement>("main li").forEach((el, i) => {
    el.style.setProperty("--delay", `${Math.min(i * 0.07, 0.45)}s`);
    el.classList.add("scroll-item");
    io.observe(el);
  });
}

initScrollAnimations();
document.addEventListener("astro:after-swap", initScrollAnimations);
