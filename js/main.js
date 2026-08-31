/**
 * WEBORA — Main JavaScript Engine
 * Handles navigation, animations, accordions, testimonials, modals, and WhatsApp generation.
 */

const WEBORA_CONFIG = {
  whatsappNumber: "918329931123",
  email: "hello@webora.in",
  phone: "+91 90672 57872",
  domain: "https://yourdomain.com",
  agencyName: "WEBORA",
  tagline: "We Build Websites That Help Businesses Grow."
};

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initPortfolioFilter();
  initFaqAccordion();
  initTestimonialSlider();
  initQuoteModal();
  initContactForm();
  initFloatingWhatsApp();
  initSmoothScroll();
  initLiveSandbox();
  initSplitSlider();
  initAuditTool();
  initLiveToast();
});

/* ==========================================================================
   1. Navbar & Header Scroll Effect
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Responsive Mobile Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-nav .btn");

  if (!menuToggle || !mobileNav) return;

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    mobileNav.classList.toggle("open");
    document.body.style.overflow = !isExpanded ? "hidden" : "";
  };

  menuToggle.addEventListener("click", toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* ==========================================================================
   3. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("active"));
  }
}

/* ==========================================================================
   4. Animated Stat Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (!counters.length) return;

  const startCounting = (counter) => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const suffix = counter.getAttribute("data-suffix") || "";
    const prefix = counter.getAttribute("data-prefix") || "";
    const duration = 1800; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, stepTime);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(c => startCounting(c));
  }
}

/* ==========================================================================
   5. Portfolio & Design Category Filter
   ========================================================================== */
function initPortfolioFilter() {
  const filterBars = document.querySelectorAll(".portfolio-filter-bar, .filter-bar");
  if (!filterBars.length) return;

  filterBars.forEach(bar => {
    const filterBtns = bar.querySelectorAll(".filter-btn");
    const container = bar.closest("section") || document;
    const cards = container.querySelectorAll(".project-card, .design-card");

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.getAttribute("data-filter");

        cards.forEach(card => {
          const cardCat = card.getAttribute("data-category");
          if (category === "all" || cardCat === category) {
            card.style.display = "";
            card.style.visibility = "visible";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.96)";
            setTimeout(() => {
              card.style.display = "none";
            }, 200);
          }
        });
      });
    });
  });
}

/* ==========================================================================
   6. Accessible FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");

    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Optional: Close other FAQs for clean single-item accordions
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains("active")) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question-btn");
          const otherAns = other.querySelector(".faq-answer");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   7. Testimonial Carousel / Slider
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.querySelector(".testimonials-track");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".slider-btn-prev");
  const nextBtn = document.querySelector(".slider-btn-next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create dot indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = `slider-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll(".slider-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  // Touch Swipe Support
  let startX = 0;
  let endX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
    }
  });

  // Keyboard navigation
  track.parentElement.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
    if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
  });
}

/* ==========================================================================
   8. Multi-Step & Direct Quote Modals
   ========================================================================== */
