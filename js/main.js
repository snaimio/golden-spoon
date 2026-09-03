/**
 * ============================================================================
 * GOLDEN SPOON — HAUTE GASTRONOMIE & FINE DINING PARIS
 * Main Application Script (Vanilla ES6+)
 * 
 * Architecture:
 * - State Management & LocalStorage Persistence
 * - Hash Router & Screen Transition Controller
 * - Menu Engine (Filtering, Dynamic Search, Dietary Chips, Item Modals)
 * - Tasting Bag / Order Tray System (Add/Remove/Subtotal/Live Badges)
 * - Reservation Engine (Live Dates, Time Slots, Validation, Ticket Generation, .ICS Calendar Export)
 * - UI/UX Micro-interactions (Drawer, Accordions, Toasts, Focus Trapping, A11y Live Regions)
 * ============================================================================
 */

'use strict';

/* ==========================================================================
   1. DATA REPOSITORY: CULINARY REPERTOIRE & DISHES
   ========================================================================== */

/**
 * @typedef {Object} Dish
 * @property {string} id - Unique dish identifier
 * @property {string} name - French/English dish name
 * @property {string} category - 'starters' | 'mains' | 'desserts' | 'sommelier'
 * @property {number} price - Numerical price in USD
 * @property {string} description - Gastronomic description
 * @property {string} image - Path to image asset
 * @property {string} pairing - Sommelier wine recommendation
 * @property {string} origin - Sourced provenance
 * @property {string} allergens - Allergen disclosure
 * @property {boolean} isSignature - True if Chef's signature creation
 * @property {boolean} isGF - True if gluten-free
 * @property {boolean} isHighlight - True if featured on home page
 */

