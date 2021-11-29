const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restapis", { useNewUrlParser: true });

//creando el servidor
const app = express();
const port = 5000;

//Rutas de la app
app.use("/", routes());

//puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`);
});
