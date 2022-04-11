const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    describe: 'Es la base de la tabla de multiplicar',
    demandOption:true
  })
  .option('l', {
    alias: 'listar',
    type: 'boolean',
    describe: 'Muestra la tabla en consola',
    default: false
  })
  .option('h', {
    alias: 'hasta',
    type: 'number',
    describe: 'Es el valor hasta donde realizar la multiplicacion',
    demandOption: false,
    default: 10
  })
  .check( (argv, options) => {
    if (isNaN(argv.b)) {
      throw 'La base tiene que ser un numero';
    }
    if (isNaN(argv.h)) {
      throw 'El valor hasta tiene que ser un numero';
    }
    return true;
  })
  .argv;


  module.exports = argv;
