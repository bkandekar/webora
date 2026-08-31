# WEBORA — Premium Website Design & Development Agency

> **Tagline:** We Build Websites That Help Businesses Grow.

WEBORA is a fully responsive, modern, high-converting digital agency website built with pure semantic **HTML5**, **CSS3**, and **Vanilla JavaScript**. It requires zero build tools, bundlers, or server-side dependencies, making it 100% compatible with GitHub Pages, Netlify, Vercel, and shared cPanel hosting.

---

## 🌟 Core Features & Modules

- **Full Semantic Page Architecture:**
  - `index.html` (Landing page with Hero, Stats, Services, Featured Work, Pricing, Process, Testimonials, FAQ, and CTA)
  - `about.html` (Agency story, vision, core values, team, tech stack, and quality standards)
  - `services.html` (Comprehensive breakdown of 8 agency service offerings)
  - `portfolio.html` (Filterable project gallery with live category tabs)
  - `pricing.html` (Transparent pricing matrix, plan comparison, and add-ons)
  - `calculator.html` (Interactive multi-step website cost estimation tool with breakdown & WhatsApp quote generator)
  - `blog.html` (Articles index with live keyword search and category filters)
  - `contact.html` (Direct channels, WhatsApp integration, and consultation intake form)
  - `privacy-policy.html`, `terms-and-conditions.html`, `refund-policy.html`, `404.html`

- **Dedicated Sub-Pages:**
  - `/services/` (8 individual service landing pages)
  - `/projects/` (6 in-depth client case studies with metrics)
  - `/blog/` (6 full-length articles with dynamic Table of Contents and reading progress bar)

- **Interactive Vanilla JS Capabilities:**
  - Sticky glassmorphism header with scroll detection
  - Responsive mobile drawer navigation with animated hamburger
  - Multi-step modal for project quote requests with WhatsApp export
  - Client testimonial slider with touch gestures and dot controls
  - Dynamic FAQ accordion with accessible ARIA attributes
  - Scroll-triggered reveal animations via `IntersectionObserver`
  - Floating WhatsApp quick-connect button
  - Interactive website cost calculator with instant currency calculations

---

## 🚀 How to Run Locally

Because this project is built entirely with standard web technologies:

1. **Option 1: Open Directly**
   - Double click any `.html` file (e.g. `index.html`) to view in any modern browser.

2. **Option 2: Live Server (VS Code / Python / Node)**
   - Using Python: `python3 -m http.server 3000`
   - Using Node: `npx serve .`
   - Using VS Code: Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 Deploy to GitHub Pages

1. Create a new GitHub repository named `webora-website`.
2. Push all files and folders (`css/`, `js/`, `services/`, `projects/`, `blog/`, and all `.html` files) to the `main` branch.
3. In GitHub, go to **Settings > Pages**.
4. Set the source branch to `main` / `root` and click **Save**.
5. Your website will be live at `https://<your-username>.github.io/webora-website/`.

---

## ⚙️ Configuration

Agency contact details and WhatsApp numbers can be updated in `/js/main.js`:

```javascript
const WEBORA_CONFIG = {
  phone: "+91 90672 57872",
  whatsappNumber: "918329931123",
  email: "hello@webora.in",
  address: "Mumbai / Pune, India",
  currency: "₹"
};
```

---

© 2026 WEBORA. All Rights Reserved.
