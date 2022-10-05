const { Socket } = require("socket.io");
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');


const chatMensajes = new ChatMensajes();


const socketController = async ( socket = new Socket(), io ) => {

  //console.log('cliente conectado', socket);
  //console.log('cliente conectado', socket.id);
  //console.log('x-token', socket.handshake.headers['x-token']);
  const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
  //console.log('usuario',usuario);
  if ( !usuario ) {
    return socket.disconnect();
  }

  // Agregar el usuario conectado
  chatMensajes.conectarUsuario( usuario );
  io.emit('usuarios-activos', chatMensajes.usuariosArr);
  socket.emit('recibir-mensajes', chatMensajes.ultimos10);


  // Conectarlo a una sala especial
  socket.join( usuario.id ); // global, socket.id, usuario.id


  // Limpiar cuando algun usuario se desconecta
  socket.on('disconnect', () => {
    chatMensajes.desconectarUsuario( usuario.id );
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
  });


  socket.on('enviar-mensaje', ({ uid, mensaje }) => {

    // TODO: MEJORAR
    if ( uid ) {
      // Valida si es mensaje privado
      socket.to( uid ).emit('mensaje-privado', { de: usuario.nombre, mensaje });
    } else {

      chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
      io.emit('recibir-mensajes', chatMensajes.ultimos10);
    }
  });
}


module.exports = {
  socketController
}