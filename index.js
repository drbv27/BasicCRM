const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });

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

//Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
/* const whitelist = ["http://localhost:3000"]; */
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    //revisar si la peticion viene de un servidor que esta en whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

//Habilitar cors
app.use(cors(corsOptions));

//Rutas de la app
app.use("/", routes());

//carpeta publica
app.use(express.static("uploads"));

//puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`);
});
