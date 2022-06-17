// Refenrencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');



const socket = io();



socket.on('connect', () => {
  btnCrear.disabled = false;
});

socket.on('disconnect', () => {
  btnCrear.disabled = true;
});

socket.on('ultimo-ticket', ( ultimo ) => {
  lblNuevoTicket.innerText = 'Ticket ' + ultimo;
});

btnCrear.addEventListener( 'click', () => {
  // Este evento lo escucha: socket/controller.js
  socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    lblNuevoTicket.innerText = ticket;
  });

});