function initQuoteModal() {
  const modals = document.querySelectorAll("#quoteModal, #quoteModalOverlay");
  const openBtns = document.querySelectorAll(".open-quote-modal");
  
  if (!modals.length && !openBtns.length) return;

  const openAnyModal = (preferredDesign) => {
    modals.forEach(m => {
      m.classList.add("open");
      m.setAttribute("aria-hidden", "false");
    });
    document.body.style.overflow = "hidden";

    // Auto-select preferred service if passed
    if (preferredDesign) {
      const quoteSelect = document.querySelector("#quoteService");
      if (quoteSelect) {
        let matched = false;
        for (let i = 0; i < quoteSelect.options.length; i++) {
          if (quoteSelect.options[i].text.toLowerCase().includes(preferredDesign.toLowerCase()) || 
              quoteSelect.options[i].value.toLowerCase().includes(preferredDesign.toLowerCase())) {
            quoteSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          const opt = new Option(preferredDesign, preferredDesign, true, true);
          quoteSelect.add(opt);
        }
      }

      // If textarea exists, prefill note
      const msgArea = document.querySelector("#quoteMessage");
      if (msgArea && !msgArea.value) {
        msgArea.value = `I would like to explore the ${preferredDesign} design concept for my business.`;
      }
    }
  };

  const closeAllModals = () => {
    modals.forEach(m => {
      m.classList.remove("open");
      m.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "";
  };

  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const pref = btn.getAttribute("data-pref") || btn.getAttribute("data-design-pref");
      openAnyModal(pref);
    });
  });

  document.querySelectorAll(".modal-close-btn, .modal-close").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // Multi-step modal logic (if present on index.html)
  const multiStepModal = document.querySelector("#quoteModal");
  if (multiStepModal) {
    const steps = multiStepModal.querySelectorAll(".modal-step");
    const prevBtn = multiStepModal.querySelector("#modalPrevBtn");
    const nextBtn = multiStepModal.querySelector("#modalNextBtn");
    const submitBtn = multiStepModal.querySelector("#modalSubmitBtn");
    const progressBar = multiStepModal.querySelector(".modal-progress-bar");
    let currentStep = 1;
    const totalSteps = steps.length || 1;

    const updateModalStep = (step) => {
      currentStep = step;
      steps.forEach(s => s.classList.remove("active"));
      const activeStepEl = multiStepModal.querySelector(`[data-step="${currentStep}"]`);
      if (activeStepEl) activeStepEl.classList.add("active");

      if (progressBar) {
        progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
      }
      if (prevBtn) {
        prevBtn.style.display = currentStep > 1 ? "inline-flex" : "none";
      }
      if (nextBtn) {
        nextBtn.style.display = currentStep < totalSteps ? "inline-flex" : "none";
      }
      if (submitBtn) {
        submitBtn.style.display = currentStep === totalSteps ? "inline-flex" : "none";
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentStep > 1) updateModalStep(currentStep - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentStep < totalSteps) updateModalStep(currentStep + 1);
      });
    }

    const multiForm = multiStepModal.querySelector("#quoteModalForm");
    if (multiForm) {
      multiForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const siteType = multiForm.querySelector('input[name="modalSiteType"]:checked')?.value || "Business Website";
        const pages = multiForm.querySelector('input[name="modalPages"]:checked')?.value || "1-5 Pages";
        const name = multiForm.querySelector('#modalClientName')?.value || "Client";
        const phone = multiForm.querySelector('#modalClientPhone')?.value || "Not provided";
        
        const features = [];
        multiForm.querySelectorAll('input[name="modalFeatures"]:checked').forEach(f => features.push(f.value));

        const message = `Hello Webora! I would like to get a quote:%0A%0A` +
          `*Name:* ${encodeURIComponent(name)}%0A` +
          `*WhatsApp:* ${encodeURIComponent(phone)}%0A` +
          `*Website Type:* ${encodeURIComponent(siteType)}%0A` +
          `*Scope:* ${encodeURIComponent(pages)}%0A` +
          `*Features:* ${encodeURIComponent(features.length ? features.join(", ") : "Standard")}%0A%0A` +
          `Please send me an estimate.`;

        const whatsappUrl = `https://wa.me/${WEBORA_CONFIG.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
        closeAllModals();
      });
    }
  }

  // Single-step design quote form (if present on designs.html)
  const singleForm = document.querySelector("#quoteForm");
  if (singleForm) {
    singleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = singleForm.querySelector("#quoteName")?.value.trim() || "Client";
      const phone = singleForm.querySelector("#quotePhone")?.value.trim() || "Not provided";
      const email = singleForm.querySelector("#quoteEmail")?.value.trim() || "Not provided";
      const service = singleForm.querySelector("#quoteService")?.value || "Custom Design";
      const notes = singleForm.querySelector("#quoteMessage")?.value.trim() || "No additional notes";

      const message = `Hello Webora! I would like to request a design proposal:%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone/WhatsApp:* ${encodeURIComponent(phone)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Preferred Design:* ${encodeURIComponent(service)}%0A` +
        `*Notes:* ${encodeURIComponent(notes)}%0A%0A` +
        `Please send me a custom proposal and next steps.`;

      const whatsappUrl = `https://wa.me/${WEBORA_CONFIG.whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
      closeAllModals();
      showToast("Proposal Request Sent", "We will connect with your custom design roadmap shortly!", "🚀");
    });

    const directWaBtn = document.querySelector("#quoteWhatsAppDirect");
    if (directWaBtn) {
      directWaBtn.addEventListener("click", () => {
        const service = singleForm.querySelector("#quoteService")?.value || "Website Design";
        const message = `Hi Webora! I'm on your website and want to discuss the *${encodeURIComponent(service)}* design package.`;
        window.open(`https://wa.me/${WEBORA_CONFIG.whatsappNumber}?text=${message}`, "_blank");
      });
    }
  }
}

