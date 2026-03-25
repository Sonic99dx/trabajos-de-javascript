let productos = [];

function mostrarProductos() {
    const tbody = document.getElementById('productosBody');
    tbody.innerHTML = '';
    
    if (productos.length === 0) {
        const fila = document.createElement('tr');
        fila.innerHTML = '<td colspan="4" style="text-align: center;">No hay productos registrados</td>';
        tbody.appendChild(fila);
        return;
    }
    
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${formatearPrecio(producto.precio)}</td>
            <td>${producto.categoria}</td>
        `;
        tbody.appendChild(fila);
    });
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(precio);
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('mensajeError');
    errorDiv.textContent = mensaje;
    errorDiv.classList.add('show');
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 3000);
}

function validarFormulario(datos) {
    if (!datos.id || datos.id.trim() === '') {
        mostrarError('El ID del producto es obligatorio');
        return false;
    }
    
    if (!datos.nombre || datos.nombre.trim() === '') {
        mostrarError('El nombre del producto es obligatorio');
        return false;
    }
    
    if (!datos.precio || datos.precio <= 0) {
        mostrarError('El precio debe ser un número mayor a 0');
        return false;
    }
    
    if (!datos.categoria || datos.categoria === '') {
        mostrarError('Debe seleccionar una categoría');
        return false;
    }
    
    const productoExistente = productos.find(p => p.id === datos.id);
    if (productoExistente) {
        mostrarError('Ya existe un producto con ese ID');
        return false;
    }
    
    return true;
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const producto = {
        id: document.getElementById('id_producto').value,
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        categoria: document.getElementById('categoria').value
    };
    
    if (validarFormulario(producto)) {
        productos.push(producto);
        
        mostrarProductos();
        
        this.reset();
        
        mostrarError('Producto guardado exitosamente');
        const errorDiv = document.getElementById('mensajeError');
        errorDiv.style.backgroundColor = '#4caf50';
        errorDiv.style.color = 'white';
        setTimeout(() => {
            errorDiv.style.backgroundColor = '';
            errorDiv.style.color = '';
        }, 3000);
    }
});