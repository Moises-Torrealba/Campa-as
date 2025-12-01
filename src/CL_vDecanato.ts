import { CL_mAporte, TipoAporte } from "./CL_mAporte.js";

export default class CL_vDecanato {

  public lblTotal = document.getElementById("lbl-total-aportes") as HTMLSpanElement;
  public contenedorLista = document.getElementById("lista-aportes") as HTMLTableSectionElement;
  public modal = document.getElementById("modal-aporte") as HTMLDivElement;

  // Inputs del formulario
  public inpId = document.getElementById("inp-id") as HTMLInputElement;
  public inpFechaAporte = document.getElementById("inp-fecha-aporte") as HTMLInputElement;
  public inpTipoAporte = document.getElementById("inp-tipo-aporte") as HTMLSelectElement;
  public inpDescripcion = document.getElementById("inp-descripcion") as HTMLInputElement;
  public inpMontoAporte = document.getElementById("inp-monto-aporte") as HTMLInputElement;
  public inpNombreAporte = document.getElementById("inp-nombre-aporte") as HTMLInputElement;
  public inpTipoAportante = document.getElementById("inp-tipo-aportante") as HTMLInputElement;

  // Botones principales
  public btnMostrarForm = document.getElementById("btn-mostrar-form-aporte") as HTMLButtonElement;
  public btnAceptar = document.getElementById("btn-aceptar-aporte") as HTMLButtonElement;
  public btnEliminarCancelar = document.getElementById("btn-eliminar-cancelar-aporte") as HTMLButtonElement;

  // Filtros
  public filtroTipoDonador = document.getElementById("filtro-tipo-donador") as HTMLSelectElement;
  public filtroMontoMin = document.getElementById("filtro-monto-min") as HTMLInputElement;

  public modoEdicion: boolean = false;

  public abrirModal(limpiar: boolean = true): void {
    this.modal.classList.remove("hidden");
    if (limpiar) {
      this.limpiarInputs();
      this.inpId.disabled = false;
      this.modoEdicion = false;
      this.btnEliminarCancelar.textContent = "✖ Cancelar";
    } else {
      this.btnEliminarCancelar.textContent = "✖ Eliminar";
    }
  }

  public cerrarModal(): void {
    this.modal.classList.add("hidden");
  }

  public limpiarInputs(): void {
    this.inpId.value = "";
    this.inpFechaAporte.value = "";
    this.inpTipoAporte.value = "Efectivo";
    this.inpDescripcion.value = "";
    this.inpMontoAporte.value = "";
    this.inpNombreAporte.value = "";
    this.inpTipoAportante.value = "";
  }

  // Pinta la tabla con la data
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
          <button class="btn-editar-aporte" data-id="${ap.id}">Editar</button>
        </td>
      `;
      this.contenedorLista.appendChild(tr);
    });
  }

  public cargarDatosEnInputs(ap: CL_mAporte): void {
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
}
