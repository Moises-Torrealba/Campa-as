import { CL_mAporte, TipoAporte } from "./CL_mAporte.js";

// Vista para usuarios (vAportes). Contiene helpers para obtener elementos
// del DOM (con prefijo opcional) y métodos para abrir/cerrar modales,
// limpiar inputs, renderizar la tabla y manejar el panel de reportes.
export class CL_vAportes {
  private prefix: string;

  constructor(prefix: string = "") {
    this.prefix = prefix;
  }

  // Helper para obtener un elemento y lanzar error si no existe.
  private getEl<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(this.prefix + id) as T | null;
    if (!el) throw new Error(`Elemento no encontrado: ${this.prefix}${id}`);
    return el;
  }

  // Getters para elementos frecuentemente usados en la UI.
  public get lblTotal() { return this.getEl<HTMLSpanElement>("lbl-total-aportes"); }
  public get contenedorLista() { return this.getEl<HTMLTableSectionElement>("lista-aportes"); }
  public get modal() { return this.getEl<HTMLDivElement>("modal-aporte"); }

  // Formulario para añadir nuevo aporte
  public get inpId() { return this.getEl<HTMLInputElement>("inp-id"); }
  public get inpFechaAporte() { return this.getEl<HTMLInputElement>("inp-fecha-aporte"); }
  public get inpTipoAporte() { return this.getEl<HTMLSelectElement>("inp-tipo-aporte"); }
  public get inpDescripcion() { return this.getEl<HTMLInputElement>("inp-descripcion"); }
  public get inpMontoAporte() { return this.getEl<HTMLInputElement>("inp-monto-aporte"); }
  public get inpNombreAporte() { return this.getEl<HTMLInputElement>("inp-nombre-aporte"); }
  public get inpTipoAportante() { return this.getEl<HTMLInputElement>("inp-tipo-aportante"); }

  // Botones
  public get btnMostrarForm() { return this.getEl<HTMLButtonElement>("btn-mostrar-form-aporte"); }
  public get btnAceptar() { return this.getEl<HTMLButtonElement>("btn-aceptar-aporte"); }
  public get btnCerrarModal() { return this.getEl<HTMLButtonElement>("btn-eliminar-cancelar-aporte"); }

  // Filtros (si quieres que el usuario también filtre)
  public get filtroTipoDonador() { return this.getEl<HTMLSelectElement>("filtro-tipo-donador"); }
  public get filtroMontoMin() { return this.getEl<HTMLInputElement>("filtro-monto-min"); }

  // Panel de reporte
  public get panelReporte() { return this.getEl<HTMLDivElement>("panel-reporte"); }
  public get lblReporteSobre() { return this.getEl<HTMLSpanElement>("lbl-reporte-sobre"); }
  public get inpReporte() { return this.getEl<HTMLInputElement>("inp-reporte-falla"); }
  public get btnEnviarReporte() { return this.getEl<HTMLButtonElement>("btn-enviar-reporte"); }
  public get btnCancelarReporte() { return this.getEl<HTMLButtonElement>("btn-cancelar-reporte"); }

  // Abre el modal; si `limpiar` es true se reinician los inputs.
  public abrirModal(limpiar: boolean = true): void {
    this.modal.classList.remove("hidden");
    if (limpiar) {
      this.limpiarInputs();
    }
  }

  // Cierra el modal
  public cerrarModal(): void {
    this.modal.classList.add("hidden");
  }

  // Pone los inputs en su estado inicial
  public limpiarInputs(): void {
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
  public actualizarLista(aportes: CL_mAporte[], total: number): void {
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
  public obtenerDatosDeInputs(): CL_mAporte | null {
    const idNum = parseInt(this.inpId.value);
    const montoNum = parseFloat(this.inpMontoAporte.value);

    if (
      isNaN(idNum) ||
      isNaN(montoNum) ||
      this.inpNombreAporte.value.trim() === "" ||
      this.inpFechaAporte.value.trim() === "" ||
      this.inpDescripcion.value.trim() === ""
    ) {
      return null;
    }

    return new CL_mAporte(
      idNum,
      this.inpFechaAporte.value.trim(),
      this.inpTipoAporte.value as TipoAporte,
      this.inpDescripcion.value.trim(),
      montoNum,
      this.inpNombreAporte.value.trim(),
      this.inpTipoAportante.value.trim()
    );
  }

  // Panel de reportes: mostrar/ocultar
  public abrirPanelReporte(idAporte: number): void {
    this.lblReporteSobre.textContent = idAporte.toString().padStart(3, "0");
    this.inpReporte.value = "";
    this.panelReporte.classList.remove("hidden");
  }

  public cerrarPanelReporte(): void {
    this.panelReporte.classList.add("hidden");
  }
}
