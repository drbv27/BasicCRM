const Pedidos = require("../models/Pedidos");
//Crear nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({ mensaje: "Se agrego un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Muestra un pedido por ID
exports.mostrarPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.idPedido)
    .populate("cliente")
    .populate({ path: "pedido.producto", model: "Productos" });
  try {
    if (!pedido) {
      res.json({ mensaje: "Ese pedido no existe" });
      return next();
    }
    //mostrar pedido
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Actualizar un pedido por Id
exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true,
      }
    )
      .populate("cliente")
      .populate({ path: "pedido.producto", model: "Productos" });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Elimina un pedido por su ID
exports.eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
    res.json({ mensaje: "Se elimino correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};
