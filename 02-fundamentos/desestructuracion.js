
const deadpool = {
  nombre : 'Wade',
  apellido: 'Winston',
  poder: 'Regeneracion',
  getNombre() {
    return `${this.nombre} ${this.apellido} ${this.poder}`;
  }

}
//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
//const poder = deadpool.poder;

function imprimeHeroe( { nombre, apellido, poder, edad = 50 } ) {
  console.log(nombre, apellido, poder, edad);
}

//imprimeHeroe(deadpool);

const heroes = ['Deadpool', 'Superman', 'Batman'];

//const h1 = heroes[0];
//const h2 = heroes[1];
//const h3 = heroes[2];

const [,,h3] = heroes;

console.log(h3);



