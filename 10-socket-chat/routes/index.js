const auth = require('../routes/auth');
const categorias = require('../routes/categorias');
const productos = require('../routes/productos');
const usuarios = require('../routes/usuarios');

module.exports = {
  ...auth,
  ...categorias,
  ...productos,
  ...usuarios
}