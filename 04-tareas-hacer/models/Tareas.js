const Tarea = require('./tarea');
/**
 * _listado:
 *    { 'uuid-123123-123123-2': { id:12, desc:asd, completadoEn:92922 }  },
 */
class Tareas {

  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key];
      listado.push( tarea )
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea( id = '' ) {
    if ( this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray( tareas = [] ) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea( desc = '' ) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // 1: en verde
    // Completada: verde
    // Pendiente: rojo

    // 1. Mente :: Completada | Pendiente
    // 2. Tiempo :: Completada | Pendiente

    console.log();

    this.listadoArr.forEach( (tarea, i) => {
      const idx = `${ i + 1 }`.green;
      let estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${idx}. ${tarea.desc} :: ${estado}\n`);
    });
  }

  listadoPendientesCompletadas( completadas = true ) {
    console.log();
    let contador = 0;

    this.listadoArr.forEach( tarea => {

      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

      if (completadas) {
        // mostrar completadas
        if (completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green + '.'.green}. ${desc} :: ${completadoEn.green}\n`);
        }
      } else {
        // mostrar pendientes
        if (!completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green + '.'.green}. ${desc} :: ${estado}\n`);
        }
      }
    });
  }

  toogleCompletadas( ids = [] ) {
        
    ids.forEach(id => {
      let tarea = this._listado[id];

      if ( !tarea.completadoEn ) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach( tarea => {

      if ( !ids.includes(tarea.id) ) {
        this._listado[tarea.id].completadoEn = null;
      }

    });

  }

}


module.exports = Tareas;
