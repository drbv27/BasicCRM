const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//CORS permite que un cliente se conecte a otro servidor para intercambiar recursos
const cors = require("cors");

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restapis", { useNewUrlParser: true });

//creando el servidor
const app = express();
const port = 5000;

//habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Habilitar cors
app.use(cors());

//Rutas de la app
app.use("/", routes());

//puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`);
});
