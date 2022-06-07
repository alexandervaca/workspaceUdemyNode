
// Referencias html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


// Socket del cliente
const socket = io();


socket.on('connect', () => {
  //console.log('Conectado');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', () => {
  //console.log('Desconectado');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

socket.on('enviar-mensaje', ( payload ) => {
  console.log( payload );
});

btnEnviar.addEventListener( 'click', () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: '123ABC',
    fecha: new Date().getTime()
  }

  // Callback que procesa respuesta del server
  socket.emit( 'enviar-mensaje', payload, ( id ) => {
    console.log('Desde el server', id);
  });

});