/** @type {Dish[]} */
const CULINARY_MENU = [
  // STARTERS & RAW BAR
  {
    id: 'caviar-tartlet',
    name: 'Imperial Osetra Caviar Tartlet',
    category: 'starters',
    course: 'Course 01 · First Movement',
    price: 46,
    description: 'Crisp buckwheat crust, house-smoked crème fraîche, preserved Meyer lemon zest, and 15g Imperial Sturgeon caviar.',
    image: 'resources/caviar.jpg',
    pairing: 'Sparkling Crisp Green Apple & Elderflower Spritz',
    origin: 'Sustainable Coastal Fishery',
    allergens: 'Fish, Dairy',
    isSignature: true,
    isGF: false,
    isVegan: false,
    isHighlight: true
  },
  {
    id: 'sea-bass-crudo',
    name: 'Wild Atlantic Sea Bass Crudo',
    category: 'starters',
    course: 'Course 02 · Ocean Harvest',
    price: 28,
    description: 'Line-caught Atlantic sea bass, blood orange reduction, cold-pressed olive oil, and shaved baby fennel.',
    image: 'resources/bass.jpg',
    pairing: 'Wild Mountain White Tea Cold Brew',
    origin: 'Atlantic Coastal Waters',
    allergens: 'Fin Fish',
    isSignature: true,
    isGF: true,
    isVegan: false,
    isHighlight: true
  },
  {
    id: 'beet-tartare',
    name: 'Smoked Heirloom Beet Tartare',
    category: 'starters',
    course: 'Course 03 · Earth & Garden',
    price: 26,
    description: 'Oak-smoked biodynamic heritage beets, cultured cashew cream, micro-herbs, and golden olive oil emulsion.',
    image: 'resources/beet.jpg',
    pairing: 'Sparkling Rhubarb & Botanical Hibiscus Nectar',
    origin: 'Estate Biodynamic Farm',
    allergens: 'Tree Nuts (Cashew)',
    isSignature: false,
    isGF: true,
    isVegan: true,
    isHighlight: false
  },
  {
    id: 'truffle-consomme',
    name: 'Perigord Black Truffle Broth',
    category: 'starters',
    course: 'Course 04 · Warm Consommé',
    price: 32,
    description: 'Double-clarified golden vegetable consommé, shaved black winter Périgord truffles, and garden chive oil.',
    image: 'resources/broth.jpg',
    pairing: 'Roasted Buckwheat & Smoked Cardamom Tea',
    origin: 'Forest Foraged Harvest',
    allergens: 'None',
    isSignature: false,
    isGF: true,
    isVegan: true,
    isHighlight: false
  },

  // MAINS & ENTRÉES (LAND & SEA)
  {
    id: 'duck-breast',
    name: 'Seared Challans Duck Breast',
    category: 'mains',
    course: 'Course 05 · Poultry & Orchard',
    price: 42,
    description: 'Crisp duck breast glazed with spiced black cherries, charred Belgian endive, and smoked Maldon salt.',
    image: 'resources/duck.jpg',
    pairing: 'Sparkling Jasmine & Yuzu Blossom Tea',
    origin: 'Heritage Farm Estate',
    allergens: 'None',
    isSignature: true,
    isGF: true,
    isVegan: false,
    isHighlight: true
  },
  {
    id: 'black-cod',
    name: 'Pan-Roasted Alaskan Black Cod',
    category: 'mains',
    course: 'Course 06 · Coastal Catch',
    price: 48,
    description: 'Sustainably caught black cod with golden miso reduction, ginger-scented dashi broth, and tender baby bok choy.',
    image: 'resources/cod.jpg',
    pairing: 'Cold-Drip Alpine Oolong & Lemongrass Infusion',
    origin: 'Deep Pacific Waters',
    allergens: 'Fish, Soy',
    isSignature: true,
    isGF: true,
    isVegan: false,
    isHighlight: false
  },
  {
    id: 'morel-risotto',
    name: 'Wild Morel & Truffle Risotto',
    category: 'mains',
    course: 'Course 07 · Forest Harvest',
    price: 38,
    description: 'Aged Acquerello carnaroli rice, foraged Jura morel mushrooms, aged Parmigiano, and shaved black winter truffle.',
    image: 'resources/risotto.jpg',
    pairing: 'Aged Pu-erh & Roasted Hazelnut Infusion',
    origin: 'Jura Mountain Foraging',
    allergens: 'Dairy',
    isSignature: false,
    isGF: true,
    isVegan: false,
    isHighlight: false
  },
  {
    id: 'wagyu-tenderloin',
    name: 'A5 Kagoshima Wagyu Tenderloin',
    category: 'mains',
    course: 'Course 08 · Prime Feature',
    price: 68,
    description: 'Wood-fired A5 Wagyu beef, whipped bone marrow emulsion, black fermented garlic, and silky potato purée.',
    image: 'resources/wagyu.jpg',
    pairing: 'Smoked Black Plum & Cardamom Nectar',
    origin: 'Kagoshima Artisan Ranch',
    allergens: 'Dairy',
    isSignature: true,
    isGF: true,
    isVegan: false,
    isHighlight: true
  },

  // DESSERTS & CONFECTIONS
  {
    id: 'grand-tiramisu',
    name: 'Golden Spoon Tiramisu',
    category: 'desserts',
    course: 'Course 09 · Sweet Finale',
    price: 22,
    description: 'Single-origin espresso soak, artisan whipped mascarpone cream, dark cocoa, and edible 24k gold leaf.',
    image: 'resources/desert.jpg',
    pairing: 'Single-Estate Roasted Barley & Vanilla Infusion',
    origin: 'Pastry Kitchen',
    allergens: 'Dairy, Gluten, Eggs',
    isSignature: false,
    isGF: false,
    isVegan: false,
    isHighlight: true
  },
  {
    id: 'souffle-citrus',
    name: 'Grand Citrus Blossom Soufflé',
    category: 'desserts',
    course: 'Course 10 · Warm Soufflé',
    price: 24,
    description: 'Warm, airy citrus soufflé infused with orange blossom nectar, served with Madagascar vanilla bean cream.',
    image: 'resources/souffle.jpg',
    pairing: 'Golden Chamomile & Bergamot Blossom Tea',
    origin: 'Pastry Kitchen',
    allergens: 'Eggs, Dairy',
    isSignature: true,
    isGF: true,
    isVegan: false,
    isHighlight: false
  },
  {
    id: 'chocolate-sphere',
    name: 'Valrhona Dark Chocolate Sphere',
    category: 'desserts',
    course: 'Course 11 · Tableside Confection',
    price: 26,
    description: '70% Valrhona dark chocolate shell, passionfruit sorbet center, melted tableside with warm golden salted caramel.',
    image: 'resources/sphere.jpg',
    pairing: 'Cold-Brew Rwandan Single-Origin Coffee Infusion',
    origin: 'Chocolatier Atelier',
    allergens: 'Dairy, Soy',
    isSignature: true,
    isGF: true,
    isVegan: false,
    isHighlight: false
  },

  // ZERO-PROOF BOTANICAL & TEA BAR
  {
    id: 'botanical-flight',
    name: 'Artisanal Zero-Proof Botanical Flight',
    category: 'sommelier',
    course: 'Beverage Movement · Master Flight',
    price: 95,
    description: 'Five exquisite cold-drip sparkling teas and herbal infusions curated to elevate each course.',
    image: 'resources/infusion.jpg',
    pairing: 'Curated by Master Herbalist & Tea Sommelier',
    origin: 'Organic Botanical Reserve',
    allergens: 'None',
    isSignature: true,
    isGF: true,
    isVegan: true,
    isHighlight: false
  },
  {
    id: 'botanical-spritz',
    name: 'Yuzu & Lavender Sparkling Spritz',
    category: 'sommelier',
    course: 'Beverage · Zero-Proof Cocktail',
    price: 18,
    description: 'Fresh Japanese yuzu juice, wild English lavender syrup, cold-pressed rosemary sprig, and sparkling mineral water.',
    image: 'resources/spritz.jpg',
    pairing: 'Ideal Aperitif before dinner service',
    origin: 'Botanical Bar Laboratory',
    allergens: 'None',
    isSignature: true,
    isGF: true,
    isVegan: true,
    isHighlight: false
  }
];