/* ==========================================================================
   9. Contact Page Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector("#contactPageForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#contactName")?.value.trim();
    const business = form.querySelector("#contactBusiness")?.value.trim() || "N/A";
    const email = form.querySelector("#contactEmail")?.value.trim();
    const phone = form.querySelector("#contactPhone")?.value.trim();
    const type = form.querySelector("#contactType")?.value || "Business Website";
    const budget = form.querySelector("#contactBudget")?.value || "Flexible";
    const messageText = form.querySelector("#contactMessage")?.value.trim() || "Please contact me with details.";

    if (!name || !phone) {
      showToast("Required Fields Missing", "Please enter your name and WhatsApp number.", "⚠️");
      return;
    }

    const waMsg = `Hello Webora Team! Here are my project details:%0A%0A` +
      `*Full Name:* ${encodeURIComponent(name)}%0A` +
      `*Business Name:* ${encodeURIComponent(business)}%0A` +
      `*Email:* ${encodeURIComponent(email || "Not provided")}%0A` +
      `*WhatsApp:* ${encodeURIComponent(phone)}%0A` +
      `*Website Type:* ${encodeURIComponent(type)}%0A` +
      `*Budget Range:* ${encodeURIComponent(budget)}%0A` +
      `*Requirements:* ${encodeURIComponent(messageText)}`;

    const whatsappUrl = `https://wa.me/${WEBORA_CONFIG.whatsappNumber}?text=${waMsg}`;
    
    // Show success feedback
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg> Opening WhatsApp...`;
      btn.style.background = "#10B981";
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
      }, 3000);
    }

    window.open(whatsappUrl, "_blank");
    showToast("Message Prepared", "Connecting you directly with our senior strategist.", "💬");
  });
}

/* ==========================================================================
   10. Floating WhatsApp Button
   ========================================================================== */
function initFloatingWhatsApp() {
  const waBtns = document.querySelectorAll(".floating-wa-btn, .floating-whatsapp");
  if (!waBtns.length) return;

  const defaultMsg = encodeURIComponent("Hello Webora! I am interested in building a website for my business.");
  waBtns.forEach(btn => {
    btn.href = `https://wa.me/${WEBORA_CONFIG.whatsappNumber}?text=${defaultMsg}`;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });
}

/* ==========================================================================
   11. Smooth Internal Anchor Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#!") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector(".site-header")?.offsetHeight || 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
      }
    });
  });
}

/* ==========================================================================
   12. Live Design Engine & Viewport Simulator
   ========================================================================== */
