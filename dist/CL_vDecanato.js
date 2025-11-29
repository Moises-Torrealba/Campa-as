import { CL_mAporte } from "./CL_mAporte.js";
export class CL_vDecanato {
    constructor() {
        this.lblTotal = document.getElementById("lbl-total-aportes");
        this.contenedorLista = document.getElementById("lista-aportes");
        this.modal = document.getElementById("modal-aporte");
        // Inputs del formulario
        this.inpId = document.getElementById("inp-id");
        this.inpFechaAporte = document.getElementById("inp-fecha-aporte");
        this.inpTipoAporte = document.getElementById("inp-tipo-aporte");
        this.inpDescripcion = document.getElementById("inp-descripcion");
        this.inpMontoAporte = document.getElementById("inp-monto-aporte");
        this.inpNombreAporte = document.getElementById("inp-nombre-aporte");
        this.inpTipoAportante = document.getElementById("inp-tipo-aportante");
        // Botones principales
        this.btnMostrarForm = document.getElementById("btn-mostrar-form-aporte");
        this.btnAceptar = document.getElementById("btn-aceptar-aporte");
        this.btnEliminarCancelar = document.getElementById("btn-eliminar-cancelar-aporte");
        // Filtros
        this.filtroTipoDonador = document.getElementById("filtro-tipo-donador");
        this.filtroMontoMin = document.getElementById("filtro-monto-min");
        this.modoEdicion = false;
    }
    abrirModal(limpiar = true) {
        this.modal.classList.remove("hidden");
        if (limpiar) {
            this.limpiarInputs();
            this.inpId.disabled = false;
            this.modoEdicion = false;
            this.btnEliminarCancelar.textContent = "✖ Cancelar";
        }
        else {
            this.btnEliminarCancelar.textContent = "✖ Eliminar";
        }
    }
    cerrarModal() {
        this.modal.classList.add("hidden");
    }
    limpiarInputs() {
        this.inpId.value = "";
        this.inpFechaAporte.value = "";
        this.inpTipoAporte.value = "Efectivo";
        this.inpDescripcion.value = "";
        this.inpMontoAporte.value = "";
        this.inpNombreAporte.value = "";
        this.inpTipoAportante.value = "";
    }
    // Pinta la tabla con la data
    actualizarLista(aportes, total) {
        this.lblTotal.textContent = total.toString();
        this.contenedorLista.innerHTML = "";
        aportes.forEach(ap => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${ap.id.toString().padStart(3, "0")}</td>
        <td>${ap.fechaAporte}</td>
        <td>${ap.tipoAporte}</td>
        <td>${ap.descripcion}</td>
        <td>$ ${ap.montoAporte.toFixed(2)}</td>
        <td>${ap.nombreAporte}</td>
        <td>${ap.tipoAportante}</td>
        <td>
          <button class="btn-editar-aporte" data-id="${ap.id}">Editar</button>
        </td>
      `;
            this.contenedorLista.appendChild(tr);
        });
    }
    cargarDatosEnInputs(ap) {
        this.modoEdicion = true;
        this.abrirModal(false);
        this.inpId.value = ap.id.toString();
        this.inpId.disabled = true;
        this.inpFechaAporte.value = ap.fechaAporte;
        this.inpTipoAporte.value = ap.tipoAporte;
        this.inpDescripcion.value = ap.descripcion;
        this.inpMontoAporte.value = ap.montoAporte.toString();
        this.inpNombreAporte.value = ap.nombreAporte;
        this.inpTipoAportante.value = ap.tipoAportante;
    }
    obtenerDatosDeInputs() {
        const idNum = parseInt(this.inpId.value);
        const montoNum = parseFloat(this.inpMontoAporte.value);
        if (isNaN(idNum) ||
            isNaN(montoNum) ||
            this.inpNombreAporte.value.trim() === "" ||
            this.inpFechaAporte.value.trim() === "" ||
            this.inpDescripcion.value.trim() === "") {
            return null;
        }
        return new CL_mAporte(idNum, this.inpFechaAporte.value.trim(), this.inpTipoAporte.value, this.inpDescripcion.value.trim(), montoNum, this.inpNombreAporte.value.trim(), this.inpTipoAportante.value.trim());
    }
}
