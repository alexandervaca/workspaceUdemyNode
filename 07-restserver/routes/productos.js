const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');

const { crearProducto, obtenerProducto, obtenerProductos, eliminarProducto, actualizarProducto
} = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los productos - publico
router.get('/', obtenerProductos);

// Obtener un producto por id - publico
router.get('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
  ], obtenerProducto);

// Crear producto - privado - cualquier persona con un token valido
router.post('/', [ 
  validarJWT,
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('categoria','No es un ID valido').isMongoId(),
  check('categoria').custom( existeCategoriaPorId ),
  validarCampos
 ], crearProducto);

// Actualizar producto - privado - cualquier persona con un token valido
router.put('/:id', [
  validarJWT,
  //check('categoria','No es un ID valido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
  ], actualizarProducto);

// Eliminar un producto - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id','No es un ID valido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
  ], eliminarProducto);

module.exports = router;