let cartItem = [];
let cart = JSON.parse(window.localStorage["cart"]);

function showCart() {
  let cartConatiner = document.querySelector("#cart-container")
  cartConatiner.innerHTML = "";
  let total = 0;
  console.log(cart[0])
  if (cart.length == 0) {
    cartConatiner.innerHTML = `<h2 class="empty">No items currently in your cart</h2>`;
  } else {
    cart.forEach((cartItem) => {
      document.querySelector("#cart-container").innerHTML += `
                          <div class="cart">
                            <div class="cart-image"><img src="${cartItem.image}" alt="${cartItem.name}" /></div>
                            <h3 class="cart-name">${cartItem.name}</h3>
                            <p class="cart-price">${cartItem.price}</p>
                            <p class="quantity">Quantity: ${cartItem.quantity}</p>
                            <div class="cart-buttons">
                              <button class="add" onclick="add()">Add</button>
                              <button class="remove" onclick="remove()">Remove</button>
                            </div>
                          </div>
      `;
      total += (parseInt(cartItem.price.slice(1, )) * parseInt(cartItem.quantity));
    });
    document.querySelector("#cart-container").innerHTML += `
      <div class="cart-container-bottom">
        <h3 class="totalPrice">Your total is: R${total}</h3>
        <button class="checkout">Checkout</button>
    </div>`;
    console.log(cart)
    document.querySelector('.checkout').addEventListener('click', () => {
      clear();
    })
  }
}

showCart();

function add(name) {
  for (let i in cart) {
    if (cart[i].name === name) {
      cart[i].quantity = parseInt(cart[i].quantity) + 1,
      window.localStorage.setItem("cart", JSON.stringify(cart));
}} window.alert("Product added to cart")
}

function remove(product_id) {
  for (let i in cart) {
    if (product_id === cart[i].product_id) {
      cart.splice(i, 1);
      console.log(cart);
      window.localStorage["cart"] = JSON.stringify(cart);
      showCart();
    }
  }
  window.alert("Product successfully removed from cart.")
}

function clear() {
  window.localStorage.removeItem["cart"];
  document.querySelector("#cart-container").innerHTML = `<h2 class="empty">No items currently in your cart</h2>`;
}