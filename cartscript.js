let carticon = document.querySelectorAll(".carticon");
let productarray = [];

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
    currentproduct.quantity,
  );

  overlaycart.querySelector(".closeicon").addEventListener("click", () => {
    overlaycart.classList.remove("show");
  });
}

function cartdesign(image, name, price, quantity) {
  let total = quantity * Number(price.replace(/[^0-9.]/g, ""));

  return `
  <form class="cartform">
    <section class="carted">
      <p>Added to cart successfully</p>
      <span><i class="closeicon ri-close-fill"></i></span>
    </section>

    <div class="wholecheck">
      <div class="subdetails">
        <img src="${image}" />
        <div class="subcart">
          <p class="proname">${name}</p>
          <span class="proprice">${quantity} × ${price}</span>
        </div>
      </div>

      <div class="cartcheck">
        <p>Subtotal: $${total}</p>
        <button class="cartbtn3">VIEW CART</button>
      </div>
    </div>
  </form>`;
}

function cartdesign(image, name, price, quantity) {
  let total = quantity * Number(price.replace(/[^0-9.]/g, ""));

  return ` 
    <form class="cartform">
      <section class="carted">
        <p>Added to cart successfully. What is next?</p>
        <span><i class="closeicon ri-close-fill"></i></span>
      </section>

      <div class="wholecheck">
        <div class="cartdetails">
          <div class="subdetails">
            <img src="${image}" class="decoimgs"/>
            <div class="subcart">
              <p class="proname">${name}</p>
              <span class="proprice">${quantity} × ${price}</span>
            </div>
          </div>
        </div>

        <div class="cartcheck">
          <button type="button" class="cartbtn1">CHECKOUT</button>
          <p class="order">Order subtotal</p>
          <p class="rate">$${total}.00</p>
          <p class="order">Your cart contains ${quantity} items</p>
          <button class="cartbtn2">CONTINUE SHOPPING</button>
          <button class="cartbtn3">VIEW CART</button>
        </div>
      </div>
    </form>
  `;
}

const shoplisticon = document.querySelector(".shoplisticon");

shoplisticon.addEventListener("click", function () {
  renderCart();
});

function renderCart() {
  const cartoverlay = document.querySelector(".cartoverlay");
  cartoverlay.classList.add("show1");

  cartoverlay.innerHTML = wholecart();

  cartoverlay.querySelector(".closecartbtn").addEventListener("click", () => {
    cartoverlay.classList.remove("show1");
  });

  cartoverlay.querySelectorAll(".deleteicon").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name = this.dataset.name;

      let item = productarray.find((p) => p.name === name);

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        productarray = productarray.filter((p) => p.name !== name); // 🔥 remove fully
      }
      renderCart();
    });
  });

  cartoverlay.querySelectorAll(".qualitybox").forEach((input) => {
    input.addEventListener("change", function () {
      const name =
        this.closest(".cartimg").querySelector(".cartname").innerText;

      let item = productarray.find((p) => p.name === name);
      item.quantity = Number(this.value);

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
          <label>QTY:
            <input type="text" value="${item.quantity}" class="qualitybox" />
          </label>
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
        ${itemsHTML || "<p>Your cart is empty!</p>"}
      </div>

      <div class="wholetotal">
        <div class="subtotal">
          <strong>TOTAL</strong>
          <strong>$${total}.00</strong>
        </div>
        <div class="cartbtn">
          <button class="viewbtn">VIEW CART</button>
          <button class="checkoutbtn">CHECKOUT</button>
        </div>
      </div>
    </div>
  `;
}
