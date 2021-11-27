const express = require("express");
const routes = require("./routes");

//creando el servidor
const app = express();
const port = 5000;

//Rutas de la app
app.use("/", routes());

//puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`);
});
