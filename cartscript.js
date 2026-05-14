let carticon = document.querySelectorAll(".carticon");
let productarray = [];

// ===== CART BADGE UPDATE =====
function updateCartBadge() {
  const totalItems = productarray.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const badge = document.getElementById("cartBadge");
  const badgeMobile = document.getElementById("cartBadgeMobile");

  if (badge) badge.textContent = totalItems;
  if (badgeMobile) badgeMobile.textContent = totalItems;
}

// Page load-ல் badge 0 show ஆகணும்
document.addEventListener("DOMContentLoaded", updateCartBadge);

// ===== ADD TO CART =====
carticon.forEach(function (add) {
  add.addEventListener("click", function () {
    const parent = this.closest(".decoimgs");
    const imgUrl = parent.querySelector(".proimg").src;
    const proname = parent.querySelector(".proname").innerText;
    const proprice = parent.querySelector(".proprice").innerText;

    let exist = productarray.find((item) => item.name === proname);

    if (exist) {
      exist.quantity += 1;
    } else {
      productarray.push({
        name: proname,
        price: proprice,
        image: imgUrl,
        quantity: 1,
      });
    }

    updateCartBadge(); // badge update
    showAddedOverlay(proname);
  });
});

function showAddedOverlay(productName) {
  const currentproduct = productarray.find((item) => item.name === productName);

  const overlaycart = document.querySelector(".overlaycart");
  overlaycart.classList.add("show");

  overlaycart.innerHTML = cartdesign(
    currentproduct.image,
    currentproduct.name,
    currentproduct.price,
    currentproduct.quantity
  );

  // Close button
  overlaycart.querySelector(".closeicon").addEventListener("click", () => {
    overlaycart.classList.remove("show");
    if (typeof unlockScroll === "function") unlockScroll();
  });

  // Continue Shopping button
  overlaycart.querySelector(".cartbtn2").addEventListener("click", () => {
    overlaycart.classList.remove("show");
    if (typeof unlockScroll === "function") unlockScroll();
  });

  // View Cart button — opens sidebar
  overlaycart.querySelector(".cartbtn3").addEventListener("click", () => {
    overlaycart.classList.remove("show");
    renderCart();
  });

  if (typeof lockScroll === "function") lockScroll();
}

function cartdesign(image, name, price, quantity) {
  let numericPrice = Number(price.replace(/[^0-9.]/g, ""));
  let total = (quantity * numericPrice).toFixed(2);

  return `
    <div class="cartform">
      <section class="carted">
        <p>Added to cart successfully. What is next?</p>
        <span><i class="closeicon ri-close-fill"></i></span>
      </section>

      <div class="cartform-body">
        <div class="cartform-left">
          <img src="${image}" class="cartform-img" />
          <div class="cartform-info">
            <p class="cartform-name">${name}</p>
            <span class="cartform-price">${quantity} &times; <strong>${price.startsWith("$") ? price : "$" + price}</strong></span>
          </div>
        </div>

        <div class="cartcheck">
          <button type="button" class="cartbtn1">CHECKOUT</button>
          <p class="order">Order subtotal</p>
          <p class="rate">$${total}</p>
          <p class="order">Your cart contains ${quantity} item${quantity > 1 ? "s" : ""}</p>
          <button type="button" class="cartbtn2">CONTINUE SHOPPING</button>
          <button type="button" class="cartbtn3">VIEW CART</button>
        </div>
      </div>
    </div>
  `;
}

// ===== CART SIDEBAR =====
const shoplisticons = document.querySelectorAll(".shoplisticon");

shoplisticons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    renderCart();
  });
});

function renderCart() {
  const cartoverlay = document.querySelector(".cartoverlay");
  cartoverlay.classList.add("show1");

  cartoverlay.innerHTML = wholecart();

  if (typeof lockScroll === "function") lockScroll();

  cartoverlay.querySelector(".closecartbtn").addEventListener("click", () => {
    cartoverlay.classList.remove("show1");
    if (typeof unlockScroll === "function") unlockScroll();
  });

  // Close when clicking dark backdrop
  cartoverlay.addEventListener("click", function (e) {
    if (e.target === cartoverlay) {
      cartoverlay.classList.remove("show1");
      if (typeof unlockScroll === "function") unlockScroll();
    }
  });

  cartoverlay.querySelectorAll(".deleteicon").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name = this.dataset.name;
      let item = productarray.find((p) => p.name === name);

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        productarray = productarray.filter((p) => p.name !== name);
      }

      updateCartBadge(); // badge update
      renderCart();
    });
  });

  cartoverlay.querySelectorAll(".qtybtn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name = this.dataset.name;
      const action = this.dataset.action;
      let item = productarray.find((p) => p.name === name);

      if (action === "inc") {
        item.quantity += 1;
      } else if (action === "dec") {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          productarray = productarray.filter((p) => p.name !== name);
        }
      }

      updateCartBadge(); // badge update
      renderCart();
    });
  });

  cartoverlay.querySelectorAll(".qualitybox").forEach((input) => {
    input.addEventListener("change", function () {
      const name =
        this.closest(".cartimg").querySelector(".cartname").innerText;
      let item = productarray.find((p) => p.name === name);
      let val = parseInt(this.value);
      if (val > 0) {
        item.quantity = val;
      } else {
        productarray = productarray.filter((p) => p.name !== name);
      }

      updateCartBadge(); // badge update
      renderCart();
    });
  });
}

function wholecart() {
  let itemsHTML = productarray
    .map((item) => {
      return `
      <section class="cartimg">
        <img src="${item.image}" />
        <section class="cartdetails">
          <p class="cartname">${item.name}</p>
          <p class="cartprice">${item.price}</p>
          <div class="cartquality">
            <span class="qty-label">QTY:</span>
            <button class="qtybtn" data-name="${item.name}" data-action="dec">−</button>
            <input type="text" value="${item.quantity}" class="qualitybox" />
            <button class="qtybtn" data-name="${item.name}" data-action="inc">+</button>
          </div>
        </section>
        <section class="deletebutton">
          <button class="deleteicon" data-name="${item.name}">
            <i class="ri-delete-bin-6-line"></i>
          </button>
        </section>
      </section>
    `;
    })
    .join("");

  let total = productarray.reduce((sum, item) => {
    return sum + item.quantity * Number(item.price.replace(/[^0-9.]/g, ""));
  }, 0);

  return `
    <div class="subcartoverlay">
      <div class="wholeshop">
        <section class="shopcart">
          <span>SHOPPING CART</span>
          <span><i class="closecartbtn ri-close-large-line"></i></span>
        </section>
      </div>

      <div class="selectcart">
        ${itemsHTML || '<p style="padding:20px; color:#999; text-align:center;">Your cart is empty!</p>'}
      </div>

      <div class="wholetotal">
        <div class="subtotal">
          <strong>TOTAL</strong>
          <strong>$${total.toFixed(2)}</strong>
        </div>
        <div class="cartbtn">
          <button class="viewbtn">VIEW CART</button>
          <button class="checkoutbtn">CHECKOUT</button>
        </div>
      </div>
    </div>
  `;
}