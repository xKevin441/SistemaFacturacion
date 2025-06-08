const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

const ProductoRepository = {
  async crear(data) {
    return await Producto.create(data);
  },

  async obtenerTodos() {
    return await Producto.findAll({ include: Categoria });
  },

  async obtenerPorId(id) {
    return await Producto.findByPk(id, { include: Categoria });
  },

  async actualizar(id, data) {
    return await Producto.update(data, { where: { idProducto: id } });
  },

  async eliminar(id) {
    return await Producto.destroy({ where: { idProducto: id } });
  }
};

module.exports = ProductoRepository;
