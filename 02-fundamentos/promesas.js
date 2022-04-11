
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

const id = 1;

// getEmpleado(id)
//   .then( empleado => console.log( empleado ))
//   .catch( error => console.log(error) );

// getSalario(id)
//   .then( salario => console.log( salario ))
//   .catch( error => console.log(error) );

let nombre;

getEmpleado(id)
  .then( empleado => {
    nombre = empleado;  
    return getSalario(id);
  })
  .then( salario => console.log('El empleado:', nombre,'tiene un salario de:',salario))
  .catch(err => console.log(err));





//Promise Hell
// getEmpleado(id)
//   .then(empleado => {
//     getSalario(id)
//       .then(salario => {
//         console.log('El empleado:', empleado, 'tiene un salario de:', salario)
//       })
//       .catch(err => console.log(err));
//   })
//   .catch(err => console.log(err));

