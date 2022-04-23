const mongoose = require('mongoose');


const dbConnection = async() => {

  try {

    await mongoose.connect( process.env.MONGODB_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //MongoParseError: option usecreateindex is not supported
      //useCreateIndex: true,
      //useFindAndModify: false
    });
    
    console.log( 'Base de datos online' );


  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar con la base de datos');
  }

}




module.exports = {
  dbConnection
}