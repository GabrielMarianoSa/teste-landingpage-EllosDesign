/* EngageFlow — Scripts */

AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
  disable: window.innerWidth < 480,
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 50);
});

const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.style.display === "flex";
    nav.style.display = isOpen ? "none" : "flex";

    if (!isOpen) {
      nav.style.position = "fixed";
      nav.style.top = "70px";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.flexDirection = "column";
      nav.style.padding = "20px 24px";
      nav.style.background = "rgba(255,255,255,0.98)";
      nav.style.backdropFilter = "blur(16px)";
      nav.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)";
      nav.style.gap = "12px";
      nav.style.borderBottom = "1px solid rgba(0,0,0,0.06)";
      nav.style.zIndex = "999";
    }

    burger.querySelector("i").className = isOpen
      ? "ri-menu-3-line"
      : "ri-close-line";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.style.display = "";
      nav.removeAttribute("style");
      burger.querySelector("i").className = "ri-menu-3-line";
    });
  });
}

gsap.registerPlugin(ScrollTrigger, Flip);

gsap.utils
  .toArray(".section__header, .about__grid, .demo__grid")
  .forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

function setupMetricCounters() {
  const counters = document.querySelectorAll(".metric strong[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.animated === "true") return;

        el.dataset.animated = "true";

        const target = Number(el.dataset.count || 0);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const decimals = Number(el.dataset.decimals || 0);

        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            const value = decimals
              ? counter.value.toFixed(decimals)
              : Math.round(counter.value);
            el.textContent = `${prefix}${value}${suffix}`;
          },
        });
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => observer.observe(el));
}

setupMetricCounters();

// CRM: card percorrendo o pipeline
(function crmPipeline() {
  const hotCard = document.querySelector(".crm-mock__card--hot");
  const board = document.querySelector(".crm-mock__board");
  const cols = board ? [...board.querySelectorAll(".crm-mock__col")] : [];

  if (!hotCard || cols.length < 3) return;

  let colIndex = 0;

  function advanceCard() {
    const state = Flip.getState(hotCard);

    const nextIndex = (colIndex + 1) % cols.length;
    const col = cols[nextIndex];
    const title = col.querySelector(".crm-mock__col-title");

    if (title) {
      title.after(hotCard);
    } else {
      col.appendChild(hotCard);
    }

    colIndex = nextIndex;

    Flip.from(state, {
      duration: 0.8,
      ease: "power2.inOut",
      absolute: true,
      onComplete() {
        gsap.fromTo(
          hotCard,
          { boxShadow: "0 4px 12px rgba(59,130,246,0.1)" },
          {
            boxShadow: "0 8px 28px rgba(59,130,246,0.4)",
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => gsap.delayedCall(2.2, advanceCard),
          },
        );
      },
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        gsap.delayedCall(1.2, advanceCard);
        observer.disconnect();
      }
    },
    { threshold: 0.3 },
  );

  const section = document.querySelector("#about");
  if (section) observer.observe(section);
})();

// Carrossel de depoimentos
const swiperTestimonials = new Swiper(".testimonials__slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  rewind: true,
  speed: 650,
  grabCursor: true,
  autoplay: {
    delay: 3800,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 1 },
    960: { slidesPerView: 2 },
  },
});

// Simulacao do chat
const chatBody = document.querySelector(".chat-sim__body");

if (chatBody) {
  const chatScript = [
    {
      from: "bot",
      text: "Olá! Sou a assistente do EngageFlow. Como posso ajudar?",
    },
    { from: "user", text: "Quero organizar melhor o follow-up dos leads." },
    {
      from: "bot",
      text: "Perfeito! Com o EngageFlow, cada lead recebe follow-up automático no momento certo. 🚀",
    },
    { from: "user", text: "Consigo ver métricas de conversão?" },
    {
      from: "bot",
      text: "Sim! Dashboard em tempo real com taxa de conversão, tempo de fechamento e muito mais. 📊",
    },
  ];

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "chat-typing";
    typing.innerHTML =
      '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typing;
  }

  function addMessage(msg) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble--${msg.from}`;
    bubble.textContent = msg.text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  let chatStarted = false;

  function startChat() {
    if (chatStarted) return;
    chatStarted = true;

    let idx = 0;

    function next() {
      if (idx >= chatScript.length) return;

      const msg = chatScript[idx];

      if (msg.from === "bot") {
        const typing = showTyping();
        setTimeout(() => {
          typing.remove();
          addMessage(msg);
          idx++;
          setTimeout(next, 1200);
        }, 1400);
      } else {
        setTimeout(() => {
          addMessage(msg);
          idx++;
          setTimeout(next, 800);
        }, 600);
      }
    }

    next();
  }

  const demoSection = document.querySelector("#mockup");
  if (demoSection) {
    const chatObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(startChat, 600);
          chatObserver.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    chatObserver.observe(demoSection);
  }
}

// Envio do formulario
const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const hp = form.querySelector('[name="website"]');
    if (hp && hp.value) return;

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Enviando...';

    const data = new FormData(form);

    try {
      const res = await fetch("backend/form.php", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (json.success === true) {
        status.className = "form__status is-success";
        status.textContent =
          "✓ Recebemos seus dados! Em breve entraremos em contato.";
        form.reset();
      } else {
        throw new Error(json.message || "Erro no envio");
      }
    } catch (err) {
      status.className = "form__status is-error";
      status.textContent = "Ops, algo deu errado. Tente novamente.";
    }

    btn.disabled = false;
    btn.innerHTML = btnText;
  });
}

// Scroll suave nos links ancora
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
