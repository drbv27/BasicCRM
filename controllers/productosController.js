const Productos = require("../models/Productos");

//Agregar nuevo producto
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);
  try {
    await producto.save();
    res.json({ mensaje: "se agrego un nuevo producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};
