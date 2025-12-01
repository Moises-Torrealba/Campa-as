import CL_mDecanato  from "./CL_mDecanato.js";
import CL_vDecanato  from "./CL_vDecanato.js";
import { DATA_APORTES_INICIAL } from "./data.js";
import { CL_mAporte } from "./CL_mAporte.js";

export class Controlador {

  private decanato: CL_mDecanato;
  private vista: CL_vDecanato;
  private onChange?: (aportes: CL_mAporte[]) => void;

  constructor(initialData?: CL_mAporte[], onChange?: (aportes: CL_mAporte[]) => void) {
    // Recibir datos iniciales desde afuera (index.ts) y un callback para persistir cambios
    this.onChange = onChange;
    this.decanato = new CL_mDecanato(initialData ?? DATA_APORTES_INICIAL);
    this.vista = new CL_vDecanato();
    this.setupEventListeners();
    this.updateUI();
  }

  private setupEventListeners(): void {
    this.vista.btnMostrarForm.addEventListener("click", () => {
      this.vista.abrirModal(true);
    });

    this.vista.btnAceptar.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleAceptar();
    });

    this.vista.btnEliminarCancelar.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleEliminarCancelar();
    });

    this.vista.contenedorLista.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains("btn-editar-aporte")) {
        const idStr = target.getAttribute("data-id");
        if (idStr) {
          this.handleEditar(parseInt(idStr));
        }
      }
    });

    // Filtros
    this.vista.filtroTipoDonador.addEventListener("change", () => {
      this.updateUI();
    });

    this.vista.filtroMontoMin.addEventListener("input", () => {
      this.updateUI();
    });
  }

  private handleAceptar(): void {
    const nuevoAp = this.vista.obtenerDatosDeInputs();
    if (nuevoAp === null) {
      alert("Error: completa todos los campos requeridos.");
      return;
    }

    this.decanato.registrarAporte(nuevoAp);
    // Notificar cambios (index.ts gestiona la persistencia)
    if (this.onChange) this.onChange(this.decanato.obtenerTodos());
    this.vista.cerrarModal();
    this.updateUI();
  }

  private handleEliminarCancelar(): void {
    if (this.vista.modoEdicion) {
      const id = parseInt(this.vista.inpId.value);
      this.decanato.eliminarAporte(id);
      if (this.onChange) this.onChange(this.decanato.obtenerTodos());
      alert(`Aporte con id ${id} eliminado.`);
    }
    this.vista.cerrarModal();
    this.updateUI();
  }

  private handleEditar(id: number): void {
    const ap = this.decanato.buscarPorId(id);
    if (ap) {
      this.vista.cargarDatosEnInputs(ap);
    }
  }

  private updateUI(): void {
    const todos = this.decanato.obtenerTodos();

    const tipoFiltro = this.vista.filtroTipoDonador.value;      // "Todos", "Natural", "Jurídico"
    const montoMinStr = this.vista.filtroMontoMin.value;

    let montoMin: number | null = null;
    if (montoMinStr.trim() !== "") {
      const val = parseFloat(montoMinStr);
      if (!isNaN(val) && val >= 0) {
        montoMin = val;
      }
    }

    let filtrados = todos;

    if (tipoFiltro !== "Todos") {
      filtrados = filtrados.filter(ap => ap.tipoAportante === tipoFiltro);
    }

    if (montoMin !== null) {
      const min = montoMin;
      filtrados = filtrados.filter(ap => ap.montoAporte >= min);
    }

    const total = filtrados.length;
    this.vista.actualizarLista(filtrados, total);
  }
}
