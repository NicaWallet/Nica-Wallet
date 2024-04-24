
document.addEventListener("DOMContentLoaded", function() {
    const filtroFechaInicio = document.getElementById("fecha-inicio");
    const filtroFechaFin = document.getElementById("fecha-fin");
    const filtroTipo = document.getElementById("tipo");
    const btnFiltrar = document.getElementById("btn-filtrar");
    const tablaTransacciones = document.getElementById("tabla-transacciones").getElementsByTagName('tbody')[0];

    btnFiltrar.addEventListener("click", function() {
        const fechaInicio = filtroFechaInicio.value;
        const fechaFin = filtroFechaFin.value;
        const tipo = filtroTipo.value;

        // Validar que se ingresen valores para fecha de inicio, fecha de fin y tipo antes de filtrar
        if (fechaInicio && fechaFin || tipo) {
            mostrarTransaccionesFiltradas(fechaInicio, fechaFin, tipo);
        } else {
            // Mostrar mensaje de error en consola si falta alguno de los filtros
            console.log("Por favor ingrese al menos uno de los filtros.");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingrese un rango de fecha valido.'
            });
        }
    });

    function mostrarTransaccionesFiltradas(fechaInicio, fechaFin, tipo) {
        // Fetch data from the mock URL
        fetch('https://deef8299-da86-4f65-8ee4-61296ff68b80.mock.pstmn.io/TestTableData') //TODO: implementar axios
            .then(response => response.json())
            .then(data => {
                const transaccionesFiltradas = filtrarTransacciones(data[0].data, fechaInicio, fechaFin, tipo);
                mostrarTabla(transaccionesFiltradas);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function filtrarTransacciones(transacciones, fechaInicio, fechaFin, tipo) {
        return transacciones.filter(function(transaccion) {
            // Filtro de fecha
            if (fechaInicio && transaccion.fecha < fechaInicio) return false;
            if (fechaFin && transaccion.fecha > fechaFin) return false;
            // Filtro de tipo
            if (tipo && transaccion.tipo.toLowerCase() !== tipo.toLowerCase()) return false;

            return true;
        });
    }

    function mostrarTabla(transacciones) {
        // Limpiar tabla antes de agregar las nuevas transacciones
        tablaTransacciones.innerHTML = "";

        // Agregar las transacciones filtradas a la tabla
        transacciones.forEach(function(transaccion) {
            const row = tablaTransacciones.insertRow();
            const cellFecha = row.insertCell(0);
            const cellTipo = row.insertCell(1);
            const cellDescripcion = row.insertCell(2);
            const cellMonto = row.insertCell(3);
            const cellCategoria = row.insertCell(4);

            cellFecha.textContent = transaccion.fecha;
            cellTipo.textContent = transaccion.tipo;
            cellDescripcion.textContent = transaccion.descripcion;
            cellMonto.textContent = transaccion.monto.toFixed(2); // Ensure monto is formatted as a currency
            cellCategoria.textContent = transaccion.categoria;
        });
    }
});
