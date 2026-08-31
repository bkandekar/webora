/**
 * WEBORA — Website Cost Calculator Engine
 * Calculates estimated project investment and formats WhatsApp inquiry message.
 */

document.addEventListener("DOMContentLoaded", () => {
  initCostCalculator();
});

function initCostCalculator() {
  const calcForm = document.querySelector("#costCalculatorForm");
  if (!calcForm) return;

  const minPriceEl = document.querySelector("#calcMinPrice");
  const maxPriceEl = document.querySelector("#calcMaxPrice");
  const summaryFeaturesList = document.querySelector("#calcSummaryFeatures");
  const waQuoteBtn = document.querySelector("#calcWhatsAppBtn");

  // Base pricing tables (in INR ₹)
  const typePrices = {
    "landing-page": { base: 6999, name: "High-Converting Landing Page" },
    "business": { base: 9999, name: "Standard Business Website" },
    "portfolio": { base: 8999, name: "Creative Portfolio Website" },
    "blog": { base: 10999, name: "Content & Blog Website" },
    "ecommerce": { base: 15999, name: "Full E-Commerce Store" }
  };

  const pagePrices = {
    "1-5": { cost: 0, name: "1–5 Pages" },
    "6-10": { cost: 3500, name: "6–10 Pages" },
    "11-20": { cost: 7500, name: "11–20 Pages" },
    "20+": { cost: 13500, name: "20+ Pages (Custom Architecture)" }
  };

  const featurePrices = {
    "seo": { cost: 2500, name: "SEO Optimization & Schema" },
    "blog": { cost: 2500, name: "Blog / CMS Setup" },
    "whatsapp": { cost: 1000, name: "WhatsApp Chat Integration" },
    "contact": { cost: 1000, name: "Lead Generation Contact Form" },
    "payments": { cost: 3500, name: "Payment Gateway Integration" },
    "ecommerce": { cost: 5500, name: "Product Catalog & Cart System" },
    "booking": { cost: 4000, name: "Appointment Booking System" },
    "maintenance": { cost: 2999, name: "1-Year Website Maintenance" }
  };

  const calculateEstimate = () => {
    const selectedType = calcForm.querySelector('input[name="calcType"]:checked')?.value || "business";
    const selectedPages = calcForm.querySelector('input[name="calcPages"]:checked')?.value || "1-5";
    
    let totalBase = (typePrices[selectedType]?.base || 9999) + (pagePrices[selectedPages]?.cost || 0);
    const activeFeatures = [];

    calcForm.querySelectorAll('input[name="calcFeature"]:checked').forEach(cb => {
      const featKey = cb.value;
      if (featurePrices[featKey]) {
        totalBase += featurePrices[featKey].cost;
        activeFeatures.push(featurePrices[featKey].name);
      }
    });

    const minEstimate = Math.round(totalBase);
    const maxEstimate = Math.round(totalBase * 1.35);

    // Update UI
    if (minPriceEl && maxPriceEl) {
      minPriceEl.textContent = `₹${minEstimate.toLocaleString("en-IN")}`;
      maxPriceEl.textContent = `₹${maxEstimate.toLocaleString("en-IN")}`;
    }

    if (summaryFeaturesList) {
      summaryFeaturesList.innerHTML = "";
      const liType = document.createElement("li");
      liType.innerHTML = `<strong>Type:</strong> ${typePrices[selectedType]?.name}`;
      summaryFeaturesList.appendChild(liType);

      const liPages = document.createElement("li");
      liPages.innerHTML = `<strong>Pages:</strong> ${pagePrices[selectedPages]?.name}`;
      summaryFeaturesList.appendChild(liPages);

      if (activeFeatures.length > 0) {
        const liFeat = document.createElement("li");
        liFeat.innerHTML = `<strong>Selected Features:</strong> ${activeFeatures.join(", ")}`;
        summaryFeaturesList.appendChild(liFeat);
      }
    }

    // Prepare WhatsApp Message Link
    if (waQuoteBtn) {
      const waNumber = (typeof WEBORA_CONFIG !== "undefined" && WEBORA_CONFIG.whatsappNumber) ? WEBORA_CONFIG.whatsappNumber : "918329931123";
      
      const message = `Hello Webora! I just calculated my website estimate:%0A%0A` +
        `*Website Type:* ${encodeURIComponent(typePrices[selectedType]?.name)}%0A` +
        `*Page Count:* ${encodeURIComponent(pagePrices[selectedPages]?.name)}%0A` +
        `*Included Features:* ${encodeURIComponent(activeFeatures.length ? activeFeatures.join(", ") : "Standard Layout")}%0A` +
        `*Estimated Range:* ₹${minEstimate.toLocaleString("en-IN")} – ₹${maxEstimate.toLocaleString("en-IN")}%0A%0A` +
        `Can you provide me with an exact project proposal and timeline?`;

      waQuoteBtn.href = `https://wa.me/${waNumber}?text=${message}`;
    }
  };

  // Bind event listeners to form elements
  calcForm.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", calculateEstimate);
  });

  // Initial run
  calculateEstimate();
}
