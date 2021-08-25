let signin_button = document.querySelector(".login-button");
let signup_button = document.querySelector("#signUp");
let login = document.querySelector(".login-container");
let register = document.querySelector(".register-container");
let container = document.querySelector("#form-box");
let signUpForm = document.querySelectorAll("form")[1];
let products = [];
var cart = [];

function signIn(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://guarded-lake-78300.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["access_token"]) {
        fetch("https://guarded-lake-78300.herokuapp.com/login/", {
          method: "POST",
          body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.localStorage.setItem("user_id", data.registered_user[0]);
        });
        console.log(data);
        storage = window.localStorage;
        storage.setItem("jwt-token", data["access_token"]);
        storage.setItem("username", username);
        storage.setItem("password", password);
        window.location.href = "/home-page.html";
      }
    });
}

function signUp(name, surname, email, username, password) {
  console.log(name);
  console.log(surname);
  console.log(email);
  console.log(username);
  console.log(password);
  fetch("https://guarded-lake-78300.herokuapp.com/registration/", {
    method: "POST",
    body: JSON.stringify({
      name: `${name}`,
      surname: `${surname}`,
      email: `${email}`,
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.alert("Congratulations! You have successfully registered.")
    });
}

function switch_side(e) {
  login.classList.toggle("active");
  register.classList.toggle("active");
  console.log(register.classList);
  if (register.classList.contains("active")) {
    container.style.transform = "translateX(95%)";
  } else {
    container.style.transform = "translateX(0%)";
  }
}

function userInfo(username) {
  fetch(`https://guarded-lake-78300.herokuapp.com/view-profile/${username}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.localStorage["user-id"] = data.data[0];
      window.localStorage.setItem["username"] = data.data[1];
      console.log(window.localStorage["username"]);
      console.log(window.localStorage["user-id"]);
    });
}


function showProducts() {
  console.log(window.localStorage["jwt-token"]);
  fetch("https://guarded-lake-78300.herokuapp.com/show-products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data.data;
      console.log(products);
      let productNo = 0;
      products.forEach((product) => {
        console.log(product);
        document.querySelector(
          ".product-container"
        ).innerHTML += `<div class="product" id="${product[0]}">
                          <div class="product-image"><img class="image" src="${product[2]}" alt="${product[1]}" /></div>
                          <h3 class="product-name">${product[1]}</h3>
                          <p class="product-id">Product Id: ${product[0]}</p>
                          <p class="category">${product[3]}</p>
                          <p class="description">${product[4]}</p>
                          <p class="dimensions">${product[5]}</p>
                          <p class="price">R${product[6]}</p>
                          <input class="quantity" type="number" value="1"/>
                          <div class="product-buttons">
                            <button class="cart" onclick="addToCart(${productNo})"><i class="fas fa-shopping-cart fa-2x"></i></button>
                          </div>
                        </div>`
        productNo += 1
      });
    });
}

showProducts();

function addToCart(productNo) {
  let id = document.querySelectorAll('.product-id')[productNo].innerHTML
  let image = document.querySelectorAll('.image')[productNo].src
  let name = document.querySelectorAll('.product-name')[productNo].innerHTML
  let price = document.querySelectorAll('.price')[productNo].innerHTML
  let quantity = document.querySelectorAll('.quantity')[productNo].value
  console.log(id, image, name, price, quantity)
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantity)
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  let cartItem = {id: id, image: image, name: name, price: price, quantity: quantity}
  cart.push(cartItem);
  console.log("Your cart items are: ", cart);
  console.log(cart);
  window.alert("Product added to cart.");
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function searchForProducts() {
  let seach = document.querySelector("#search").Value;
  console.log(search);

  let searchedProducts = products.filter(product => product.product_name.toLowerCase().includes(search.toLowerCase()));
  console.log(searchedProducts);
  if (searchedProducts.length == 0) {
    document.querySelector(".product-container").innerHTML = "<h2>Error! No products match your search.</h2>"
  }
  else {
    showProducts(searchedProducts);
  }
}

function sortNamesAsc() {
  let sortedProducts = products.sort((a, b) => {
    if (a.product_name > b.product_name) return 1;
    if (a.product_name < b.product_name) return -1;
    return 0;
  })

  showProducts(sortedProducts);
}

function sortNamesDesc() {
  let sortedProducts = products.sort((a, b) => {
    if (a.product_name > b.product_name) return 1;
    if (a.product_name < b.product_name) return -1;
    return 0;
  });

  sortedProducts.reverse();

  showProducts(sortedProducts);
}

function sortPriceAsc() {
  let sortedProducts = products.sort((a, b) => {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
    return 0;
  })

  showProducts(sortedProducts);
}

function sortPriceDesc() {
  let sortedProducts = products.sort((a, b) => {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
    return 0;
  });

  sortedProducts.reverse();

  showProducts(sortedProducts);
}

function cleaFilter() {
  showProducts(products);
}