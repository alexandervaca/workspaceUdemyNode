const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const Usuario = require('../models/usuario');


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
    });
  }
}

const googleSignIn = async(req, res = respose) => {
  
  const { id_token } = req.body;

  try {
    const { nombre, img, mail } = await googleVerify(id_token);
    
    let usuario = await Usuario.findOne({ mail });

    if( !usuario ){
      // Crear usuario
      const data = {
        nombre,
        mail,
        password: ':P',
        img,
        google: true
      };

      usuario = new Usuario( data );
      await usuario.save();
    }

    // Si el usuario en DB
    if( !usuario.estado ){
      return res.status(401).json({
        msg: 'Contacte al administrador, usuario bloqueado'
      });
    }

    // Generar el JWT
    const token = await generarJWT( usuario.id );


    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log('error:',error)

    res.status(400).json({
      ok: false,
      msg: 'El Token no se pudo verificar'
    })
  }
}

const renovarToken = async( req, res = response ) => {

  const { usuario } = req;

  // Generar el JWT
  const token = await generarJWT( usuario.id );

  res.json({
    usuario,
    token
  });
}


module.exports = {
  login,
  googleSignIn,
  renovarToken
}