const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
  'categorias',
  'productos',
  'roles',
  'usuarios',
];


const buscarCategorias = async( termino = '', res = response ) => {

  const esMongoID = ObjectId.isValid( termino );

  if ( esMongoID ) {
    const categoria = await Categoria.findById( termino )
      .populate('usuario','nombre');
    return res.json({
      results: ( categoria ) ? [ categoria ] : []
    });
  }

  const regexp = new RegExp( termino, 'i' );//i: insensible

  const categorias = await Categoria.find({ nombre: regexp, estado: true })
    .populate('usuario','nombre');

  return res.json({
    results: categorias
  });
}

const buscarProductos = async( termino = '', res = response ) => {

  const esMongoID = ObjectId.isValid( termino );

  if ( esMongoID ) {
    const producto = await Producto.findById( termino )
      .populate('categoria','nombre')
      .populate('usuario','nombre');

    return res.json({
      results: ( producto ) ? [ producto ] : []
    });
  }

  const regexp = new RegExp( termino, 'i' );//i: insensible

  const productos = await Producto.find({ nombre: regexp, estado: true })
    .populate('categoria','nombre')
    .populate('usuario','nombre');

  return res.json({
    results: productos
  });
}

const buscarUsuarios = async( termino = '', res = response ) => {

  const esMongoID = ObjectId.isValid( termino );

  if ( esMongoID ) {
    const usuario = await Usuario.findById( termino );
    return res.json({
      results: ( usuario ) ? [ usuario ] : []
    });
  }

  const regexp = new RegExp( termino, 'i' );//i: insensible

  const usuarios = await Usuario.find( { 
    $or: [{ nombre: regexp }, { mail: regexp }],
    $and: [{ estado: true }]
  });

  return res.json({
    results: usuarios
  });
}


const buscar = ( req, res = response ) => {

  const { coleccion, termino } = req.params;

  if ( !coleccionesPermitidas.includes( coleccion) ) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
    });
  }

  switch (coleccion) {
    case 'categorias':
      buscarCategorias(termino, res);
      break;
      
    case 'productos':
      buscarProductos(termino, res);
      break;
    
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;

    default:
      res.status(500).json({
        msg: 'Se le olvido hacer esta busqueda'
      });
  }
}



module.exports = {
  buscar
}