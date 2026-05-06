// ─── Cursor + ambient glow (init once, persists across page transitions) ──────

function initCursorAndGlow() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (document.getElementById("cursor-dot")) return;

  const dot = document.createElement("div");
  dot.id = "cursor-dot";
  dot.className = "cursor-dot";

  const ring = document.createElement("div");
  ring.id = "cursor-ring";
  ring.className = "cursor-ring";

  const glow = document.createElement("div");
  glow.id = "mouse-glow";
  glow.className = "mouse-glow";

  document.body.prepend(glow);
  document.body.append(dot, ring);

  let mx = -300,
    my = -300,
    rx = -300,
    ry = -300;

  document.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    glow.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    dot.classList.add("is-active");
    ring.classList.add("is-active");
  });

  document.addEventListener("mouseleave", () => {
    dot.classList.remove("is-active");
    ring.classList.remove("is-active");
  });

  // Event delegation — no re-registration needed after page swaps
  document.addEventListener("mouseover", e => {
    if ((e.target as Element).closest?.("a,button,[role='button']")) {
      ring.classList.add("is-hovering");
    }
  });
  document.addEventListener("mouseout", e => {
    if ((e.target as Element).closest?.("a,button,[role='button']")) {
      ring.classList.remove("is-hovering");
    }
  });

  // Smooth lagging ring via RAF
  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
}

// ─── Scroll-in animations (re-run on each page) ────────────────────────────

function initScrollAnimations() {
  // Remove stale classes from previous page
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

// ─── Bootstrap ─────────────────────────────────────────────────────────────

initCursorAndGlow();
initScrollAnimations();
document.addEventListener("astro:after-swap", initScrollAnimations);
