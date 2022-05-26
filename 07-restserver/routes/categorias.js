const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');

const { crearCategoria, obtenerCategoria, obtenerCategorias, categoriaDelete, categoriaUpdate
} = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
  ], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [ 
  validarJWT,
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  validarCampos
 ], crearCategoria);

// Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  validarCampos
  ], categoriaUpdate);

// Borrar una categoria - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
  ], categoriaDelete);

module.exports = router;