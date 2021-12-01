const Productos = require("../models/Productos");

const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};

//pasar la configuracion de multer
const upload = multer(configuracionMulter).single("imagen");

//sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({
        mensaje: error,
      });
    }
    return next();
  });
};

//Agregar nuevo producto
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);
  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "se agrego un nuevo producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//Mostrar los productos
exports.mostrarProductos = async (req, res, next) => {
  try {
    //obtener todos los productos
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};