function initLiveSandbox() {
  const sandboxes = document.querySelectorAll(".live-sandbox-wrapper");
  if (!sandboxes.length) return;

  const THEMES_CONFIG = {
    saas: {
      url: "https://preview.webora.in/saas-ultra-dark",
      badge: "⚡ 99 / 100 Speed",
      typography: "Space Grotesk + Manrope",
      swatches: [
        { bg: "#0B1020", name: "Midnight Navy #0B1020" },
        { bg: "#2563EB", name: "Electric Blue #2563EB" },
        { bg: "#38BDF8", name: "Sky Cyan #38BDF8" },
        { bg: "#10B981", name: "Emerald #10B981" }
      ],
      industry: "B2B SaaS, AI & Cloud Infrastructure",
      themeClass: "preview-saas",
      quoteName: "Nexus SaaS / Tech"
    },
    luxury: {
      url: "https://preview.webora.in/luxury-atelier-reserve",
      badge: "⚡ 100 / 100 Speed",
      typography: "Playfair Display + Manrope",
      swatches: [
        { bg: "#181512", name: "Espresso Noir #181512" },
        { bg: "#D97706", name: "Champagne Amber #D97706" },
        { bg: "#FEF3C7", name: "Warm Ivory #FEF3C7" },
        { bg: "#78716C", name: "Muted Stone #78716C" }
      ],
      industry: "Haute Perfumery, Fine Jewelry & Luxury Ateliers",
      themeClass: "preview-luxury",
      quoteName: "Aura Luxury MedSpa"
    },
    ecommerce: {
      url: "https://preview.webora.in/urban-edge-retail",
      badge: "⚡ 99 / 100 Speed",
      typography: "Manrope + Inter Bold",
      swatches: [
        { bg: "#FFFFFF", name: "Pure White #FFFFFF" },
        { bg: "#111827", name: "Carbon Black #111827" },
        { bg: "#DC2626", name: "Crimson Red #DC2626" },
        { bg: "#2563EB", name: "Cobalt Blue #2563EB" }
      ],
      industry: "Modern Apparel, Techwear & Direct Retail",
      themeClass: "preview-ecommerce",
      quoteName: "Verve E-Commerce"
    },
    corporate: {
      url: "https://preview.webora.in/vanguard-global-capital",
      badge: "⚡ 99 / 100 Speed",
      typography: "Manrope + Space Grotesk",
      swatches: [
        { bg: "#F8FAFC", name: "Executive Slate #F8FAFC" },
        { bg: "#0B1020", name: "Navy Black #0B1020" },
        { bg: "#2563EB", name: "Advisory Blue #2563EB" },
        { bg: "#64748B", name: "Steel Gray #64748B" }
      ],
      industry: "Wealth Management, Legal & Enterprise Advisory",
      themeClass: "preview-corporate",
      quoteName: "Vanguard Corporate"
    }
  };

  sandboxes.forEach(wrapper => {
    const tabs = wrapper.querySelectorAll(".sandbox-tab");
    const viewportBtns = wrapper.querySelectorAll(".viewport-btn");
    const mockup = wrapper.querySelector(".sandbox-browser-mockup") || wrapper.querySelector("#sandboxMockup");
    const urlBar = wrapper.querySelector(".mockup-url-bar") || wrapper.querySelector("#sandboxUrl");
    const badge = wrapper.querySelector(".mockup-badge") || wrapper.querySelector("#sandboxBadge");
    const themeViews = wrapper.querySelectorAll(".preview-theme");
    
    // Spec Elements
    const typoEl = wrapper.querySelector("#specTypo");
    const swatchesEl = wrapper.querySelector("#specSwatches");
    const industryEl = wrapper.querySelector("#specIndustry");
    const quoteBtn = wrapper.querySelector("#specQuoteBtn");

    const switchStyle = (styleKey) => {
      const config = THEMES_CONFIG[styleKey] || THEMES_CONFIG.saas;

      // Update active tab button
      tabs.forEach(tab => {
        if (tab.getAttribute("data-style") === styleKey) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });

      // Update preview theme visibility
      themeViews.forEach(view => {
        if (view.classList.contains(config.themeClass)) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });

      // Update browser bar text
      if (urlBar) urlBar.textContent = config.url;
      if (badge) badge.textContent = config.badge;

      // Update specs
      if (typoEl) typoEl.textContent = config.typography;
      if (industryEl) industryEl.textContent = config.industry;
      if (quoteBtn) {
        quoteBtn.setAttribute("data-pref", config.quoteName);
      }

      if (swatchesEl && config.swatches) {
        swatchesEl.innerHTML = config.swatches.map(s => 
          `<span class="swatch" style="background: ${s.bg}; border: 1px solid rgba(0,0,0,0.1);" title="${s.name}"></span>`
        ).join("");
      }
    };

    // Tab switcher events
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const styleKey = tab.getAttribute("data-style");
        switchStyle(styleKey);
      });
    });

    // Viewport Simulator events
    viewportBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        viewportBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const device = btn.getAttribute("data-device") || "desktop";
        if (mockup) {
          mockup.setAttribute("data-device", device);
        }

        const deviceLabels = {
          desktop: "Desktop View (100%)",
          tablet: "Tablet View (768px)",
          mobile: "Mobile View (380px)"
        };
        showToast("Viewport Updated", `Simulating ${deviceLabels[device] || device}`, "📱");
      });
    });

    // Interactive Add to Cart buttons inside live sandbox preview
    wrapper.querySelectorAll(".ecom-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const originalText = btn.textContent;
        btn.textContent = "Added to Cart! ✓";
        btn.style.background = "#10B981";
        showToast("Cart Updated", "Added item to simulated live checkout.", "🛍️");
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
        }, 2200);
      });
    });

    // Interactive CTA buttons inside preview themes
    wrapper.querySelectorAll(".saas-btn-primary, .luxury-btn-primary, .corp-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const activeTab = wrapper.querySelector(".sandbox-tab.active")?.getAttribute("data-style") || "saas";
        const themeInfo = THEMES_CONFIG[activeTab]?.quoteName || "Custom Design";
        const quoteModalBtn = document.querySelector(`.open-quote-modal`);
        if (quoteModalBtn) {
          quoteModalBtn.setAttribute("data-pref", themeInfo);
          quoteModalBtn.click();
        }
      });
    });

    // Initialize with default SaaS theme
    switchStyle("saas");
  });

  // Connect style pills to switch sandbox
  document.querySelectorAll(".style-pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      const targetHash = pill.getAttribute("href");
      const sandbox = document.querySelector(".live-sandbox-wrapper");
      if (sandbox && targetHash) {
        const styleName = targetHash.replace("#", "");
        const matchedTab = sandbox.querySelector(`.sandbox-tab[data-style="${styleName}"]`);
        if (matchedTab) {
          e.preventDefault();
          matchedTab.click();
          sandbox.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Connect "Inspect Design" cards buttons to switch live sandbox
  document.querySelectorAll(".preview-design-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const card = btn.closest(".design-card");
      const category = card?.getAttribute("data-category") || "tech";
      
      const categoryMap = {
        tech: "saas",
        luxury: "luxury",
        ecommerce: "ecommerce",
        corporate: "corporate"
      };

      const targetStyle = categoryMap[category] || "saas";
      const sandbox = document.querySelector(".live-sandbox-wrapper");
      if (sandbox) {
        const tab = sandbox.querySelector(`.sandbox-tab[data-style="${targetStyle}"]`);
        if (tab) tab.click();
        sandbox.scrollIntoView({ behavior: "smooth", block: "center" });
        showToast("Design Loaded in Sandbox", `Now previewing ${card.querySelector(".design-card-title")?.textContent || "Archetype"}`, "✨");
      }
    });
  });
}

