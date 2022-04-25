const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = respose) => {

  const { mail, password } = req.body;

  try {
    
    // Verificar si el mail existe
    const usuario = await Usuario.findOne({ mail });
    if( !usuario ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - mail'
      });
    }

    // Si el usuario esta activo
    if( !usuario.estado ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      });
    }

    // Verificar el password
    const validPassword = bcryptjs.compareSync( password, usuario.password );
    if( !validPassword ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    // Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}



module.exports = {
  login
}