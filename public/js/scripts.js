// ================================
// SIMULACIÓN DE BASE DE DATOS
// ================================
let database = {
    usuarios: [
        { id: 1, nombreUsuario: 'admin', password: 'admin123', email: 'admin@tiendaropas.com', rol: 'administrador' },
        { id: 2, nombreUsuario: 'vendedor1', password: 'vend123', email: 'vendedor1@tiendaropas.com', rol: 'vendedor' },
        { id: 3, nombreUsuario: 'cajero1', password: 'caj123', email: 'cajero1@tiendaropas.com', rol: 'cajero' }
    ],
    categorias: [
        { id: 1, nombre: 'Camisas', descripcion: 'Camisas formales y casuales', activo: true },
        { id: 2, nombre: 'Pantalones', descripcion: 'Pantalones de vestir, jeans y casuales', activo: true },
        { id: 3, nombre: 'Vestidos', descripcion: 'Vestidos para toda ocasión', activo: true },
        { id: 4, nombre: 'Zapatos', descripcion: 'Calzado masculino y femenino', activo: true },
        { id: 5, nombre: 'Accesorios', descripcion: 'Cinturones, bolsos y complementos', activo: true },
        { id: 6, nombre: 'Ropa Interior', descripcion: 'Ropa íntima masculina y femenina', activo: true },
        { id: 7, nombre: 'Deportiva', descripcion: 'Ropa deportiva y casual', activo: true },
        { id: 8, nombre: 'Chaquetas', descripcion: 'Chaquetas, blazers y abrigos', activo: true }
    ],
    productos: [
        { id: 1, nombre: 'Camisa Blanca Clásica', descripcion: 'Camisa blanca de algodón para hombre', precioUnitario: 120.00, marca: 'ClassicWear', tallaPrenda: 'M', genero: 'Masculino', stock: 25, idCategoria: 1, activo: true },
        { id: 2, nombre: 'Jean Azul Mujer', descripcion: 'Jean azul clásico para mujer', precioUnitario: 180.00, marca: 'DenimStyle', tallaPrenda: 'L', genero: 'Femenino', stock: 15, idCategoria: 2, activo: true },
        { id: 3, nombre: 'Vestido Negro Elegante', descripcion: 'Vestido negro para eventos formales', precioUnitario: 350.00, marca: 'Elegance', tallaPrenda: 'S', genero: 'Femenino', stock: 8, idCategoria: 3, activo: true },
        { id: 4, nombre: 'Zapatos Formales Hombre', descripcion: 'Zapatos de cuero negro para hombre', precioUnitario: 280.00, marca: 'LeatherCraft', tallaPrenda: '42', genero: 'Masculino', stock: 12, idCategoria: 4, activo: true },
        { id: 5, nombre: 'Blusa Floreada', descripcion: 'Blusa con estampado floral', precioUnitario: 95.00, marca: 'FloralDesign', tallaPrenda: 'M', genero: 'Femenino', stock: 20, idCategoria: 1, activo: true },
        { id: 6, nombre: 'Pantalón Deportivo', descripcion: 'Pantalón deportivo unisex', precioUnitario: 85.00, marca: 'SportWear', tallaPrenda: 'L', genero: 'Unisex', stock: 30, idCategoria: 7, activo: true }
    ],
    clientes: [
        { id: 1, nombre: 'Juan Pérez García', NIT: '1234567890', direccion: 'Av. San Martín #123', telefono: '70123456', email: 'juan.perez@email.com', activo: true },
        { id: 2, nombre: 'María López Mendoza', NIT: '9876543210', direccion: 'Calle Bolívar #456', telefono: '75987654', email: 'maria.lopez@email.com', activo: true },
        { id: 3, nombre: 'Carlos Rodríguez', NIT: '5555555555', direccion: 'Zona Norte #789', telefono: '68555555', email: 'carlos.rodriguez@email.com', activo: true },
        { id: 4, nombre: 'Cliente Ocasional', NIT: null, direccion: null, telefono: null, email: null, activo: true }
    ],
    vendedores: [
        { id: 1, nombre: 'Ana Martínez', direccion: 'Calle Comercio #100', telefono: '72111111', email: 'ana.martinez@tiendaropas.com', codVendedor: 'VEND001', activo: true },
        { id: 2, nombre: 'Pedro Sánchez', direccion: 'Av. Principal #200', telefono: '73222222', email: 'pedro.sanchez@tiendaropas.com', codVendedor: 'VEND002', activo: true },
        { id: 3, nombre: 'Laura González', direccion: 'Calle Central #300', telefono: '74333333', email: 'laura.gonzalez@tiendaropas.com', codVendedor: 'VEND003', activo: true }
    ],
    facturas: [
        { id: 1, numeroFactura: 'FAC-2024-000001', nitCliente: '1234567890', titular_cliente: 'Juan Pérez García', fechaEmision: '2024-12-07', nitEmisor: '123456789', codigoPV: 'PV001', total: 300.00, totalImpuestos: 39.00, estado: 'emitida', idCliente: 1, idVendedor: 1, items: [{ idProducto: 1, cantidad: 2, precioUnitario: 120.00, subtotal: 240.00 }, { idProducto: 5, cantidad: 1, precioUnitario: 95.00, subtotal: 95.00 }] }
    ]
};