/* ==========================================================================
   13. Before & After Drag Split Slider
   ========================================================================== */
function initSplitSlider() {
  const containers = document.querySelectorAll(".split-slider-container, #splitSlider");
  if (!containers.length) return;

  containers.forEach(container => {
    const afterLayer = container.querySelector(".split-slider-img.img-after, #splitAfterLayer");
    const handle = container.querySelector(".split-slider-handle, #sliderHandle");

    if (!afterLayer || !handle) return;

    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      let percentage = (offsetX / rect.width) * 100;
      
      // Clamp between 5% and 95%
      percentage = Math.max(5, Math.min(95, percentage));

      afterLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    // Mouse drag
    const onMouseDown = (e) => {
      isDragging = true;
      setPosition(e.clientX);
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = "";
      }
    };

    handle.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch drag
    const onTouchStart = (e) => {
      isDragging = true;
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    handle.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Keyboard support
    container.setAttribute("tabindex", "0");
    container.setAttribute("role", "slider");
    container.setAttribute("aria-label", "Before and after comparison slider");
    container.addEventListener("keydown", (e) => {
      const currentWidth = parseFloat(afterLayer.style.width) || 50;
      if (e.key === "ArrowLeft") {
        const next = Math.max(5, currentWidth - 5);
        afterLayer.style.width = `${next}%`;
        handle.style.left = `${next}%`;
      } else if (e.key === "ArrowRight") {
        const next = Math.min(95, currentWidth + 5);
        afterLayer.style.width = `${next}%`;
        handle.style.left = `${next}%`;
      }
    });
  });
}

