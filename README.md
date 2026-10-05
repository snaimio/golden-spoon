<div align="center">

# 🥄 Golden Spoon — Fine Dining Restaurant Landing Page & Reservation Suite
### Luxury Contemporary Gastronomy Web Application • Interactive Tasting Menu • Dynamic Reservation Engine

[![Web App](https://img.shields.io/badge/Platform-Web%20%2F%20Mobile--First-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://snaimio.github.io/golden-spoon/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modern%20Design%20Tokens-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%202.1%20Compliant-blue?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License](https://img.shields.io/badge/License-MIT-CEFF00?style=for-the-badge&logoColor=black)](LICENSE)

<br/>

**A luxury, mobile-first fine dining restaurant landing page and interactive booking application built with semantic HTML5, glassmorphism design tokens in CSS3, and modular vanilla JavaScript (ES6+).**

<br/>

[Live Experience](#-features) •
[Architecture & Structure](#-project-structure) •
[Quick Start](#-quick-start) •
[License](#-license)

</div>

<br/>

---

## 📌 Overview

**Golden Spoon** is a responsive single-page web application and culinary landing platform. It features an interactive seasonal tasting menu with dynamic dietary filtering and real-time search, a multi-step table reservation engine with calendar invite export (`.ics`), and a localized persistent order/tasting bag.

---

## ✨ Core Features

- **📱 Mobile-First & Responsive Architecture:**
  - Fluid typography powered by CSS `clamp()` scaling across mobile devices, tablets, and ultra-wide displays.
  - Thumb-friendly touch targets ($\ge 44\text{px}$), safe-area padding, and accessible bottom navigation.
  - Accessible screen transitions and live region announcements (`aria-live`).

- **🍽️ Interactive Course-by-Course Tasting Menu:**
  - 13-dish seasonal repertoire spanning *Amuse-Bouche*, *Ocean Harvest*, *Mains (Land & Sea)*, *Tableside Confections*, and *Zero-Proof Botanical Elixirs*.
  - Instant client-side search by title, ingredient, origin provenance, or pairing.
  - Multi-category dietary filtering (*Gluten-Free*, *Plant-Based*, *Chef's Signature*, *Botanical Pairing*).
  - High-resolution photography for each culinary creation.

- **📅 Multi-Step Table Reservation Engine:**
  - Interactive party size selector with private dining concierge workflows for groups of 7+.
  - Dynamic 14-day interactive booking carousel and time slot selection.
  - Atmosphere selector (*Grand Dining Salon*, *Chef's Counter*, *Botanical Conservatory*).
  - Interactive form validation with instant calendar event (`.ics`) download for Apple and Google Calendar.

- **🛍️ Tasting Bag & State Management:**
  - Persistent shopping bag state backed by browser `localStorage`.
  - Slide-over bag modal with quantity mutations and instant Canadian Dollar (`CA$`) subtotal calculations.

---

## 📂 Project Structure

```
golden-spoon/
├── index.html          # Semantic HTML5 single-page application structure & Schema.org JSON-LD
├── css/
│   └── style.css       # Mobile-first CSS3 with design tokens, glassmorphism, & fluid layouts
├── js/
│   └── main.js         # Vanilla ES6+ state management, router, menu engine, & booking system
├── resources/          # High-resolution optimized imagery & brand assets
│   ├── logo.jpg        # Golden Spoon brand emblem
│   ├── hero.jpg        # Ambient dining room header photography
│   ├── philosophy.jpg  # Kitchen culinary craft photography
│   └── ...             # High-resolution dish & beverage photography
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/snaimio/golden-spoon.git
cd golden-spoon
```

### 2. Open in browser
```bash
open index.html
```
*Or serve with any static web server:*
```bash
npx serve .
# or
python3 -m http.server 8000
```

---

## 📄 License

This project is open source and licensed under the [MIT License](LICENSE).
