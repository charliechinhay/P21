// Le variabili bearerToken, baseApiUrl, authHeaders e jsonHeaders sono definite in global.js

const eleProductsList = document.querySelector("#products-list");

// Carica e mostra i prodotti
async function loadProducts() {
  try {
    const response = await fetch(`${baseApiUrl}/product/`, {
      headers: authHeaders,
    });
    const data = await response.json();

    const cards = data.map(
      (product) => `
        <div class="col mb-4" id="card-${product._id}">
          <div class="card h-100">
            <img src="${product.imageUrl || "https://picsum.photos/300/200?random=" + product._id}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text text-muted">${product.brand}</p>
              <p class="card-text fw-bold">€${product.price}</p>
              <div class="d-flex gap-2">
                <a href="dettagli.html?id=${product._id}" class="btn btn-info btn-sm">Dettagli</a>
                <a href="modifica.html?id=${product._id}" class="btn btn-warning btn-sm">Modifica</a>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">Elimina</button>
              </div>
            </div>
          </div>
        </div>
      `,
    );

    eleProductsList.innerHTML = cards.join("");
  } catch (error) {
    console.error("Errore nel caricamento:", error);
  }
}

// Elimina prodotto direttamente dalla card
async function deleteProduct(productId) {
  if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

  try {
    const response = await fetch(`${baseApiUrl}/product/${productId}`, {
      headers: authHeaders,
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }

    // Rimuove la card dal DOM
    const card = document.querySelector(`#card-${productId}`);
    if (card) {
      card.remove();
    }
  } catch (error) {
    console.error("Errore nell'eliminazione:", error);
    alert(`Errore nell'eliminazione: ${error.message}`);
  }
}

loadProducts();

// Toggle Dark/Light mode
const themeToggle = document.querySelector("#theme-toggle");

function updateThemeButton() {
  const isDark = document.body.getAttribute("data-bs-theme") === "dark";
  themeToggle.textContent = isDark ? "Light" : "Dark";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButton();
});

// Carica tema salvato
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.setAttribute("data-bs-theme", savedTheme);
}
updateThemeButton();
