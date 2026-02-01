// Le variabili bearerToken, baseApiUrl, authHeaders e jsonHeaders sono definite in global.js

//fare una funzione che prende  linput del form e le mette dentro un oggetto che passiamo nel form
const productName = document.querySelector("#product-name");
const productDescription = document.querySelector("#description");
const productBrand = document.querySelector("#brand-name");
const productImageUrl = document.querySelector("#image-url");
const productPrice = document.querySelector("#price");
const buttonSubmit = document.querySelector("#apply");
const tBody = document.querySelector("#t-body");
const errorDiv = document.querySelector("#error");
const successDiv = document.querySelector("#success");
const form = document.querySelector("#product-form");

//Aggiunta evento al button submit
buttonSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  // Validazione campi obbligatori
  if (!productName.value || !productBrand.value || !productPrice.value) {
    alert("Compila tutti i campi obbligatori (Name, Brand, Price)");
    return;
  }

  //Destrutturazione dell'oggetto
  const body = {
    name: productName.value,
    description: productDescription.value,
    brand: productBrand.value,
    imageUrl: productImageUrl.value,
    price: parseFloat(productPrice.value),
  };

  console.log(body);

  //Invio della richiesta POST
  try {
    // Disabilita il pulsante per evitare invii multipli
    buttonSubmit.disabled = true;
    buttonSubmit.querySelector(".spinner").classList.remove("d-none");
    const response = await fetch(`${baseApiUrl}/product/`, {
      headers: jsonHeaders,
      method: "POST",
      body: JSON.stringify(body),
    });

    //   console.log(response);
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    successDiv.classList.remove("d-none");
    errorDiv.classList.add("d-none");
    successDiv.innerHTML = `Post creato: <a href="/dettagli.html?id=${data._id}">Dettagli</a>`;
    form.reset();
  } catch (error) {
    console.error("Errore:", error);
    errorDiv.classList.remove("d-none");
    successDiv.classList.add("d-none");
    errorDiv.textContent = `Errore nella creazione del prodotto: ${error.message}`;
  } finally {
    // Riabilita il pulsante dopo il completamento della richiesta
    buttonSubmit.disabled = false;
    buttonSubmit.querySelector(".spinner").classList.add("d-none");
  }
});

//Mappa l'array del POST e crea la table
function arrayProducts(productsArray) {
  const trProducts = productsArray.map(
    ({ name, brand, imageUrl, price, description }) =>
      `<tr>
        <td>${name}</td>
        <td>${brand}</td>
        <td>${imageUrl}</td>
        <td>${price}</td>
        <td>${description}</td>
      </tr>`,
  );
  return trProducts.join("");
}

//Funzione per recuperare i prodotti dall'API e mostrarli nella tabella

async function fetchProducts() {
  try {
    const response = await fetch(`${baseApiUrl}/product/`, {
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }

    const products = await response.json();
    console.log("Prodotti ricevuti:", products);
    tBody.innerHTML = arrayProducts(products);
  } catch (error) {
    console.error("Errore nel recupero dei prodotti:", error);
  }
}

fetchProducts();

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
