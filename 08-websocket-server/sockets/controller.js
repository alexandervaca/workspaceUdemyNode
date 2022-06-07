

const socketController = ( socket ) => {

  console.log('Cliente conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });

  socket.on('enviar-mensaje', ( payload, callback ) => {

    const id = 123456;
    callback( id );
    // this.io: es cuando el servidor de sockets lo envia
    // se cambia de this.io a socket para evitar dependencia contra io
    socket.broadcast.emit('enviar-mensaje', payload);

  });
}



module.exports = {
  socketController,
}