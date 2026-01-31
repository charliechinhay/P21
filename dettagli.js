// Le variabili bearerToken, baseApiUrl, authHeaders e jsonHeaders sono definite in global.js

// Elementi della pagina
const productDetail = document.querySelector("#product-detail");
const loadingSpinner = document.querySelector("#loading");
const errorAlert = document.querySelector("#error");

// Elementi per visualizzare i dati
const productName = document.querySelector("#product-name");
const productBrand = document.querySelector("#product-brand");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const productImage = document.querySelector("#product-image");

// Ottieni l'ID del prodotto dall'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Mostra errore
function showError(message) {
  errorAlert.textContent = message;
  errorAlert.classList.remove("d-none");
}

// Carica i dettagli del prodotto
async function loadProduct() {
  if (!id) {
    showError("ID prodotto non specificato");
    loadingSpinner.classList.add("d-none");
    return;
  }

  try {
    const response = await fetch(`${baseApiUrl}/product/${id}`, {
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Prodotto non trovato (${response.status})`);
    }

    const product = await response.json();

    // Mostra i dati del prodotto
    productName.textContent = product.name || "Nome non disponibile";
    productBrand.textContent = product.brand || "Brand non disponibile";
    productPrice.textContent = product.price
      ? `€${product.price}`
      : "Prezzo non disponibile";
    productDescription.textContent =
      product.description || "Nessuna descrizione disponibile";
    productImage.src =
      product.imageUrl ||
      "https://via.placeholder.com/400x300?text=Nessuna+immagine";

    // Mostra il contenuto
    loadingSpinner.classList.add("d-none");
    productDetail.classList.remove("d-none");
  } catch (error) {
    console.error("Errore:", error);
    showError(`Errore nel caricamento: ${error.message}`);
    loadingSpinner.classList.add("d-none");
  }
}

loadProduct();

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
