const fs = require('fs');
const colors = require('colors');

const crearArchivo = async (base = 2, listar = false, hasta = 10) => {

  try {
    let salida = '';
    let salidaArchivo = '';

    for (let contador = 1; contador <= hasta; contador++) {
      salida += `${base} ` + 'x'.red + ` ${contador} ` + '='.green + ` ${base * contador}\n`;
      salidaArchivo += `${base} x ${contador} = ${base * contador}\n`;
    }

    if (listar) {
      console.log('================'.rainbow);
      console.log('  Tabla del '.rainbow, colors.yellow(base) );
      console.log('================'.rainbow);
      console.log(salida);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salidaArchivo);

    return `tabla-${base}.txt`;

  } catch (err) {
    throw err;
  }
}

module.exports = {
  crearArchivo 
}