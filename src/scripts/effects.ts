// ─── Cursor + ambient glow ────────────────────────────────────────────────────
// Global event listeners are registered once; element lookups are by ID so
// they survive Astro's ClientRouter body swaps.

let globalListenersReady = false;
let mx = -300,
  my = -300,
  rx = -300,
  ry = -300;

function ensureCursorElements() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  if (!document.getElementById("cursor-dot")) {
    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
  }

  if (!document.getElementById("cursor-ring")) {
    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    ring.className = "cursor-ring";
    document.body.appendChild(ring);
  }

  if (!document.getElementById("mouse-glow")) {
    const glow = document.createElement("div");
    glow.id = "mouse-glow";
    glow.className = "mouse-glow";
    document.body.prepend(glow);
  }
}

function initGlobalListeners() {
  if (globalListenersReady) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  globalListenersReady = true;

  document.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;

    const dot = document.getElementById("cursor-dot");
    const glow = document.getElementById("mouse-glow");
    if (dot) {
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      dot.classList.add("is-active");
    }
    document.getElementById("cursor-ring")?.classList.add("is-active");
    if (glow) {
      glow.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    }
  });

  document.addEventListener("mouseleave", () => {
    document.getElementById("cursor-dot")?.classList.remove("is-active");
    document.getElementById("cursor-ring")?.classList.remove("is-active");
  });

  document.addEventListener("mouseover", e => {
    if ((e.target as Element).closest("a, button, [role='button']")) {
      document.getElementById("cursor-ring")?.classList.add("is-hovering");
    }
  });

  document.addEventListener("mouseout", e => {
    if ((e.target as Element).closest("a, button, [role='button']")) {
      document.getElementById("cursor-ring")?.classList.remove("is-hovering");
    }
  });

  // RAF ring-follow loop — looks up element each frame to survive DOM swaps
  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    const ring = document.getElementById("cursor-ring");
    if (ring) {
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    }
    requestAnimationFrame(loop);
  })();
}

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

// ─── Bootstrap ────────────────────────────────────────────────────────────────

ensureCursorElements();
initGlobalListeners();
initScrollAnimations();

document.addEventListener("astro:after-swap", () => {
  ensureCursorElements(); // re-add cursor elements if Astro removed them
  initScrollAnimations();
});