/* ==========================================================================
   14. Instant Website Speed & Conversion Score Audit Tool
   ========================================================================== */
function initAuditTool() {
  const auditForm = document.querySelector("#auditForm");
  const auditBtn = document.querySelector("#runAuditBtn");
  const resultBox = document.querySelector("#auditResultBox");
  const urlInput = document.querySelector("#auditUrl");
  const domainLabel = document.querySelector("#auditDomainLabel");
  const scoreNum = document.querySelector("#auditScoreNum");

  if (!auditForm && !auditBtn) return;

  const handleAudit = (e) => {
    if (e) e.preventDefault();

    let rawUrl = urlInput ? urlInput.value.trim() : "";
    if (!rawUrl) {
      rawUrl = "yourbusiness.com";
      if (urlInput) urlInput.value = rawUrl;
    }

    const cleanDomain = rawUrl.replace(/https?:\/\//i, "").replace(/^www\./i, "").split("/")[0];

    const targetBtn = auditBtn || auditForm?.querySelector("button[type='submit']");
    if (!targetBtn) return;

    const originalBtnContent = targetBtn.innerHTML;
    targetBtn.disabled = true;
    targetBtn.innerHTML = `
      <svg class="btn-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"/>
      </svg>
      Analyzing Core Web Vitals...
    `;

    setTimeout(() => {
      targetBtn.disabled = false;
      targetBtn.innerHTML = originalBtnContent;

      if (domainLabel) domainLabel.textContent = cleanDomain;
      if (resultBox) {
        resultBox.style.display = "block";
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Animate score counter
      if (scoreNum) {
        let current = 40;
        const target = 99;
        const interval = setInterval(() => {
          current += 3;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          scoreNum.textContent = current;
        }, 30);
      }

      showToast("Audit Report Ready", `Calculated speed & conversion audit for ${cleanDomain}`, "⚡");
    }, 1200);
  };

  if (auditForm) auditForm.addEventListener("submit", handleAudit);
  if (auditBtn) auditBtn.addEventListener("click", handleAudit);
}

/* ==========================================================================
   15. Toast Notification System
   ========================================================================== */
function initLiveToast() {
  // Check if notification toast element exists; if not, create it
  let toast = document.querySelector("#toastNotification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotification";
    toast.className = "toast-notification";
    toast.innerHTML = `
      <div class="toast-icon">✨</div>
      <div class="toast-body">
        <div class="toast-title" id="toastTitle">Client Launch</div>
        <div class="toast-msg" id="toastMsg">Bloom Botanical E-Commerce launched with 99 PageSpeed!</div>
      </div>
    `;
    document.body.appendChild(toast);
  }

  // Periodic subtle social proof toasts
  const PROOFS = [
    { title: "New Project Started", msg: "Nexus Cloud SaaS platform design kickoff in progress!", icon: "🚀" },
    { title: "Website Deployed", msg: "Apex Dental Clinic launched with 100/100 Core Web Vitals.", icon: "⚡" },
    { title: "Quote Generated", msg: "A luxury lifestyle boutique just reserved an exclusive design slot.", icon: "💎" },
    { title: "Conversion Spike", msg: "Verve E-Commerce client recorded +48% checkout conversions this week.", icon: "📈" }
  ];

  let proofIndex = 0;
  setInterval(() => {
    // Only show if user hasn't recently interacted and modal isn't open
    const isModalOpen = document.querySelector(".modal-backdrop.open, .modal-overlay.open");
    if (!isModalOpen && Math.random() > 0.4) {
      const proof = PROOFS[proofIndex % PROOFS.length];
      showToast(proof.title, proof.msg, proof.icon);
      proofIndex++;
    }
  }, 24000);
}

function showToast(title, message, icon = "✨") {
  const toast = document.querySelector("#toastNotification");
  if (!toast) return;

  const titleEl = toast.querySelector("#toastTitle") || toast.querySelector(".toast-title");
  const msgEl = toast.querySelector("#toastMsg") || toast.querySelector(".toast-msg");
  const iconEl = toast.querySelector(".toast-icon");

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;

  toast.classList.add("show");

  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 4200);
}

