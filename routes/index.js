const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");
/*-----MIDLEWARE PARA PROTEGER RUTAS */
const auth = require("../middlewares/auth");

/*-------CLIENTES-------*/
module.exports = function () {
  router.get("/", (req, res) => {
    res.send("inicio");
  });
  router.get("/nosotros", (req, res) => {
    res.send("nosotros");
  });

  //Agrega nuevos clientes via POST
  router.post("/clientes", auth, clienteController.nuevoCliente);

  //Obtener todos los clientes
  router.get("/clientes", auth, clienteController.mostrarClientes);
  //Muestra un cliente en especifico(ID)
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);
  //Actualizar un cliente
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);
  //Eliminar Cliente
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  /*-------PRODUCTOS-------*/
  //Nuevos productos
  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );
  //Muestra todos los productos
  router.get("/productos", auth, productosController.mostrarProductos);
  //Muestra un producto
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );
  //Actualizar Producto
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );
  //Eliminar Productos
  router.delete(
    "/productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );
  //Busqueda de Productos
  router.post(
    "/productos/busqueda/:query",
    auth,
    productosController.buscarProducto
  );

  /*-------PEDIDOS-------*/
  //Agrega nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);
  //Mostrar pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);
  //Mostrar un pedido por ID
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);
  //Actualizar pedidos
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);
  //Eliminar un pedido por su Id
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);
  /*-----------------*/

  /*-------Usuarios------- */
  //Crear la cuenta
  router.post("/crear-cuenta", auth, usuariosController.registrarUsuario);
  //Iniciar Sesión
  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);

  //Retornar el router
  return router;
};
