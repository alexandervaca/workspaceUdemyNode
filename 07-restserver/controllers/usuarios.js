const { response, request  } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');


const usuarioGet = async(req, res) => {

  const { id } = req.params;

  const usuario = await Usuario.findById( id );
  
  res.json(usuario);
}

const usuariosGet = async(req, res) => {

  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip( Number.isNaN(desde) ? 0 : desde )
    .limit( Number.isNaN(limit) ? 5 : limit )
  ])

  res.json({
    total,
    usuarios
  });
}

const usuariosPost = async (req, res) => {

  const { nombre, mail, password, rol, google } = req.body;

  const usuario = new Usuario({ nombre, mail, password, rol, google });

  // Encriptar el password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  // Guardar en BD
  await usuario.save();

  res.status(201).json({
    usuario
  });
}

const usuariosPut = async(req, res) => {

  const { id } = req.params;
  const { _id, password, google, mail, ...resto } = req.body;

  if( password ){
    // Encriptar el password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
  }

  const usuario = await Usuario.findByIdAndUpdate( id, { resto } );
  
  res.json(usuario);
}

const usuariosDelete = async(req, res) => {

  const { id } = req.params;

  //Eliminacion fisica
  //const usuario = await Usuario.findByIdAndDelete( id );

  //Eliminacion logica
  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

  res.json(usuario);
}

const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch API - controlador'
  });
}


module.exports = {
  usuarioGet, usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch
}