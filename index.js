const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restapis", { useNewUrlParser: true });

//creando el servidor
const app = express();
const port = 5000;

//habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rutas de la app
app.use("/", routes());

//puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`);
});
