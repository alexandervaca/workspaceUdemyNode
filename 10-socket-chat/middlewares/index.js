
const validaCampos = require('../middlewares/validar-campos');
const validarArchivoSubir = require('../middlewares/validar-archivo');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
  ...validaCampos,
  ...validarArchivoSubir,
  ...validarJWT,
  ...validaRoles
}