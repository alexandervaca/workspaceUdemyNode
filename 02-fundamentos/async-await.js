
const empleados = [
  {id: 1, nombre: 'alex'},
  {id: 2, nombre: 'lola'},
  {id: 3, nombre: 'mica'}
];

const salarios = [
  {id: 1, salario: 1000},
  {id: 2, salario: 1500}
];


const getEmpleado = (id) => {
  
  return new Promise( (resolve, rejected) => {
    const empleado = empleados.find( e => e.id === id )?.nombre;

    (empleado)
      ? resolve(empleado)
      : rejected( `El empleado con id ${id} no existe` );
  });
}

const getSalario = (id) => {
  
  return new Promise( (resolve, rejected) => {
    const salario = salarios.find( s => s.id === id )?.salario;

    (salario)
      ? resolve(salario)
      : rejected( `No existe salario para el id ${id}` );
  });
}

const getInfoUsuario = async(id) => {

  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);
  
    return `El salario del empleado ${empleado} es ${salario}`;
  } catch (error) {
    throw error;
  }
}

const id = 1;

getInfoUsuario(id)
  .then( msg => {
    console.log('TODO BIEN!');
    console.log(msg);
  } )
  .catch( err => {
    console.log('TODO MAL!');
    console.log(err);
  });

