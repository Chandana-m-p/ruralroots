// ==========================================================================
// RuralRoots — shared front-end behaviour
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initCart();
  initWishlistButtons();
  initHeroSlider();
  initQuantity();
  initCheckoutPage();
  renderCartPage();
});

/* ---------------- Cart helpers (persisted in localStorage) ---------------- */
function safeReadCart() {
  try {
    return JSON.parse(localStorage.getItem("rr_cart_items") || "[]");
  } catch {
    return [];
  }
}

function safeWriteCart(items) {
  localStorage.setItem("rr_cart_items", JSON.stringify(items));
}

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function updateCartBadges() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const count = getCartCount();
  badges.forEach((badge) => {
    badge.textContent = count;
  });
}

function initCart() {
  updateCartBadges();

  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const qtyEl = document.querySelector("[data-qty-value]");
      const qty = qtyEl ? Number(qtyEl.textContent) || 1 : 1;

      const productName = document.querySelector(".pd-info h1")?.textContent || "Product";
      const productPriceText = document.querySelector(".pd-price")?.textContent || "₹0";
      const productPrice = Number(String(productPriceText).replace(/[^0-9]/g, "")) || 0;

      addCartItem({
        name: productName,
        qty,
        price: productPrice,
      });

      const nextCount = getCartCount();
      updateCartBadges();

      btn.textContent = "Added ✓";
      setTimeout(() => (btn.textContent = "Add to Cart"), 1200);

      if (window.location.pathname.endsWith("cart.html")) {
        renderCartPage();
      }
    });
  });
}

function getCartCount() {
  const items = safeReadCart();
  return items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function addCartItem(item) {
  const items = safeReadCart();
  const existing = items.find((entry) => entry.name === item.name);

  if (existing) {
    existing.qty += item.qty;
  } else {
    items.push(item);
  }

  safeWriteCart(items);
}

function renderCartPage() {
  const cartItemsEl = document.querySelector("[data-cart-items]");
  const countSummaryEl = document.querySelector("[data-cart-count-summary]");
  const totalEl = document.querySelector("[data-cart-total]");

  if (!cartItemsEl) return;

  const items = safeReadCart();
  const totalCount = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const subtotal = items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0);

  if (!items.length) {
    cartItemsEl.innerHTML = '<div class="empty-cart">Your cart is empty. Add products from the shop to get started.</div>';
    if (countSummaryEl) countSummaryEl.textContent = "0";
    if (totalEl) totalEl.textContent = formatCurrency(0);
    return;
  }

  cartItemsEl.innerHTML = items
    .map((item) => {
      const itemTotal = Number(item.qty || 0) * Number(item.price || 0);
      return `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <div class="meta">Qty: ${item.qty} · Price: ${formatCurrency(item.price)}</div>
          </div>
          <div class="meta">${formatCurrency(itemTotal)}</div>
        </div>
      `;
    })
    .join("");

  if (countSummaryEl) countSummaryEl.textContent = totalCount;
  if (totalEl) totalEl.textContent = formatCurrency(subtotal);
}

/* ---------------- Checkout flow (browser-side order capture) ---------------- */
function initCheckoutPage() {
  const checkoutForm = document.querySelector("[data-checkout-form]");
  const checkoutItems = document.querySelector("[data-checkout-items]");
  const checkoutSubtotal = document.querySelector("[data-checkout-subtotal]");
  const checkoutShipping = document.querySelector("[data-checkout-shipping]");
  const checkoutTotal = document.querySelector("[data-checkout-total]");
  const successMsg = document.querySelector("[data-order-success]");

  if (!checkoutForm || !checkoutItems) return;

  const items = safeReadCart();
  const subtotal = items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0);
  const shipping = subtotal >= 1000 ? 0 : 149;
  const total = subtotal + shipping;

  if (!items.length) {
    checkoutItems.innerHTML = '<div class="empty-cart">Your cart is empty. Return to the shop to add products before checkout.</div>';
    checkoutSubtotal.textContent = formatCurrency(0);
    checkoutShipping.textContent = formatCurrency(0);
    checkoutTotal.textContent = formatCurrency(0);
    checkoutForm.querySelector("button[type='submit']").disabled = true;
    return;
  }

  checkoutItems.innerHTML = items
    .map((item) => `
      <div class="checkout-item">
        <div>
          <strong>${item.name}</strong>
          <div class="meta">Qty: ${item.qty}</div>
        </div>
        <div class="meta">${formatCurrency(Number(item.qty || 0) * Number(item.price || 0))}</div>
      </div>
    `)
    .join("");

  checkoutSubtotal.textContent = formatCurrency(subtotal);
  checkoutShipping.textContent = formatCurrency(shipping);
  checkoutTotal.textContent = formatCurrency(total);

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const order = {
      name: formData.get("name") || "Guest",
      email: formData.get("email") || "",
      address: formData.get("address") || "",
      payment: formData.get("payment") || "Cash on Delivery",
      items,
      subtotal,
      shipping,
      total,
      orderedAt: new Date().toISOString(),
    };

    localStorage.setItem("rr_latest_order", JSON.stringify(order));
    safeWriteCart([]);
    updateCartBadges();
    renderCartPage();

    checkoutForm.classList.add("is-hidden");
    if (successMsg) {
      successMsg.classList.remove("is-hidden");
      successMsg.innerHTML = `
        <h3>Order placed successfully</h3>
        <p>Thank you, ${order.name}. Your order for ${formatCurrency(total)} has been saved locally and is ready for the next step.</p>
      `;
    }
  });
}

/* ---------------- Wishlist heart toggles ---------------- */
function initWishlistButtons() {
  document.querySelectorAll("[data-wishlist]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.classList.toggle("active");
    });
  });
}

/* ---------------- Hero image slider ---------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll("[data-hero-slide]");
  const dots = document.querySelectorAll("[data-hero-dot]");
  if (!slides.length) return;
  let index = 0;

  function show(i) {
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
    index = i;
  }

  document.querySelector(".hero-nav-btn.next")?.addEventListener("click", () => {
    show((index + 1) % slides.length);
  });
  document.querySelector(".hero-nav-btn.prev")?.addEventListener("click", () => {
    show((index - 1 + slides.length) % slides.length);
  });
  dots.forEach((d, idx) => d.addEventListener("click", () => show(idx)));

  setInterval(() => show((index + 1) % slides.length), 5000);
}

/* ---------------- Product detail: quantity + gallery ---------------- */
function initQuantity() {
  const qtyValue = document.querySelector("[data-qty-value]");
  if (qtyValue) {
    document.querySelector("[data-qty-minus]")?.addEventListener("click", () => {
      const v = Math.max(1, Number(qtyValue.textContent) - 1);
      qtyValue.textContent = v;
    });
    document.querySelector("[data-qty-plus]")?.addEventListener("click", () => {
      qtyValue.textContent = Number(qtyValue.textContent) + 1;
    });
  }

  const thumbs = document.querySelectorAll("[data-thumb]");
  const mainImg = document.querySelector("[data-main-image]");
  thumbs.forEach((t) => {
    t.addEventListener("click", () => {
      thumbs.forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      if (mainImg) mainImg.src = t.src;
    });
  });
}
