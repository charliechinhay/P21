// Le variabili bearerToken, baseApiUrl, authHeaders e jsonHeaders sono definite in global.js

// Elementi della pagina
const productDetail = document.querySelector("#product-detail");
const loadingSpinner = document.querySelector("#loading");
const errorAlert = document.querySelector("#error");
const successAlert = document.querySelector("#success");

// Elementi del form
const productId = document.querySelector("#product-id");
const productName = document.querySelector("#product-name");
const productBrand = document.querySelector("#product-brand");
const productImageUrl = document.querySelector("#product-imageUrl");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const productImage = document.querySelector("#product-image");

// Bottoni
const saveBtn = document.querySelector("#save-btn");
const deleteBtn = document.querySelector("#delete-btn");

// Ottieni l'ID del prodotto dall'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Mostra errore
function showError(message) {
  errorAlert.textContent = message;
  errorAlert.classList.remove("d-none");
  successAlert.classList.add("d-none");
}

// Mostra successo
function showSuccess(message) {
  successAlert.textContent = message;
  successAlert.classList.remove("d-none");
  errorAlert.classList.add("d-none");
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

    // Popola il form
    productId.value = product._id;
    productName.value = product.name || "";
    productBrand.value = product.brand || "";
    productImageUrl.value = product.imageUrl || "";
    productPrice.value = product.price || "";
    productDescription.value = product.description || "";
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

// Anteprima immagine live
productImageUrl.addEventListener("input", () => {
  productImage.src =
    productImageUrl.value ||
    "https://via.placeholder.com/400x300?text=Nessuna+immagine";
});

// Salva modifiche
saveBtn.addEventListener("click", async () => {
  const body = {
    name: productName.value,
    brand: productBrand.value,
    imageUrl: productImageUrl.value,
    price: parseFloat(productPrice.value),
    description: productDescription.value,
  };

  try {
    saveBtn.disabled = true;
    saveBtn.textContent = "Salvataggio...";

    const response = await fetch(`${baseApiUrl}/product/${id}`, {
      headers: jsonHeaders,
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }

    showSuccess("Prodotto salvato con successo!");

    //Torna alla pagina principale dopo 1.5 secondi
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    console.error("Errore:", error);
    showError(`Errore nel salvataggio: ${error.message}`);
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Salva Modifiche";
  }
});

// Elimina prodotto
deleteBtn.addEventListener("click", async () => {
  if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

  try {
    deleteBtn.disabled = true;
    deleteBtn.textContent = "Eliminazione...";

    const response = await fetch(`${baseApiUrl}/product/${id}`, {
      headers: authHeaders,
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }

    showSuccess("Prodotto eliminato! Reindirizzamento...");

    // Torna alla lista dopo 1.5 secondi
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    console.error("Errore:", error);
    showError(`Errore nell'eliminazione: ${error.message}`);
    deleteBtn.disabled = false;
    deleteBtn.textContent = "Elimina Prodotto";
  }
});

loadProduct();
