require('dotenv').config();

const { inquirerMenu,
  pausa,
  leerInput,
  listadoLugares
} = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');


const main = async() => {

  const busquedas = new Busquedas();
  let opt;

  do {
    
    opt = await inquirerMenu();
    
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const terminoDeBusqueda = await leerInput('Ciudad: ');

        // Buscar lugares
        const lugares = await busquedas.ciudad(terminoDeBusqueda);
        
        // Seleccionar lugar
        const id = await listadoLugares(lugares);
        if ( id === '0' ) continue;

        const lugarSel = lugares.find( lugar => lugar.id === id );

        // Guardar en DB
        busquedas.agregarHistorial( lugarSel.nombre );
        
        // Clima
        const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

        // Mostrar resultado
        console.clear();
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad:', lugarSel.nombre);
        console.log('Lat:', lugarSel.lat);
        console.log('Lng:', lugarSel.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Minima:', clima.min);
        console.log('Maxima:', clima.max);
        console.log('Condicion:', clima.desc);

      break;

      case 2:
        
        busquedas.historialCapitalizado.forEach( (lugar, i) => {
          const idx = `${ i + 1}`.green;
          console.log( `${ idx } ${ lugar }` )
        });

      break;
    }

    if ( opt !== 0 )
      await pausa();

  } while (opt !== 0);
}

main();