/* ==========================================================================
   2. APPLICATION STATE STORE
   ========================================================================== */

const AppState = {
  activeScreen: 'home',
  menu: {
    searchQuery: '',
    selectedCategory: 'all',
    selectedDiet: 'all'
  },
  cart: [],
  reservation: {
    guests: 2,
    date: null,
    dateFormatted: '',
    time: '19:30',
    timeDisplay: '7:30 PM',
    seating: 'Grand Dining Salon',
    occasion: null,
    dietaryNotes: '',
    name: '',
    email: '',
    phone: '',
    bookingCode: ''
  }
};

/* ==========================================================================
   3. STORAGE & ACCESSIBILITY UTILITIES
   ========================================================================== */

/**
 * Save tasting bag state to localStorage
 */
function saveCartToStorage() {
  try {
    localStorage.setItem('gs_cart', JSON.stringify(AppState.cart));
  } catch (err) {
    console.warn('Storage unavailable:', err);
  }
}

/**
 * Restore tasting bag state from localStorage
 */
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('gs_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (err) {
    console.warn('Unable to load cart:', err);
  }
}

/**
 * Announce messages to screen readers via aria-live polite region
 * @param {string} message 
 */
function announceA11y(message) {
  const announcer = document.getElementById('a11yAnnouncer');
  if (announcer) {
    announcer.textContent = message;
  }
}

/**
 * Show a sleek luxury toast notification
 * @param {string} text - Message text
 * @param {'success'|'info'} [type='info'] - Toast style
 */
function showToast(text, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : '✦'}</span>
    <span class="toast-text">${text}</span>
  `;

  container.appendChild(toast);
  announceA11y(text);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}

/* ==========================================================================
   4. NAVIGATION & SCREEN ROUTER
   ========================================================================== */

/**
 * Switch the visible screen and update all nav states
 * @param {string} screenName - 'home' | 'menu' | 'reserve' | 'about'
 * @param {boolean} [updateHash=true] - Whether to push history hash
 */
function navigateToScreen(screenName, updateHash = true) {
  const validScreens = ['home', 'menu', 'reserve', 'about'];
  if (!validScreens.includes(screenName)) {
    screenName = 'home';
  }

  AppState.activeScreen = screenName;

  // Toggle screens
  document.querySelectorAll('.screen').forEach(screen => {
    if (screen.id === `screen-${screenName}`) {
      screen.hidden = false;
      screen.classList.add('fade-in');
    } else {
      screen.hidden = true;
      screen.classList.remove('fade-in');
    }
  });

  // Update Desktop Nav
  document.querySelectorAll('.desktop-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenName);
  });

  // Update Mobile Bottom Tab Bar
  document.querySelectorAll('.tab-bar .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenName);
  });

  // Update Mobile Drawer Links
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.classList.toggle('active', link.dataset.screen === screenName);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update URL Hash safely (supports file:// and http/https origins)
  if (updateHash && window.location.hash.replace('#', '') !== screenName) {
    try {
      history.pushState(null, '', `#${screenName}`);
    } catch (e) {
      try {
        window.location.hash = screenName;
      } catch (err) {
        // Fallback silently if hash is locked
      }
    }
  }

  // Accessibility announcement
  announceA11y(`Navigated to ${screenName.toUpperCase()} page.`);
}

/**
 * Setup hashchange and history navigation listeners
 */
function setupRouter() {
  // Listen to popstate / hashchange
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      navigateToScreen(hash, false);
    }
  });

  // Initial load from URL hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    navigateToScreen(initialHash, false);
  } else {
    navigateToScreen('home', false);
  }

  // Global click delegator for screen switching
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-screen]');
    if (target) {
      event.preventDefault();
      const screen = target.dataset.screen;
      navigateToScreen(screen);
      closeDrawer();
    }
  });
}

/* ==========================================================================
   5. MOBILE DRAWER CONTROLLER
   ========================================================================== */

