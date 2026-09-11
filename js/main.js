/* The Cosmic Creator Co. — motion layer.
   Principle: motion supports the reading order, never competes with it.
   Everything here is progressive enhancement — the page is complete without it. */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const loader = document.getElementById("loader");
  const progress = document.querySelector(".loader__progress");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  let lenis;

  /* ---------- Mobile nav ---------- */
  const closeMobile = () => {
    mobileNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  const setupNav = () => {
    navToggle?.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mobileNav?.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    mobileNav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobile));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobile();
    });

    const syncNav = (y) => nav?.classList.toggle("is-scrolled", y > 24);
    if (lenis) lenis.on("scroll", ({ scroll }) => syncNav(scroll));
    else window.addEventListener("scroll", () => syncNav(window.scrollY), { passive: true });
    syncNav(window.scrollY);
  };

  /* ---------- Smooth scroll ---------- */
  const setupLenis = () => {
    if (reduceMotion || typeof Lenis === "undefined") return;

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  };

  /* ---------- Anchor scrolling (works with or without Lenis) ---------- */
  const setupAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      link.addEventListener("click", (e) => {
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMobile();
        if (lenis) lenis.scrollTo(target, { offset: -12 });
        else target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  };

  /* ---------- Nav scroll-spy ---------- */
  const setupSpy = () => {
    const links = [...document.querySelectorAll('.nav__links a[href^="#"]')];
    if (!links.length) return;

    links.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: ({ isActive }) => link.classList.toggle("is-current", isActive),
      });
    });
  };

  /* ---------- Intro: masked headline lines ---------- */
  const intro = () => {
    const scope = document.querySelector("[data-intro]") || document;
    const lines = scope.querySelectorAll(".line__inner");
    const reveals = scope.querySelectorAll(".reveal");
    const portrait = document.querySelector(".hero__portrait img");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(lines, { y: 0, duration: 1.2, stagger: 0.09 })
      .to(reveals, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, "-=0.75")
      .to(portrait, { scale: 1, duration: 1.6, ease: "power2.out" }, "-=1.3");
  };

  /* ---------- Scroll reveals ---------- */
  const setupReveals = () => {
    const introScope = document.querySelector("[data-intro]");

    gsap.utils.toArray(".reveal").forEach((el) => {
      if (introScope && introScope.contains(el)) return;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // Headline lines outside the intro (e.g. the closing CTA) unmask on approach.
    gsap.utils.toArray(".line__inner").forEach((el) => {
      if (introScope && introScope.contains(el)) return;

      gsap.to(el, {
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el.closest("h1, h2") || el, start: "top 85%", once: true },
      });
    });
  };

  /* ---------- Restrained parallax ---------- */
  const setupParallax = () => {
    if (reduceMotion) return;

    gsap.utils.toArray(".folio__frame img, .project__media img, .case-cover img").forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
  };

  /* ---------- Init ---------- */
  const init = () => {
    if (typeof gsap === "undefined") {
      document.querySelectorAll(".reveal, .line__inner").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      setupNav();
      setupAnchors();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    setupLenis();
    setupNav();
    setupAnchors();

    if (reduceMotion) {
      gsap.set(".reveal, .line__inner", { opacity: 1, y: 0, clearProps: "transform" });
      gsap.set(".hero__portrait img", { scale: 1 });
      return;
    }

    intro();
    setupReveals();
    setupParallax();
    setupSpy();
    ScrollTrigger.refresh();
  };

  /* ---------- Boot ---------- */
  let initialised = false;
  const start = () => {
    if (initialised) return;
    initialised = true;
    init();
  };

  let dismissed = false;
  const dismissLoader = () => {
    if (dismissed) return;
    dismissed = true;
    loader?.classList.add("is-done");
    document.body.classList.remove("is-loading");
    start();
  };

  const boot = () => {
    if (!loader || reduceMotion || typeof gsap === "undefined") {
      dismissLoader();
      return;
    }

    gsap
      .timeline({ onComplete: dismissLoader })
      .to(progress, { width: "100%", duration: 0.9, ease: "power2.inOut" })
      .to(loader, { opacity: 0, duration: 0.45, ease: "power2.out" }, "+=0.1");
  };

  let booted = false;
  const bootOnce = () => {
    if (booted) return;
    booted = true;
    boot();
  };

  if (loader) document.body.classList.add("is-loading");
  if (document.readyState === "complete") bootOnce();
  else window.addEventListener("load", bootOnce);

  // A slow font, a stalled image or a broken animation frame must never leave
  // the page stuck behind the loader.
  setTimeout(bootOnce, 2000);
  setTimeout(dismissLoader, 3500);
})();
