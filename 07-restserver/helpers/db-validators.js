const { Categoria, Producto, Role, Usuario } = require('../models');


const esRoleValido = async(rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if( !existeRol ){
    // Error personalizado, atrapado en custom
    throw new Error(`El rol ${ rol } no esta registrado en la BD`);
  }
}

const existeMail = async(mail = '') => {
  // Verificar si el mail existe
  const existeMail = await Usuario.findOne( { mail: mail});
  if ( existeMail ) {
    throw new Error(`El mail ${ mail } ya esta registrado en la BD`);
  }
}

const existeUsuarioPorId = async( id ) => {
  // Verificar si el usuario existe
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ) {
    throw new Error(`El id: ${ id } no existe`);
  }
}

const existeCategoriaPorId = async( id ) => {
  // Verificar si la categoria existe
  const existeCategoria = await Categoria.findById(id);
  if ( !existeCategoria ) {
    throw new Error(`El id: ${ id } no existe`);
  }
}

const existeProductoPorId = async( id ) => {
  // Verificar si producto existe
  const existeProducto = await Producto.findById(id);
  if ( !existeProducto ) {
    throw new Error(`El id: ${ id } no existe`);
  }
}

module.exports = {
  esRoleValido,
  existeCategoriaPorId,
  existeMail,
  existeProductoPorId,
  existeUsuarioPorId,
}