const DrawerController = {
  drawer: null,
  backdrop: null,
  menuBtn: null,
  closeBtn: null,

  init() {
    this.drawer = document.getElementById('drawer');
    this.backdrop = document.getElementById('drawerBackdrop');
    this.menuBtn = document.getElementById('menuBtn');
    this.closeBtn = document.getElementById('drawerClose');

    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', () => this.open());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Escape key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer.classList.contains('open')) {
        this.close();
      }
    });
  },

  open() {
    this.drawer.classList.add('open');
    this.backdrop.classList.add('open');
    this.drawer.setAttribute('aria-hidden', 'false');
    if (this.menuBtn) this.menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    this.closeBtn.focus();
  },

  close() {
    this.drawer.classList.remove('open');
    this.backdrop.classList.remove('open');
    this.drawer.setAttribute('aria-hidden', 'true');
    if (this.menuBtn) this.menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
};

function closeDrawer() {
  DrawerController.close();
}

/* ==========================================================================
   6. TASTING BAG / ORDER TRAY SYSTEM
   ========================================================================== */

/**
 * Add a dish to tasting bag
 * @param {string} dishId 
 */
function addToCart(dishId) {
  const dish = CULINARY_MENU.find(d => d.id === dishId);
  if (!dish) return;

  const existing = AppState.cart.find(item => item.id === dishId);
  if (existing) {
    existing.quantity += 1;
  } else {
    AppState.cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added "${dish.name}" to your tasting bag`, 'success');

  // Badge animation
  const badge = document.getElementById('cartBadgeCount');
  if (badge) {
    badge.classList.remove('pop');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('pop');
  }
}

/**
 * Update quantity of an item in cart
 * @param {string} dishId 
 * @param {number} delta - (+1 or -1)
 */
function updateCartItemQty(dishId, delta) {
  const itemIndex = AppState.cart.findIndex(i => i.id === dishId);
  if (itemIndex === -1) return;

  AppState.cart[itemIndex].quantity += delta;
  if (AppState.cart[itemIndex].quantity <= 0) {
    AppState.cart.splice(itemIndex, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

/**
 * Empty all items from bag
 */
function clearCart() {
  AppState.cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast('Tasting bag cleared', 'info');
}

/**
 * Re-render Cart Drawer and Badge UI
 */
function updateCartUI() {
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update Badge
  const badge = document.getElementById('cartBadgeCount');
  if (badge) {
    badge.textContent = totalItems;
    badge.setAttribute('aria-label', `${totalItems} items in tasting bag`);
  }

  // Update Cart Drawer Subtitle
  const subtitle = document.getElementById('cartItemCountSubtitle');
  if (subtitle) {
    subtitle.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
  }

  // Cart elements
  const emptyState = document.getElementById('emptyCartState');
  const itemsList = document.getElementById('cartItemsList');
  const cartFooter = document.getElementById('cartFooter');
  const totalDisplay = document.getElementById('cartTotalPrice');

  if (!itemsList) return;

  if (AppState.cart.length === 0) {
    if (emptyState) emptyState.hidden = false;
    itemsList.innerHTML = '';
    if (cartFooter) cartFooter.hidden = true;
  } else {
    if (emptyState) emptyState.hidden = true;
    if (cartFooter) cartFooter.hidden = false;
    if (totalDisplay) totalDisplay.textContent = `CA$${totalPrice.toFixed(2)}`;

    itemsList.innerHTML = AppState.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='resources/hero.jpg'">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">CA$${item.price} each</p>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-count">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `).join('');
  }
}

/**
 * Setup Cart Modal Controllers
 */
function setupCartModal() {
  const modal = document.getElementById('cartModal');
  const triggerBtn = document.getElementById('cartTriggerBtn');
  const closeBtn = document.getElementById('cartCloseBtn');
  const clearBtn = document.getElementById('clearCartBtn');
  const exploreBtn = document.getElementById('exploreMenuFromCartBtn');
  const proceedBtn = document.getElementById('proceedToReserveBtn');

  if (triggerBtn && modal) {
    triggerBtn.addEventListener('click', () => modal.showModal());
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => clearCart());
  }
  if (exploreBtn && modal) {
    exploreBtn.addEventListener('click', () => {
      modal.close();
      navigateToScreen('menu');
    });
  }
  if (proceedBtn && modal) {
    proceedBtn.addEventListener('click', () => {
      modal.close();
      navigateToScreen('reserve');
    });
  }
}

/* ==========================================================================
   7. DISH DETAIL DIALOG MODAL CONTROLLER
   ========================================================================== */

