const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, existeMail, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuarioGet, usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/:id', usuarioGet );

router.get('/', usuariosGet );

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioPorId ), // MANERA IMPLICITA
  check('rol').custom( esRoleValido ), // MANERA IMPLICITA
  validarCampos
], usuariosPut );

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y mayor a 6 letras').isLength({ min: 6 }),
  //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('mail', 'El mail no es valido').isEmail(),
  check('mail').custom( (mail) => existeMail(mail) ), // MANERA EXPLICITA
  check('rol').custom( (rol) => esRoleValido(rol) ), // MANERA EXPLICITA DE INVOCAR
  //check('rol').custom( esRoleValido ), // MANERA IMPLICITA
  validarCampos
], usuariosPost );

router.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioPorId ), // MANERA IMPLICITA
  validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );


module.exports = router;