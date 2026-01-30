// ------------------------------------------
// CONFIGURAZIONE GLOBALE - Token e API URL
// ------------------------------------------

// API Endpoints disponibili:
// GET/POST https://striveschool-api.herokuapp.com/api/product/
// GET/PUT/DELETE https://striveschool-api.herokuapp.com/api/product/:id

const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTdiYTEyNTg1OTE4OTAwMTUxOTlhMGYiLCJpYXQiOjE3Njk3MDk4NjEsImV4cCI6MTc3MDkxOTQ2MX0.nzD1tvmpTvC5T83QAYnyioYyIenRQpxiAeNpV9nFVYw";

const baseApiUrl = "https://striveschool-api.herokuapp.com/api";

// Header di autorizzazione per le fetch
const authHeaders = {
  Authorization: `Bearer ${bearerToken}`,
};

// Header completi per richieste POST/PUT con JSON
const jsonHeaders = {
  Authorization: `Bearer ${bearerToken}`,
  "Content-Type": "application/json",
};
