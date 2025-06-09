const API_URL = 'http://localhost:3000/api/clientes';

document.addEventListener('DOMContentLoaded', () => {
  cargarClientes();

  document.getElementById('form-cliente').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('idCliente').value;
    if (id) {
      actualizarCliente(id);
    } else {
      crearCliente();
    }
  });
});

function cargarClientes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(clientes => {
      const tabla = document.getElementById('tabla-clientes');
      tabla.innerHTML = '';
      clientes.forEach(c => {
        tabla.innerHTML += `
          <tr>
            <td>${c.nombre}</td>
            <td>${c.NIT}</td>
            <td>${c.direccion}</td>
            <td>${c.telefono}</td>
            <td>${c.email}</td>
            <td>
              <button onclick="editarCliente(${c.idCliente})">Editar</button>
              <button onclick="eliminarCliente(${c.idCliente})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

function crearCliente() {
  const cliente = obtenerDatosFormulario();
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  })
  .then(() => {
    limpiarFormulario();
    cargarClientes();
  });
}

function actualizarCliente(id) {
  const cliente = obtenerDatosFormulario();
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  })
  .then(() => {
    limpiarFormulario();
    cargarClientes();
  });
}

function eliminarCliente(id) {
  if (confirm('¿Deseas eliminar este cliente?')) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => cargarClientes());
  }
}

function editarCliente(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(c => {
      document.getElementById('idCliente').value = c.idCliente;
      document.getElementById('nombre').value = c.nombre;
      document.getElementById('NIT').value = c.NIT;
      document.getElementById('direccion').value = c.direccion;
      document.getElementById('telefono').value = c.telefono;
      document.getElementById('email').value = c.email;
    });
}

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById('nombre').value,
    NIT: document.getElementById('NIT').value,
    direccion: document.getElementById('direccion').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email').value
  };
}

function limpiarFormulario() {
  document.getElementById('form-cliente').reset();
  document.getElementById('idCliente').value = '';
}
