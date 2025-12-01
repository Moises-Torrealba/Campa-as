import { CL_mAporte } from "./CL_mAporte.js";
// Vista para usuarios (vAportes). Contiene helpers para obtener elementos
// del DOM (con prefijo opcional) y métodos para abrir/cerrar modales,
// limpiar inputs, renderizar la tabla y manejar el panel de reportes.
export class CL_vAportes {
    constructor(prefix = "") {
        this.prefix = prefix;
    }
    // Helper para obtener un elemento y lanzar error si no existe.
    getEl(id) {
        const el = document.getElementById(this.prefix + id);
        if (!el)
            throw new Error(`Elemento no encontrado: ${this.prefix}${id}`);
        return el;
    }
    // Getters para elementos frecuentemente usados en la UI.
    get lblTotal() { return this.getEl("lbl-total-aportes"); }
    get contenedorLista() { return this.getEl("lista-aportes"); }
    get modal() { return this.getEl("modal-aporte"); }
    // Formulario para añadir nuevo aporte
    get inpId() { return this.getEl("inp-id"); }
    get inpFechaAporte() { return this.getEl("inp-fecha-aporte"); }
    get inpTipoAporte() { return this.getEl("inp-tipo-aporte"); }
    get inpDescripcion() { return this.getEl("inp-descripcion"); }
    get inpMontoAporte() { return this.getEl("inp-monto-aporte"); }
    get inpNombreAporte() { return this.getEl("inp-nombre-aporte"); }
    get inpTipoAportante() { return this.getEl("inp-tipo-aportante"); }
    // Botones
    get btnMostrarForm() { return this.getEl("btn-mostrar-form-aporte"); }
    get btnAceptar() { return this.getEl("btn-aceptar-aporte"); }
    get btnCerrarModal() { return this.getEl("btn-eliminar-cancelar-aporte"); }
    // Filtros (si quieres que el usuario también filtre)
    get filtroTipoDonador() { return this.getEl("filtro-tipo-donador"); }
    get filtroMontoMin() { return this.getEl("filtro-monto-min"); }
    // Panel de reporte
    get panelReporte() { return this.getEl("panel-reporte"); }
    get lblReporteSobre() { return this.getEl("lbl-reporte-sobre"); }
    get inpReporte() { return this.getEl("inp-reporte-falla"); }
    get btnEnviarReporte() { return this.getEl("btn-enviar-reporte"); }
    get btnCancelarReporte() { return this.getEl("btn-cancelar-reporte"); }
    // Abre el modal; si `limpiar` es true se reinician los inputs.
    abrirModal(limpiar = true) {
        this.modal.classList.remove("hidden");
        if (limpiar) {
            this.limpiarInputs();
        }
    }
    // Cierra el modal
    cerrarModal() {
        this.modal.classList.add("hidden");
    }
    // Pone los inputs en su estado inicial
    limpiarInputs() {
        this.inpId.value = "";
        this.inpFechaAporte.value = "";
        this.inpTipoAporte.value = "Efectivo";
        this.inpDescripcion.value = "";
        this.inpMontoAporte.value = "";
        this.inpNombreAporte.value = "";
        this.inpTipoAportante.value = "";
    }
    // Tabla: el usuario NO edita, solo puede reportar
    // `actualizarLista` renderiza las filas a partir del array de aportes
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
          <button class="btn-reportar-aporte" data-id="${ap.id}">Reportar</button>
        </td>
      `;
            this.contenedorLista.appendChild(tr);
        });
    }
    // Construye un CL_mAporte a partir de los inputs; valida campos básicos.
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
    // Panel de reportes: mostrar/ocultar
    abrirPanelReporte(idAporte) {
        this.lblReporteSobre.textContent = idAporte.toString().padStart(3, "0");
        this.inpReporte.value = "";
        this.panelReporte.classList.remove("hidden");
    }
    cerrarPanelReporte() {
        this.panelReporte.classList.add("hidden");
    }
}