/**
 * Open detailed modal view for a specific dish
 * @param {string} dishId 
 */
function openDishModal(dishId) {
  const dish = CULINARY_MENU.find(d => d.id === dishId);
  const modal = document.getElementById('dishDetailModal');
  if (!dish || !modal) return;

  document.getElementById('modalDishImg').src = dish.image;
  document.getElementById('modalDishCategory').textContent = `${dish.course ? dish.course.toUpperCase() : dish.category.toUpperCase()}`;
  document.getElementById('modalDishName').textContent = dish.name;
  document.getElementById('modalDishPrice').textContent = `CA$${dish.price}`;
  document.getElementById('modalDishDesc').textContent = dish.description;
  document.getElementById('modalPairingText').textContent = dish.pairing;
  document.getElementById('modalOrigin').textContent = dish.origin;
  document.getElementById('modalAllergens').textContent = dish.allergens;

  const badgesWrap = document.getElementById('modalBadges');
  badgesWrap.innerHTML = '';
  if (dish.isSignature) {
    badgesWrap.innerHTML += '<span class="diet-badge">★ Chef Signature</span>';
  }
  if (dish.isGF) {
    badgesWrap.innerHTML += '<span class="diet-badge">GF (Gluten Free)</span>';
  }
  if (dish.isVegan) {
    badgesWrap.innerHTML += '<span class="diet-badge">🌱 Vegan / Plant-Based</span>';
  }

  const addBtn = document.getElementById('modalAddBtn');
  addBtn.onclick = () => {
    addToCart(dish.id);
    modal.close();
  };

  modal.showModal();
}

