/* FORMA — interactions & scroll storytelling */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loader = document.getElementById("loader");
  const progress = document.querySelector(".loader__progress");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  document.body.classList.add("is-loading");

  /* ---------- Loader ---------- */
  const boot = () => {
    if (!loader || reduceMotion) {
      document.body.classList.remove("is-loading");
      loader?.classList.add("is-done");
      init();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        loader.classList.add("is-done");
        document.body.classList.remove("is-loading");
        init();
      },
    });

    tl.to(progress, { width: "100%", duration: 1.1, ease: "power2.inOut" }).to(
      loader,
      { opacity: 0, duration: 0.5, ease: "power2.out" },
      "+=0.15"
    );
  };

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis;

  const setupLenis = () => {
    if (reduceMotion || typeof Lenis === "undefined") return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMobile();
        lenis.scrollTo(target, { offset: -20 });
      });
    });
  };

  /* ---------- Nav ---------- */
  const closeMobile = () => {
    mobileNav?.classList.remove("is-open");
    mobileNav?.setAttribute("hidden", "");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  const setupNav = () => {
    navToggle?.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mobileNav?.classList.toggle("is-open", !open);
      if (!open) mobileNav?.removeAttribute("hidden");
      else mobileNav?.setAttribute("hidden", "");
    });

    mobileNav?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMobile);
    });

    const syncNav = (scrollY) => {
      nav?.classList.toggle("is-scrolled", scrollY > 24);
      nav?.classList.remove("is-over-hero");
    };

    if (lenis) lenis.on("scroll", ({ scroll }) => syncNav(scroll));
    else window.addEventListener("scroll", () => syncNav(window.scrollY), { passive: true });
    syncNav(window.scrollY);
  };



  /* ---------- Hero intro ---------- */
  const heroIntro = () => {
    const titleLines = document.querySelectorAll(".hero .line__inner");
    const reveals = document.querySelectorAll(".hero .reveal");
    const image = document.querySelector(".hero__image");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(titleLines, {
      y: 0,
      duration: 1.25,
      stagger: 0.1,
      ease: "power3.out",
    })
      .to(
        reveals,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.7"
      )
      .to(
        image,
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        "-=1.35"
      );
  };

  /* ---------- Scroll reveals ---------- */
  const setupReveals = () => {
    gsap.utils.toArray(".reveal").forEach((el) => {
      if (el.closest(".hero")) return;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    gsap.utils.toArray(".final-cta .line__inner").forEach((el) => {
      gsap.to(el, {
        y: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 70%",
        },
      });
    });
  };

  /* ---------- Parallax images ---------- */
  const setupParallax = () => {
    if (reduceMotion) return;

    gsap.utils.toArray(".case__media img, .about__visual img").forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".case, .about__visual"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    const heroImg = document.querySelector(".hero__image");
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  };

  /* ---------- Process sticky-feel numbers ---------- */
  const setupProcess = () => {
    gsap.utils.toArray(".process__step").forEach((step) => {
      const num = step.querySelector(".process__num");
      if (!num) return;

      gsap.fromTo(
        num,
        { x: -24, opacity: 0.35 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        }
      );
    });
  };

  /* ---------- Metrics count-up ---------- */
  const setupCounters = () => {
    document.querySelectorAll(".result__value[data-count]").forEach((el) => {
      const target = Number(el.getAttribute("data-count")) || 0;
      const decimals = Number(el.getAttribute("data-decimals") || 0);
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent =
                decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val).toString();
            },
          });
        },
      });
    });
  };

  /* ---------- Testimonials ---------- */
  const setupTestimonials = () => {
    const items = [...document.querySelectorAll(".testimonial")];
    const dots = [...document.querySelectorAll(".t-dot")];
    if (!items.length) return;

    let index = 0;
    let timer;

    const show = (i) => {
      index = i;
      items.forEach((item, n) => {
        const active = n === i;
        item.classList.toggle("is-active", active);
        if (active) item.removeAttribute("hidden");
        else item.setAttribute("hidden", "");
      });
      dots.forEach((dot, n) => dot.classList.toggle("is-active", n === i));

      const activeQuote = items[i].querySelector(".testimonial__quote");
      if (activeQuote && !reduceMotion) {
        gsap.fromTo(
          activeQuote,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
        );
      }
    };

    const next = () => show((index + 1) % items.length);

    const restart = () => {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(next, 6500);
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        show(Number(dot.dataset.goto) || 0);
        restart();
      });
    });

    show(0);
    restart();
  };

  /* ---------- Service hover accent ---------- */
  const setupServices = () => {
    document.querySelectorAll(".service").forEach((service) => {
      service.addEventListener("mouseenter", () => {
        if (reduceMotion) return;
        gsap.to(service, { x: 6, duration: 0.35, ease: "power2.out" });
      });
      service.addEventListener("mouseleave", () => {
        gsap.to(service, { x: 0, duration: 0.35, ease: "power2.out" });
      });
    });
  };

  /* ---------- Init ---------- */
  const init = () => {
    if (typeof gsap === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    setupLenis();
    setupNav();

    if (reduceMotion) {
      document.querySelectorAll(".reveal, .line__inner").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      setupTestimonials();
      return;
    }

    heroIntro();
    setupReveals();
    setupParallax();
    setupProcess();
    setupCounters();
    setupTestimonials();
    setupServices();

    ScrollTrigger.refresh();
  };

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
