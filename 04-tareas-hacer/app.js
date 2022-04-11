require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
  toogleCompletadas
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {

  let opt = '';
  const tareas = new Tareas();
  
  const tareasDB = leerDB();

  if ( tareasDB ) {
    //Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    
    switch (opt) {
      case '1':
          //crear opcion
          const desc = await leerInput('Descripcion: ');
          tareas.crearTarea( desc );
      break;
      
      case '2':
        tareas.listadoCompleto();
      break;

      case '3':
        tareas.listadoPendientesCompletadas(true);
      break;

      case '4':
        tareas.listadoPendientesCompletadas(false);
      break;

      case '5': // Completado o Pendiente
        const ids = await mostrarListadoCheckList( tareas.listadoArr );
        tareas.toogleCompletadas(ids);
      break;

      case '6': // Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          const ok = await confirmar('¿Esta seguro?');
          if ( ok ) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
        }
      break;
    }


    guardarDB( tareas.listadoArr );

    await pausa();

  } while (opt !== '0');
};

main();
