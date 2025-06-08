const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria'); // Asegúrate de que la ruta sea correcta

const Producto = sequelize.define('Producto', {
  idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  precioUnitario: DataTypes.DOUBLE,
  marca: DataTypes.STRING,
  tallaPrenda: DataTypes.STRING,
  genero: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  imagen: DataTypes.STRING,
}, {
  tableName: 'productos',
  timestamps: false
});

// Relación con Categoría
Producto.belongsTo(Categoria, {
  foreignKey: 'idCategoria'
});

module.exports = Producto;
