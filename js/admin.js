document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const productCatalog = document.getElementById("productCatalog");

  let products = JSON.parse(localStorage.getItem("products")) || [];

  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }

  function renderProducts() {
    productCatalog.innerHTML = "";
    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
                <img src="${product.image || 'default.jpg'}" alt="Товар">
                <h3>${product.name}</h3>
                <p><strong>Категорія:</strong> ${product.type}</p>
                <p><strong>Ціна:</strong> ${product.price} грн</p>
                <p>${product.description}</p>
                <button class="delete" onclick="deleteProduct(${index})">❌ Видалити</button>
            `;
      productCatalog.appendChild(card);
    });
  }

  window.deleteProduct = function (index) {
    if (confirm("Ви впевнені, що хочете видалити цей товар?")) {
      products.splice(index, 1);
      saveProducts();
    }
  };

  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("productId").value;
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const imageInput = document.getElementById("image").files[0];

    if (!name || !type || !price || !description) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }

    if (imageInput) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        addOrUpdateProduct(id, name, type, price, description, imageUrl);
      };
      reader.readAsDataURL(imageInput);
    } else {
      addOrUpdateProduct(id, name, type, price, description, "");
    }
  });

  function addOrUpdateProduct(id, name, type, price, description, image) {
    if (id) {
      products[id] = { name, type, price, description, image };
    } else {
      products.push({ name, type, price, description, image });
    }

    saveProducts();
    productForm.reset();
    document.getElementById("productId").value = "";
  }

  renderProducts();
});
