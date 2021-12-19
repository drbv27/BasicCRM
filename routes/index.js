const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");
/*-------CLIENTES-------*/
module.exports = function () {
  router.get("/", (req, res) => {
    res.send("inicio");
  });
  router.get("/nosotros", (req, res) => {
    res.send("nosotros");
  });

  //Agrega nuevos clientes via POST
  router.post("/clientes", clienteController.nuevoCliente);

  //Obtener todos los clientes
  router.get("/clientes", clienteController.mostrarClientes);
  //Muestra un cliente en especifico(ID)
  router.get("/clientes/:idCliente", clienteController.mostrarCliente);
  //Actualizar un cliente
  router.put("/clientes/:idCliente", clienteController.actualizarCliente);
  //Eliminar Cliente
  router.delete("/clientes/:idCliente", clienteController.eliminarCliente);

  /*-------PRODUCTOS-------*/
  //Nuevos productos
  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );
  //Muestra todos los productos
  router.get("/productos", productosController.mostrarProductos);
  //Muestra un producto
  router.get("/productos/:idProducto", productosController.mostrarProducto);
  //Actualizar Producto
  router.put(
    "/productos/:idProducto",
    productosController.subirArchivo,
    productosController.actualizarProducto
  );
  //Eliminar Productos
  router.delete("/productos/:idProducto", productosController.eliminarProducto);
  //Busqueda de Productos
  router.post("/productos/busqueda/:query", productosController.buscarProducto);

  /*-------PEDIDOS-------*/
  //Agrega nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", pedidosController.nuevoPedido);
  //Mostrar pedidos
  router.get("/pedidos", pedidosController.mostrarPedidos);
  //Mostrar un pedido por ID
  router.get("/pedidos/:idPedido", pedidosController.mostrarPedido);
  //Actualizar pedidos
  router.put("/pedidos/:idPedido", pedidosController.actualizarPedido);
  //Eliminar un pedido por su Id
  router.delete("/pedidos/:idPedido", pedidosController.eliminarPedido);
  /*-----------------*/

  /*-------Usuarios------- */
  //Crear la cuenta
  router.post("/crear-cuenta", usuariosController.registrarUsuario);
  //Iniciar Sesión
  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);

  //Retornar el router
  return router;
};