function setupDishModal() {
  const modal = document.getElementById('dishDetailModal');
  const closeBtn = document.getElementById('dishModalCloseBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

/* ==========================================================================
   8. MENU RENDERING & FILTERING ENGINE
   ========================================================================== */

/**
 * Render home highlights grid
 */
function renderHomeHighlights() {
  const grid = document.getElementById('homeHighlightsGrid');
  if (!grid) return;

  const highlights = CULINARY_MENU.filter(d => d.isHighlight);

  grid.innerHTML = highlights.map(dish => `
    <article class="dish-card" onclick="openDishModal('${dish.id}')">
      <div class="dish-media">
        <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy" onerror="this.src='resources/hero.jpg'">
      </div>
      <div class="dish-info">
        <span class="dish-course-tag">${dish.course || 'Chef Selection'}</span>
        <div class="dish-header">
          <h3 class="dish-name">${dish.name}</h3>
          <span class="dish-price">CA$${dish.price}</span>
        </div>
        <p class="dish-desc">${dish.description}</p>
        <div class="dish-badge-row">
          ${dish.isSignature ? '<span class="diet-badge">Chef Pick ★</span>' : ''}
          ${dish.isGF ? '<span class="diet-badge">GF</span>' : ''}
          ${dish.isVegan ? '<span class="diet-badge">Vegan</span>' : ''}
        </div>
      </div>
      <button type="button" class="dish-add-btn" aria-label="Add ${dish.name} to order" onclick="event.stopPropagation(); addToCart('${dish.id}')">+</button>
    </article>
  `).join('');
}

/**
 * Filter and render full menu items
 */
function renderFullMenu() {
  const grid = document.getElementById('fullMenuGrid');
  const countDisplay = document.getElementById('menuCountText');
  const noResultsBox = document.getElementById('noResultsBox');
  if (!grid) return;

  const q = AppState.menu.searchQuery.toLowerCase().trim();
  const cat = AppState.menu.selectedCategory;
  const diet = AppState.menu.selectedDiet;

  const filtered = CULINARY_MENU.filter(dish => {
    // Category check
    if (cat !== 'all' && dish.category !== cat) return false;

    // Dietary check
    if (diet === 'gf' && !dish.isGF) return false;
    if (diet === 'vegan' && !dish.isVegan) return false;
    if (diet === 'chef' && !dish.isSignature) return false;
    if (diet === 'pairing' && !dish.pairing) return false;

    // Search query check
    if (q) {
      const matchName = dish.name.toLowerCase().includes(q);
      const matchDesc = dish.description.toLowerCase().includes(q);
      const matchPairing = dish.pairing.toLowerCase().includes(q);
      const matchOrigin = dish.origin.toLowerCase().includes(q);
      const matchCourse = dish.course ? dish.course.toLowerCase().includes(q) : false;
      if (!matchName && !matchDesc && !matchPairing && !matchOrigin && !matchCourse) return false;
    }

    return true;
  });

  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'creation' : 'creations'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResultsBox) noResultsBox.hidden = false;
    return;
  }

  if (noResultsBox) noResultsBox.hidden = true;

  grid.innerHTML = filtered.map(dish => `
    <article class="menu-card" onclick="openDishModal('${dish.id}')">
      <div class="menu-card-media">
        <img src="${dish.image}" alt="${dish.name}" class="menu-card-img" loading="lazy" onerror="this.src='resources/hero.jpg'">
        <div class="menu-card-badges">
          ${dish.isSignature ? '<span class="diet-badge">★ Chef Signature</span>' : ''}
          ${dish.isGF ? '<span class="diet-badge">GF</span>' : ''}
          ${dish.isVegan ? '<span class="diet-badge">Vegan</span>' : ''}
        </div>
      </div>
      <div class="menu-card-body">
        <span class="menu-card-course">${dish.course || 'À La Carte'}</span>
        <div class="menu-card-header">
          <h3 class="menu-card-title">${dish.name}</h3>
          <span class="menu-card-price">CA$${dish.price}</span>
        </div>
        <p class="menu-card-desc">${dish.description}</p>
        <div class="menu-card-pairing">
          <span class="pairing-icon">🍃</span>
          <span>${dish.pairing}</span>
        </div>
        <div class="menu-card-footer">
          <span class="item-details-link">View Notes & Provenance →</span>
          <button type="button" class="dish-add-btn" aria-label="Add ${dish.name} to order" onclick="event.stopPropagation(); addToCart('${dish.id}')">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Setup Menu Filters, Search, and Tasting CTA
 */
function setupMenuControls() {
  const searchInput = document.getElementById('menuSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const catPills = document.querySelectorAll('.cat-pill');
  const dietChips = document.querySelectorAll('.diet-chip');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const addTastingBtn = document.getElementById('addTastingBtn');

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.menu.searchQuery = e.target.value;
      if (clearBtn) clearBtn.hidden = !e.target.value;
      renderFullMenu();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      AppState.menu.searchQuery = '';
      clearBtn.hidden = true;
      searchInput.focus();
      renderFullMenu();
    });
  }

  // Category Tabs
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      AppState.menu.selectedCategory = pill.dataset.category;
      renderFullMenu();
    });
  });

  // Dietary Chips
  dietChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dietChips.forEach(c => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      AppState.menu.selectedDiet = chip.dataset.diet;
      renderFullMenu();
    });
  });

  // Reset Filters
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      AppState.menu.searchQuery = '';
      if (clearBtn) clearBtn.hidden = true;

      AppState.menu.selectedCategory = 'all';
      catPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));

      AppState.menu.selectedDiet = 'all';
      dietChips.forEach(c => c.setAttribute('aria-pressed', c.dataset.diet === 'all' ? 'true' : 'false'));

      renderFullMenu();
    });
  }

  // Add Grand Tasting Experience CTA
  if (addTastingBtn) {
    addTastingBtn.addEventListener('click', () => {
      const existing = AppState.cart.find(i => i.id === 'grand-tasting');
      if (existing) {
        existing.quantity += 1;
      } else {
        AppState.cart.push({
          id: 'grand-tasting',
          name: 'The Grand Tasting Experience (8 Courses)',
          price: 245,
          image: 'resources/philosophy.jpg',
          quantity: 1
        });
      }
      saveCartToStorage();
      updateCartUI();
      showToast('Added 8-Course Tasting Experience to Bag', 'success');
    });
  }
}

/* ==========================================================================
   9. RESERVATION ENGINE & VALIDATION SYSTEM
   ========================================================================== */

/**
 * Format a Date object into 'Day, Mon DD' format
 * @param {Date} date 
 * @returns {string}
 */
function formatDateLabel(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

/**
 * Generate the next 7 quick reservation dates
 */
function generateQuickDates() {
  const container = document.getElementById('quickDatesContainer');
  const customPicker = document.getElementById('customDatePicker');
  if (!container) return;

  const today = new Date();
  // Set default reservation date to today
  AppState.reservation.date = today;
  AppState.reservation.dateFormatted = 'Tonight (' + formatDateLabel(today) + ')';

  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const isSelected = i === 0;
    const dayName = i === 0 ? 'Tonight' : (i === 1 ? 'Tomorrow' : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]);
    const dayNum = d.getDate();
    const dateISO = d.toISOString().split('T')[0];

    html += `
      <button type="button" class="date-pill ${isSelected ? 'selected' : ''}" data-date="${dateISO}" data-label="${formatDateLabel(d)}">
        <span class="date-day-name">${dayName}</span>
        <span class="date-number">${dayNum}</span>
      </button>
    `;
  }

  container.innerHTML = html;

  // Setup custom date min attribute
  if (customPicker) {
    customPicker.min = today.toISOString().split('T')[0];
  }

  // Attach click listeners to date pills
  container.querySelectorAll('.date-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.date-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      if (customPicker) customPicker.value = '';

      AppState.reservation.date = new Date(pill.dataset.date);
      AppState.reservation.dateFormatted = pill.dataset.label;
      updateReservationSummary();
    });
  });

  // Custom date picker change
  if (customPicker) {
    customPicker.addEventListener('change', (e) => {
      if (!e.target.value) return;
      container.querySelectorAll('.date-pill').forEach(p => p.classList.remove('selected'));
      
      const customD = new Date(e.target.value + 'T12:00:00');
      AppState.reservation.date = customD;
      AppState.reservation.dateFormatted = formatDateLabel(customD);
      updateReservationSummary();
    });
  }
}

/**
 * Update the reservation overview summary text
 */
function updateReservationSummary() {
  const summaryEl = document.getElementById('reserveSummary');
  if (!summaryEl) return;

  const r = AppState.reservation;
  const parts = [
    `${r.guests} ${r.guests === 1 ? 'Guest' : 'Guests'}`,
    r.dateFormatted || 'Tonight',
    r.timeDisplay,
    r.seating
  ];

  if (r.occasion) {
    parts.push(r.occasion);
  }

  summaryEl.textContent = parts.join(' · ');
}

/**
 * Setup Reservation form controls, counters, and validation
 */
function setupReservationEngine() {
  generateQuickDates();

  // Guest Count Increment/Decrement
  const minusBtn = document.getElementById('guestMinus');
  const plusBtn = document.getElementById('guestPlus');
  const countEl = document.getElementById('guestCount');

  const updateGuests = (change) => {
    const min = 1;
    const max = 8;
    AppState.reservation.guests += change;
    if (AppState.reservation.guests < min) AppState.reservation.guests = min;
    if (AppState.reservation.guests > max) AppState.reservation.guests = max;

    if (countEl) countEl.textContent = AppState.reservation.guests;
    if (minusBtn) minusBtn.disabled = AppState.reservation.guests <= min;
    if (plusBtn) plusBtn.disabled = AppState.reservation.guests >= max;

    updateReservationSummary();
  };

  if (minusBtn) minusBtn.addEventListener('click', () => updateGuests(-1));
  if (plusBtn) plusBtn.addEventListener('click', () => updateGuests(1));

  // Time Slot Selection
  const timeSlots = document.querySelectorAll('.time-slot');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => {
        s.classList.remove('selected');
        s.setAttribute('aria-checked', 'false');
      });
      slot.classList.add('selected');
      slot.setAttribute('aria-checked', 'true');

      AppState.reservation.time = slot.dataset.time;
      AppState.reservation.timeDisplay = slot.querySelector('.slot-time').textContent;
      updateReservationSummary();
    });
  });

  // Seating Preference Radio Cards
  const seatingCards = document.querySelectorAll('.seating-radio-card');
  seatingCards.forEach(card => {
    card.addEventListener('click', () => {
      seatingCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        AppState.reservation.seating = card.querySelector('.card-title').textContent;
        updateReservationSummary();
      }
    });
  });

  // Occasion Chips
  const chips = document.querySelectorAll('#occasionChips .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const wasSelected = chip.classList.contains('selected');
      chips.forEach(c => c.classList.remove('selected'));

      if (!wasSelected) {
        chip.classList.add('selected');
        AppState.reservation.occasion = chip.dataset.occasion;
      } else {
        AppState.reservation.occasion = null;
      }
      updateReservationSummary();
    });
  });

  // Form Submission & Validation
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('guestName');
      const emailInput = document.getElementById('guestEmail');
      const phoneInput = document.getElementById('guestPhone');
      const notesInput = document.getElementById('dietaryNotes');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        document.getElementById('nameError').classList.add('visible');
        nameInput.classList.add('error');
        isValid = false;
      } else {
        document.getElementById('nameError').classList.remove('visible');
        nameInput.classList.remove('error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        document.getElementById('emailError').classList.add('visible');
        emailInput.classList.add('error');
        isValid = false;
      } else {
        document.getElementById('emailError').classList.remove('visible');
        emailInput.classList.remove('error');
      }

      // Validate Phone
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 6) {
        document.getElementById('phoneError').classList.add('visible');
        phoneInput.classList.add('error');
        isValid = false;
      } else {
        document.getElementById('phoneError').classList.remove('visible');
        phoneInput.classList.remove('error');
      }

      if (!isValid) {
        showToast('Please correct the highlighted fields.', 'info');
        return;
      }

      // Save reservation state
      AppState.reservation.name = nameInput.value.trim();
      AppState.reservation.email = emailInput.value.trim();
      AppState.reservation.phone = phoneInput.value.trim();
      AppState.reservation.dietaryNotes = notesInput ? notesInput.value.trim() : '';

      // Generate random booking reference
      const randNum = Math.floor(1000 + Math.random() * 9000);
      AppState.reservation.bookingCode = `#GS-${randNum}`;

      // Open Success Modal with ticket details
      openSuccessModal();
    });
  }

  updateReservationSummary();
}

