const path = require('path');
const fs = require('fs');

class Ticket {
  constructor( numero, escritorio ) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {

  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();  // 7
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    }
  }

  init() {
    const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
    //console.log( data );
    if( hoy === this.hoy ) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      // es otro dia
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join( __dirname, '../db/data.json' );
    fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );
  }

  // Boton: Crear Ticket
  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket( this.ultimo, null);

    this.tickets.push( ticket );

    this.guardarDB();

    return 'Ticket ' + ticket.numero;
  }

  atender( escritorio ) {
    // No tenemos tickets
    if( this.tickets.length === 0 ) {
      return null;
    }

    const ticket = this.tickets.shift();// elimina el primer elemento del arreglo
    ticket.escritorio = escritorio;
    this.ultimos4.unshift( ticket );// agrega elemento al inicio

    if ( this.ultimos4.length > 4 ) {
      this.ultimos4.splice(-1,1);
    }

    this.guardarDB();

    return ticket;
  }

}


module.exports = TicketControl;