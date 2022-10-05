const { response } = require('express');
const { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res) => {

  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, categorias ] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip( Number.isNaN(desde) ? 0 : desde )
      .limit( Number.isNaN(limit) ? 5 : limit )
  ])

  res.json({
    total,
    categorias
  });
}

// obtenerCategoria - populate {}
const obtenerCategoria = async(req, res) => {

  const { id } = req.params;

  const categoria = await Categoria.findById( id )
    .populate('usuario', 'nombre');
  
  res.json(categoria);
}


const crearCategoria = async( req, res = response ) => {

  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if( categoriaDB ){
    return res.status(400).json({
      msg: `La categoria ${ categoriaDB.nombre }, ya existe`
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = await new Categoria( data );
  
  // Guardar DB
  await categoria.save();

  res.status(201).json( categoria );
}

// actualizarCategoria
const categoriaUpdate = async(req, res) => {

  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  try {
    const categoria = await Categoria
      .findByIdAndUpdate( id, data, { new: true } )
      .populate('usuario', 'nombre');
    
    res.json(categoria);

  }catch(error){
    
    let msgError = 'Error al intentar actualizar la categoria';
    
    if(error.code === '11000' || error.code === 11000) {
      msgError = `Error por valor duplicado: '${ data.nombre }'`;
    }

    console.log(error);
    res.status(500).json({
      msg: msgError
    });
  }
}

// borrarCategoria - estado:false
const categoriaDelete = async(req, res) => {

  const { id } = req.params;

  // Eliminacion logica
  const categoria = await Categoria
    .findByIdAndUpdate( id, { estado: false } )
    .populate('usuario', 'nombre');

  res.json(categoria);
}

module.exports = {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  categoriaUpdate,
  categoriaDelete
}