/**
 * Open confirmation ticket modal
 */
function openSuccessModal() {
  const modal = document.getElementById('bookingSuccessModal');
  if (!modal) return;

  const r = AppState.reservation;
  document.getElementById('ticketCode').textContent = r.bookingCode;
  document.getElementById('ticketName').textContent = r.name;
  document.getElementById('ticketParty').textContent = `${r.guests} ${r.guests === 1 ? 'Guest' : 'Guests'}`;
  document.getElementById('ticketDateTime').textContent = `${r.dateFormatted}, ${r.timeDisplay}`;
  document.getElementById('ticketSeating').textContent = r.seating;

  modal.showModal();
  showToast('Table reservation confirmed!', 'success');
}

/**
 * Generate and download an .ics iCalendar file for reservation
 */
function exportCalendarEvent() {
  const r = AppState.reservation;
  const title = `Dinner at Golden Spoon (${r.bookingCode})`;
  const description = `Reservation for ${r.guests} guests in ${r.seating}. 18 Turenne Avenue, Central District. Contact: +1 (555) 012-3456.`;
  const location = 'Golden Spoon, 18 Turenne Avenue, Central District';

  const d = r.date || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const [hours, mins] = r.time ? r.time.split(':') : ['19', '30'];

  const startDate = `${year}${month}${day}T${hours}${mins}00`;
  const endHours = String(Number(hours) + 2).padStart(2, '0');
  const endDate = `${year}${month}${day}T${endHours}${mins}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Golden Spoon Paris//Dining Reservation//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `GoldenSpoon-Reservation-${r.bookingCode.replace('#', '')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('Calendar invite downloaded (.ics)', 'success');
}

function setupSuccessModal() {
  const modal = document.getElementById('bookingSuccessModal');
  const doneBtn = document.getElementById('successDoneBtn');
  const calBtn = document.getElementById('calendarExportBtn');

  if (doneBtn && modal) {
    doneBtn.addEventListener('click', () => {
      modal.close();
      navigateToScreen('home');
    });
  }
  if (calBtn) {
    calBtn.addEventListener('click', () => exportCalendarEvent());
  }
}

/* ==========================================================================
   10. FAQ ACCORDION CONTROLLER
   ========================================================================== */

function setupFAQAccordion() {
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  const headers = accordion.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;

      // Close other items
      headers.forEach(h => {
        h.setAttribute('aria-expanded', 'false');
        if (h.nextElementSibling) h.nextElementSibling.hidden = true;
      });

      // Toggle clicked item
      if (!isExpanded) {
        header.setAttribute('aria-expanded', 'true');
        if (content) content.hidden = false;
      }
    });
  });
}

