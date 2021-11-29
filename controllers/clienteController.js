const Clientes = require("../models/Clientes");

//Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    //almacenar el registro
    await cliente.save();
    res.json({
      mensaje: "Se agrego un nuevo cliente",
    });
  } catch (error) {
    //si hay error, console.log y next
    console.log(error);
    next();
  }
};

//Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};
