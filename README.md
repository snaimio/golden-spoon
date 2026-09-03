# 🥄 Golden Spoon — Haute Gastronomy & Tasting Experience

![License](https://img.shields.io/badge/license-MIT-gold.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![Currency](https://img.shields.io/badge/Pricing-CAD%20(CA%24)-green)
![Alcohol-Free](https://img.shields.io/badge/Menu-Zero--Proof%20%26%20Botanical-brightgreen)

A luxury, mobile-first, zero-dependency progressive web application for **Golden Spoon**, an acclaimed contemporary fine dining restaurant. Built with clean semantic HTML5, modern CSS3 (Custom Properties, Glassmorphism, Fluid Typography), and modular Vanilla JavaScript (ES6+).

---

## ✨ Features

- **📱 Mobile-First & Fully Responsive Architecture:**
  - Fluid typography using CSS `clamp()` scaling smoothly across all mobile devices, tablets, and desktop displays.
  - Accessible touch targets ($\ge 44\text{px}$), safe area padding, and fixed bottom navigation for effortless thumb-zone navigation.
  - Smooth screen transitions with accessible live region announcements (`aria-live`).

- **🍽️ Course-by-Course Fine Dining Menu:**
  - Complete 13-dish seasonal repertoire spanning *Amuse-Bouche*, *Ocean Harvest*, *Mains (Land & Sea)*, *Tableside Confections*, and *Zero-Proof Botanical Elixirs*.
  - Real-time search by title, ingredient, provenance, or tea pairing.
  - Category and dietary filtering (*Gluten-Free*, *Plant-Based / Vegan*, *Chef's Signature ★*, *With Botanical Pairing*).
  - High-resolution, unrepeated photography for every dish.

- **🍃 100% Zero-Proof & Botanical Pairings:**
  - No alcohol across the entire menu.
  - Curated pairings featuring single-estate cold-drip teas, sparkling botanical infusions, fruit nectars, and herbal spritzes.

- **📅 Interactive Multi-Step Reservation System:**
  - Interactive party size selector with automatic private dining concierge trigger for parties of 7+.
  - Dynamic 14-day booking carousel and interactive time slot selector.
  - Atmosphere selection (*Grand Dining Salon*, *Chef's Culinary Counter*, *Botanical Tea & Herb Conservatory*).
  - Form validation with error feedback.
  - Generates a confirmation invitation pass with downloadable **Apple / Google `.ics` Calendar event**.

- **🛍️ Tasting Bag & Order Tray:**
  - Persistent cart state backed by `localStorage`.
  - Slide-over bag modal with item quantity adjustments and instant Canadian Dollar (`CA$`) subtotal calculations.

---

## 📂 Project Structure

```
golden-spoon/
├── index.html          # Semantic HTML5 single-page application structure & Schema.org JSON-LD
├── css/
│   └── style.css       # Mobile-first CSS3 with design tokens, glassmorphism, & fluid layouts
├── js/
│   └── main.js         # Vanilla ES6+ state management, router, menu engine, & booking system
├── resources/          # High-resolution optimized imagery & brand logo
│   ├── logo.jpg        # Golden Spoon brand emblem & favicon
│   ├── hero.jpg        # Ambient dining room header photography
│   ├── philosophy.jpg  # Kitchen & Chef plating photography
│   ├── story.jpg       # Dining hall interior photography
│   ├── bass.jpg        # Wild Sea Bass Crudo
│   ├── beet.jpg        # Smoked Heirloom Beet Tartare
│   ├── broth.jpg       # Périgord Black Truffle Broth
│   ├── caviar.jpg      # Imperial Osetra Caviar Tartlet
│   ├── cod.jpg         # Pan-Roasted Alaskan Black Cod
│   ├── duck.jpg        # Seared Challans Duck Breast
│   ├── wagyu.jpg       # A5 Kagoshima Wagyu Tenderloin
│   ├── risotto.jpg     # Wild Morel & Truffle Risotto
│   ├── desert.jpg      # Golden Spoon Tiramisu
│   ├── souffle.jpg     # Grand Citrus Blossom Soufflé
│   ├── sphere.jpg      # Valrhona Dark Chocolate Sphere
│   ├── infusion.jpg    # Artisanal Zero-Proof Botanical Flight
│   └── spritz.jpg      # Yuzu & Lavender Sparkling Spritz
└── README.md
```

---

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/snaimio/golden-spoon.git
   cd golden-spoon
   ```

2. **Open in browser:**
   ```bash
   open index.html
   ```
   *Or serve via any static web server:*
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