/* ==========================================================================
   11. GLOBAL EXPORTS & INITIALIZATION
   ========================================================================== */

// Expose core actions globally for inline event handlers and external controllers
window.addToCart = addToCart;
window.updateCartItemQty = updateCartItemQty;
window.clearCart = clearCart;
window.openDishModal = openDishModal;
window.navigateToScreen = navigateToScreen;
window.closeDrawer = closeDrawer;
window.exportCalendarEvent = exportCalendarEvent;

function initApplication() {
  // 1. Setup Navigation & Hash Router
  setupRouter();

  // 2. Initialize Mobile Drawer Controller
  DrawerController.init();

  // 3. Render Home Highlights & Full Menu
  renderHomeHighlights();
  renderFullMenu();
  setupMenuControls();

  // 4. Setup Modals
  setupCartModal();
  setupDishModal();
  setupSuccessModal();

  // 5. Setup Reservation Engine
  setupReservationEngine();

  // 6. Setup Story FAQs
  setupFAQAccordion();

  // 7. Restore Tasting Bag from Storage
  loadCartFromStorage();

  // Development banner
  console.log('%c🍽️ Golden Spoon Paris — Haute Cuisine Platform Active', 'color:#d4a94e; font-size:14px; font-weight:bold;');
  console.log('%c✨ Version 2.0.0 — All Navigation & Interactive Controls Operational', 'color:#c7beaf; font-size:11px;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApplication);
} else {
  initApplication();
}