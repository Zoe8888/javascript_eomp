function viewProfile() {
  console.log(window.localStorage["jwt-token"]);
  console.log(window.localStorage["username"]);
  fetch(
    `https://guarded-lake-78300.herokuapp.com/view-profile/${window.localStorage[
      "username"]
    }/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      user = data.data;
      console.log(user);
        document.querySelector(
          ".profile-container"
        ).innerHTML += `<div class="profile">
                            <p class="fistName">Name: ${user[1]}</p>
                            <p class="lastName">Surname: ${user[2]}</p>
                            <p class="user-id">User ID: ${user[0]}</p>
                            <p class="user-email">Email: ${user[3]}</p>
                            <p class="profile-username">Username: ${user[4]}</p>
                            <p class="profile-password">Password: ${user[5]}</p>
                            <div class="profile-buttons">
                              <button class="edit" onclick="edit()">Edit Profile</button>
                              <button class="delete">Delete Profile</button>
                            </div>
                          </div>`;
                          document.querySelector('.delete').addEventListener('click', () => {
                            deleteProfile()})
      });
}

viewProfile(`${window.localStorage["username"]}`);

function edit () {
  let container = document.querySelector('.edit-container')
  container.classList.toggle("hide");
}

function saveEditedProfile() {
  fetch(
    `https://guarded-lake-78300.herokuapp.com/edit-profile/${window.localStorage["user-id"]}/`,
    {
      method: "PUT",
      body: JSON.stringify ({
        name: document.querySelector('.edit-name').value,
        surname: document.querySelector('.edit-surname').value,
        email: document.querySelector('.edit-email').value,
        password: document.querySelector('.edit-password').value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("You have successfully updated your profile.");
    window.location.href = "/profile.html";
  });
}

function deleteProfile() {
  fetch(
    `https://guarded-lake-78300.herokuapp.com/delete-profile/${window.localStorage["user-id"]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = "/index.html";
      window.alert("Your profile has been deleted successfully.");
    });
}

document.querySelector('.edit-close').addEventListener('click', () => {
    let edit_product = document.querySelector('.edit-product')
  edit_product.classList.toggle("hide");
  container.classList.toggle("hide");
  container.classList.toggle("edit-close");
})

function updateProduct (e) {
  let edit_product = document.querySelector('.edit-product')
  edit_product.classList.toggle("hide");
  container.classList.toggle("hide");
  container.classList.toggle("edit-close");
  edit_product.id = e.parentElement.parentElement.id
}

function editProduct() {
  console.log(document.querySelector('.edit-product_name').value, document.querySelector('.edit-category').value, document.querySelector('.edit-description').value, document.querySelector('.edit-dimensions').value, document.querySelector('.edit-price').value, document.querySelectorAll('.hide')[1].src)
  fetch(`https://guarded-lake-78300.herokuapp.com/edit-product/${parseInt(document.querySelector(".edit-product").id)}/`, {
    method: "PUT", 
    body: JSON.stringify ({
      product_name: document.querySelector('.edit-product_name').value,
      category: document.querySelector('.edit-category').value,
      description: document.querySelector('.edit-description').value,
      dimensions: document.querySelector('.edit-dimensions').value,
      price: document.querySelector('.edit-price').value,
      product_image: document.querySelector('.hide').src,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("Your product has been edited successfully.");
    window.location.href = "/profile.html";
  });
}

function viewUsersProducts() {
  fetch(`https://guarded-lake-78300.herokuapp.com/view-users-products/${window.localStorage["user_id"]}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    products = data.data;
    console.log(products);
    products.forEach((product) => {
      console.log(product);
      document.querySelector(
        ".userProductContainer"
      ).innerHTML += `<div class="product" id="${product[0]}">
                        <div class="product-image"><img src="${product[2]}" alt="${product[1]}" /></div>
                        <h3 class="product-name">${product[1]}</h3>
                        <p class="product-id">Product Id: ${product[0]}</p>
                        <p class="category">${product[3]}</p>
                        <p class="description">${product[4]}</p>
                        <p class="dimensions">${product[5]}</p>
                        <p class="price">R${product[6]}</p>
                        <div class="profile-buttons">
                          <button class="editProduct" onclick="updateProduct(this)">Edit Product</button>
                          <button class="deleteProduct">Delete Product</button>
                        </div>
                      </div>`
                      document.querySelectorAll('.deleteProduct').forEach(button => {
                        button.addEventListener('click', (e) => {
                          console.log(e)
                          deleteProduct(e.currentTarget.parentElement.parentElement.id)});
                      })
    });
  });
}

viewUsersProducts(`${window.localStorage["user-id"]}`);



function deleteProduct(product_id) {
  fetch(`https://guarded-lake-78300.herokuapp.com/delete-product/${product_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("Your product has been deleted succesfully.");
    window.location.href = "/profile.html";
  });
}

window.localStorage.getItem("product_id");
console.log(window.localStorage.getItem("product_id"))

function viewFile() {
  const preview = document.querySelector(".add-hide");
  const file = document.querySelector(".product_image").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
}

function addProduct(
  product_name,
  product_image,
  category,
  description,
  dimensions,
  price,
  id
) {
  console.log(
    document.querySelector('.add-product_name').value,
    document.querySelector('.add-hide').src, document.querySelector('.add-category').value, document.querySelector('.add-description').value, document.querySelector('.add-dimensions').value, document.querySelector('.add-price').value, document.querySelector('.add-id').value
  );
  console.log(window.localStorage["jwt-token"]);
  fetch("https://guarded-lake-78300.herokuapp.com/add-product/", {
    method: "POST",
    body: JSON.stringify({
      product_name: document.querySelector('.add-product_name').value,
      product_image: document.querySelector('.add-hide').src,
      category: document.querySelector('.add-category').value,
      description: document.querySelector('.add-description').value,
      dimensions: document.querySelector('.add-dimensions').value,
      price: document.querySelector('.add-price').value,
      id: document.querySelector('.add-id').value,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.alert("Your product has been added successfully");
      viewUsersProducts(`${window.localStorage["user-id"]}`);
    });
}