// Variables globales
let usuarioActual = null;
let facturaActual = {
    cliente: null,
    vendedor: null,
    items: [],
    subtotal: 0,
    iva: 0,
    total: 0
};
let contadorFactura = 2;

// ================================
// FUNCIONES DE AUTENTICACIÓN
// ================================
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuario = database.usuarios.find(u =>
        u.nombreUsuario === username && u.password === password
    );

    if (usuario) {
        usuarioActual = usuario;
        document.getElementById('usuario-nombre').textContent = usuario.nombreUsuario;
        document.getElementById('usuario-rol').textContent = usuario.rol;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');

        // Cargar datos iniciales
        cargarDatos();
        showAlert('Bienvenido al sistema', 'success');
    } else {
        showAlert('Usuario o contraseña incorrectos', 'error');
    }
}

function logout() {
    usuarioActual = null;
    facturaActual = { cliente: null, vendedor: null, items: [], subtotal: 0, iva: 0, total: 0 };
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('login-form').reset();
}

// ================================
// FUNCIONES DE CARGA DE DATOS
// ================================
function cargarDatos() {
    cargarCategorias();
    cargarProductos();
    cargarClientes();
    cargarVendedores();
    cargarFacturas();
    cargarSelectores();
}

function cargarCategorias() {
    const tbody = document.getElementById('categorias-table');
    const select = document.getElementById('producto-categoria');

    tbody.innerHTML = '';
    select.innerHTML = '<option value="">Seleccionar...</option>';

    database.categorias.forEach(cat => {
        // Tabla
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${cat.nombre}</td>
                    <td>${cat.descripcion || ''}</td>
                    <td><span class="badge ${cat.activo ? 'bg-success' : 'bg-danger'}">${cat.activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editarCategoria(${cat.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarCategoria(${cat.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
        tbody.appendChild(tr);

        // Select
        if (cat.activo) {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.nombre;
            select.appendChild(option);
        }
    });
}

function cargarProductos() {
    const tbody = document.getElementById('productos-table');
    const select = document.getElementById('producto-select');

    tbody.innerHTML = '';
    select.innerHTML = '<option value="">Seleccionar producto...</option>';

    database.productos.forEach(prod => {
        const categoria = database.categorias.find(c => c.id === prod.idCategoria);

        // Tabla
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${prod.nombre}</td>
                    <td>${prod.marca || ''}</td>
                    <td>${prod.tallaPrenda || ''}</td>
                    <td>${prod.genero}</td>
                    <td>${prod.precioUnitario.toFixed(2)} Bs</td>
                    <td><span class="badge ${prod.stock > 5 ? 'bg-success' : prod.stock > 0 ? 'bg-warning' : 'bg-danger'}">${prod.stock}</span></td>
                    <td>${categoria ? categoria.nombre : ''}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editarProducto(${prod.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${prod.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
        tbody.appendChild(tr);

        // Select
        if (prod.activo && prod.stock > 0) {
            const option = document.createElement('option');
            option.value = prod.id;
            option.textContent = `${prod.nombre} - ${prod.precioUnitario.toFixed(2)} Bs (Stock: ${prod.stock})`;
            select.appendChild(option);
        }
    });
}

function cargarClientes() {
    const tbody = document.getElementById('clientes-table');
    const select = document.getElementById('cliente-select');

    tbody.innerHTML = '';
    select.innerHTML = '<option value="">Seleccionar cliente...</option>';

    database.clientes.forEach(cliente => {
        // Tabla
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.NIT || 'S/N'}</td>
                    <td>${cliente.telefono || ''}</td>
                    <td>${cliente.email || ''}</td>
                    <td>${cliente.direccion || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editarCliente(${cliente.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarCliente(${cliente.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
        tbody.appendChild(tr);

        // Select
        if (cliente.activo) {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} ${cliente.NIT ? '(' + cliente.NIT + ')' : ''}`;
            select.appendChild(option);
        }
    });
}

function cargarVendedores() {
    const select = document.getElementById('vendedor-select');
    select.innerHTML = '<option value="">Seleccionar vendedor...</option>';

    database.vendedores.forEach(vendedor => {
        if (vendedor.activo) {
            const option = document.createElement('option');
            option.value = vendedor.id;
            option.textContent = `${vendedor.nombre} (${vendedor.codVendedor})`;
            select.appendChild(option);
        }
    });
}

function cargarFacturas() {
    const tbody = document.getElementById('facturas-table');
    tbody.innerHTML = '';

    database.facturas.forEach(factura => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${factura.numeroFactura}</td>
                    <td>${factura.titular_cliente}</td>
                    <td>${factura.fechaEmision}</td>
                    <td>${factura.total.toFixed(2)} Bs</td>
                    <td><span class="badge ${factura.estado === 'emitida' ? 'bg-success' : factura.estado === 'anulada' ? 'bg-danger' : 'bg-warning'}">${factura.estado}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-info" onclick="verFactura(${factura.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-warning" onclick="imprimirFactura(${factura.id})">
                            <i class="fas fa-print"></i>
                        </button>
                    </td>
                `;
        tbody.appendChild(tr);
    });
}

function cargarSelectores() {
    // Ya se cargan en las funciones individuales
}

// ================================
// FUNCIONES DE FACTURACIÓN
// ================================
function agregarProducto() {
    const productoId = parseInt(document.getElementById('producto-select').value);
    const cantidad = parseInt(document.getElementById('cantidad-input').value);

    if (!productoId || !cantidad || cantidad <= 0) {
        showAlert('Seleccione un producto y cantidad válida', 'error');
        return;
    }

    const producto = database.productos.find(p => p.id === productoId);
    if (!producto) {
        showAlert('Producto no encontrado', 'error');
        return;
    }

    if (cantidad > producto.stock) {
        showAlert(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles`, 'error');
        return;
    }

    // Verificar si el producto ya está en la factura
    const itemExistente = facturaActual.items.find(item => item.idProducto === productoId);
    if (itemExistente) {
        if (itemExistente.cantidad + cantidad > producto.stock) {
            showAlert(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles`, 'error');
            return;
        }
        itemExistente.cantidad += cantidad;
        itemExistente.subtotal = itemExistente.cantidad * itemExistente.precioUnitario;
    } else {
        facturaActual.items.push({
            idProducto: productoId,
            nombre: producto.nombre,
            cantidad: cantidad,
            precioUnitario: producto.precioUnitario,
            subtotal: cantidad * producto.precioUnitario
        });
    }

    actualizarVistaFactura();
    document.getElementById('producto-select').value = '';
    document.getElementById('cantidad-input').value = 1;
}

function eliminarProductoFactura(index) {
    facturaActual.items.splice(index, 1);
    actualizarVistaFactura();
}

function actualizarVistaFactura() {
    const container = document.getElementById('lista-productos');
    container.innerHTML = '';

    facturaActual.subtotal = 0;

    facturaActual.items.forEach((item, index) => {
        facturaActual.subtotal += item.subtotal;

        const div = document.createElement('div');
        div.className = 'producto-item';
        div.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${item.nombre}</strong><br>
                            <small>Cantidad: ${item.cantidad} x ${item.precioUnitario.toFixed(2)} Bs</small>
                        </div>
                        <div class="text-end">
                            <span class="h6">${item.subtotal.toFixed(2)} Bs</span>
                            <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarProductoFactura(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
        container.appendChild(div);
    });

    facturaActual.iva = facturaActual.subtotal * 0.13;
    facturaActual.total = facturaActual.subtotal + facturaActual.iva;

    document.getElementById('subtotal').textContent = facturaActual.subtotal.toFixed(2) + ' Bs';
    document.getElementById('iva').textContent = facturaActual.iva.toFixed(2) + ' Bs';
    document.getElementById('total').textContent = facturaActual.total.toFixed(2) + ' Bs';
}

function generarFactura() {
    if (!document.getElementById('cliente-select').value) {
        showAlert('Debe seleccionar un cliente', 'error');
        return;
    }

    if (!document.getElementById('vendedor-select').value) {
        showAlert('Debe seleccionar un vendedor', 'error');
        return;
    }

    if (facturaActual.items.length === 0) {
        showAlert('Debe agregar al menos un producto', 'error');
        return;
    }

    const clienteId = parseInt(document.getElementById('cliente-select').value);
    const vendedorId = parseInt(document.getElementById('vendedor-select').value);
    const cliente = database.clientes.find(c => c.id === clienteId);
    const vendedor = database.vendedores.find(v => v.id === vendedorId);

    const numeroFactura = `FAC-2024-${String(contadorFactura).padStart(6, '0')}`;
    contadorFactura++;

    const nuevaFactura = {
        id: database.facturas.length + 1,
        numeroFactura: numeroFactura,
        nitCliente: cliente.NIT,
        titular_cliente: cliente.nombre,
        fechaEmision: new Date().toISOString().split('T')[0],
        nitEmisor: '123456789',
        codigoPV: 'PV001',
        total: facturaActual.total,
        totalImpuestos: facturaActual.iva,
        estado: 'emitida',
        idCliente: clienteId,
        idVendedor: vendedorId,
        items: [...facturaActual.items]
    };

    // Actualizar stock
    facturaActual.items.forEach(item => {
        const producto = database.productos.find(p => p.id === item.idProducto);
        if (producto) {
            producto.stock -= item.cantidad;
        }
    });

    database.facturas.push(nuevaFactura);

    // Limpiar factura actual
    facturaActual = { cliente: null, vendedor: null, items: [], subtotal: 0, iva: 0, total: 0 };

    // Actualizar vistas
    cargarProductos();
    cargarFacturas();
    actualizarVistaFactura();

    // Limpiar formulario
    document.getElementById('cliente-select').value = '';
    document.getElementById('vendedor-select').value = '';

    showAlert(`Factura ${numeroFactura} generada exitosamente`, 'success');

    // Mostrar factura
    mostrarFacturaGenerada(nuevaFactura);
}

function mostrarFacturaGenerada(factura) {
    const cliente = database.clientes.find(c => c.id === factura.idCliente);
    const vendedor = database.vendedores.find(v => v.id === factura.idVendedor);

    let itemsHtml = '';
    factura.items.forEach(item => {
        const producto = database.productos.find(p => p.id === item.idProducto);
        itemsHtml += `
                    <tr>
                        <td>${producto ? producto.nombre : 'Producto no encontrado'}</td>
                        <td class="text-center">${item.cantidad}</td>
                        <td class="text-end">${item.precioUnitario.toFixed(2)}</td>
                        <td class="text-end">${item.subtotal.toFixed(2)}</td>
                    </tr>
                `;
    });

    const facturaHtml = `
                <div class="modal fade" id="factura-generada-modal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Factura ${factura.numeroFactura}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="factura-preview" id="factura-content">
                                    <div class="text-center mb-4">
                                        <h3>TIENDA DE ROPAS</h3>
                                        <p>NIT: ${factura.nitEmisor}</p>
                                        <p>Punto de Venta: ${factura.codigoPV}</p>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <strong>FACTURA N°:</strong> ${factura.numeroFactura}<br>
                                            <strong>FECHA:</strong> ${factura.fechaEmision}
                                        </div>
                                        <div class="col-6 text-end">
                                            <strong>VENDEDOR:</strong> ${vendedor.nombre}<br>
                                            <strong>CÓDIGO:</strong> ${vendedor.codVendedor}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <strong>CLIENTE:</strong> ${cliente.nombre}<br>
                                        <strong>NIT:</strong> ${cliente.NIT || 'S/N'}<br>
                                        <strong>DIRECCIÓN:</strong> ${cliente.direccion || 'No especificada'}
                                    </div>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>DESCRIPCIÓN</th>
                                                <th class="text-center">CANT.</th>
                                                <th class="text-end">P. UNIT.</th>
                                                <th class="text-end">SUBTOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${itemsHtml}
                                        </tbody>
                                    </table>
                                    <div class="row">
                                        <div class="col-6"></div>
                                        <div class="col-6">
                                            <table class="table">
                                                <tr>
                                                    <td><strong>SUBTOTAL:</strong></td>
                                                    <td class="text-end">${(factura.total - factura.totalImpuestos).toFixed(2)} Bs</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>IVA (13%):</strong></td>
                                                    <td class="text-end">${factura.totalImpuestos.toFixed(2)} Bs</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>TOTAL:</strong></td>
                                                    <td class="text-end"><strong>${factura.total.toFixed(2)} Bs</strong></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" onclick="imprimirFacturaModal()">
                                    <i class="fas fa-print me-2"></i>Imprimir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', facturaHtml);

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('factura-generada-modal'));
    modal.show();

    // Eliminar modal del DOM cuando se cierre
    document.getElementById('factura-generada-modal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

function imprimirFacturaModal() {
    const contenido = document.getElementById('factura-content').innerHTML;
    const ventana = window.open('', '_blank');
    ventana.document.write(`
                <html>
                <head>
                    <title>Factura</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .text-center { text-align: center; }
                        .text-end { text-align: right; }
                        .mb-3 { margin-bottom: 1rem; }
                        .mb-4 { margin-bottom: 1.5rem; }
                    </style>
                </head>
                <body>
                    ${contenido}
                </body>
                </html>
            `);
    ventana.document.close();
    ventana.print();
}

// ================================
// FUNCIONES CRUD
// ================================
function guardarProducto() {
    const nombre = document.getElementById('producto-nombre').value;
    const marca = document.getElementById('producto-marca').value;
    const precio = parseFloat(document.getElementById('producto-precio').value);
    const talla = document.getElementById('producto-talla').value;
    const stock = parseInt(document.getElementById('producto-stock').value);
    const genero = document.getElementById('producto-genero').value;
    const categoria = parseInt(document.getElementById('producto-categoria').value);
    const descripcion = document.getElementById('producto-descripcion').value;

    if (!nombre || !precio || !genero || !categoria || !stock) {
        showAlert('Complete todos los campos obligatorios', 'error');
        return;
    }

    const nuevoProducto = {
        id: database.productos.length + 1,
        nombre: nombre,
        descripcion: descripcion,
        precioUnitario: precio,
        marca: marca,
        tallaPrenda: talla,
        genero: genero,
        stock: stock,
        idCategoria: categoria,
        activo: true
    };

    database.productos.push(nuevoProducto);
    cargarProductos();

    // Cerrar modal y limpiar formulario
    bootstrap.Modal.getInstance(document.getElementById('producto-modal')).hide();
    document.getElementById('producto-form').reset();

    showAlert('Producto guardado exitosamente', 'success');
}

function guardarCliente() {
    const nombre = document.getElementById('cliente-nombre').value;
    const nit = document.getElementById('cliente-nit').value;
    const telefono = document.getElementById('cliente-telefono').value;
    const email = document.getElementById('cliente-email').value;
    const direccion = document.getElementById('cliente-direccion').value;

    if (!nombre) {
        showAlert('El nombre es obligatorio', 'error');
        return;
    }

    const nuevoCliente = {
        id: database.clientes.length + 1,
        nombre: nombre,
        NIT: nit || null,
        direccion: direccion || null,
        telefono: telefono || null,
        email: email || null,
        activo: true
    };

    database.clientes.push(nuevoCliente);
    cargarClientes();

    // Cerrar modal y limpiar formulario
    bootstrap.Modal.getInstance(document.getElementById('cliente-modal')).hide();
    document.getElementById('cliente-form').reset();

    showAlert('Cliente guardado exitosamente', 'success');
}

function guardarCategoria() {
    const nombre = document.getElementById('categoria-nombre').value;
    const descripcion = document.getElementById('categoria-descripcion').value;

    if (!nombre) {
        showAlert('El nombre es obligatorio', 'error');
        return;
    }

    const nuevaCategoria = {
        id: database.categorias.length + 1,
        nombre: nombre,
        descripcion: descripcion || null,
        activo: true
    };

    database.categorias.push(nuevaCategoria);
    cargarCategorias();

    // Cerrar modal y limpiar formulario
    bootstrap.Modal.getInstance(document.getElementById('categoria-modal')).hide();
    document.getElementById('categoria-form').reset();

    showAlert('Categoría guardada exitosamente', 'success');
}

// ================================
// FUNCIONES DE UTILIDAD
// ================================
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show alert-custom`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

function verFactura(id) {
    const factura = database.facturas.find(f => f.id === id);
    if (factura) {
        mostrarFacturaGenerada(factura);
    }
}

function imprimirFactura(id) {
    const factura = database.facturas.find(f => f.id === id);
    if (factura) {
        mostrarFacturaGenerada(factura);
        setTimeout(() => {
            imprimirFacturaModal();
        }, 500);
    }
}

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', login);
});
