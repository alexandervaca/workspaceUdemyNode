const { response } = require('express');
const { Producto } = require('../models');

// obtenerProductos - paginado - total - populate
const obtenerProductos = async(req, res) => {

  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, productos ] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip( Number.isNaN(desde) ? 0 : desde )
      .limit( Number.isNaN(limit) ? 5 : limit )
  ])

  res.json({
    total,
    productos
  });
}

// obtenerProducto - populate {}
const obtenerProducto = async(req, res) => {

  const { id } = req.params;

  const producto = await Producto.findById( id )
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');
  
  res.json(producto);
}

const crearProducto = async( req, res = response ) => {

  const { estado, usuario, ...body } = req.body;
  const nombre = body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });
  
  if( productoDB ){
    return res.status(400).json({
      msg: `El producto ${ productoDB.nombre }, ya existe`
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id
  }

  let producto = await new Producto( data );
  
  // Guardar DB
  await producto.save();

  res.status(201).json( producto );
}

// actualizarProducto
const actualizarProducto = async(req, res) => {

  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if( data.nombre ) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  try {
    const producto = await Producto
      .findByIdAndUpdate( id, data, { new: true } )
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre');
    
    res.json(producto);

  }catch(error){
    
    let msgError = 'Error al intentar actualizar el producto';
    
    if(error.code === '11000' || error.code === 11000) {
      msgError = `Error por valor duplicado: '${ data.nombre }'`;
    }

    console.log(error);
    res.status(500).json({
      msg: msgError
    });
  }
}

// eliminarProducto - estado:false
const eliminarProducto = async(req, res) => {

  const { id } = req.params;

  // Eliminacion logica
  const producto = await Producto
    .findByIdAndUpdate( id, { estado: false } )
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

  res.json(producto);
}

module.exports = {
  actualizarProducto,
  eliminarProducto,
  crearProducto,
  obtenerProducto,
  obtenerProductos,
}