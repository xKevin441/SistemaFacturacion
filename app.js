const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models'); // Importa conexión y modelos
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/categorias', require('./routes/CategoriaRoute'));
app.use('/api/clientes', require('./routes/ClienteRoute'));
app.use('/api/productos', require('./routes/ProductoRoute'));
app.use('/api/vendedores', require('./routes/VendedorRoute'));
app.use('/api/facturas', require('./routes/FacturaRoute'));
app.use('/api/items', require('./routes/ItemFacturaRoute'));

// Sincronización con la base de datos y arranque del servidor
db.sequelize.sync({ force: false }) // Cambia a true si quieres resetear DB cada vez
  .then(() => {
    console.log('Base de datos conectada y modelos sincronizados.');
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos:', error);
  });
