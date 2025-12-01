import { Controlador } from "./CL_controlador.js";
import { DATA_APORTES_INICIAL } from "./data.js";
import { CL_mAporte } from "./CL_mAporte.js";
const STORAGE_KEY = "campanas_aportes_v1";
function saveAportes(aportes) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(aportes));
    }
    catch (e) {
        console.warn("No se pudo guardar en localStorage:", e);
    }
}
function loadAportes() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return null;
        const parsed = JSON.parse(raw);
        return parsed.map(p => new CL_mAporte(p.id, p.fechaAporte, p.tipoAporte, p.descripcion, p.montoAporte, p.nombreAporte, p.tipoAportante));
    }
    catch (e) {
        console.warn("No se pudo leer/parsear localStorage:", e);
        return null;
    }
}
function clearAportes() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    }
    catch (e) {
        console.warn("No se pudo limpiar localStorage:", e);
    }
}
// Inicializa la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const almacen = loadAportes();
    const inicial = almacen !== null && almacen !== void 0 ? almacen : DATA_APORTES_INICIAL;
    const controlador = new Controlador(inicial, (aportes) => {
        saveAportes(aportes);
    });
    // Exponer utilidad de limpieza desde la consola si se necesita
    window.clearAportes = () => {
        clearAportes();
        location.reload();
    };
});
document.addEventListener("DOMContentLoaded", () => {
    const almacen = loadAportes();
    const inicial = almacen !== null && almacen !== void 0 ? almacen : DATA_APORTES_INICIAL;
    const controlador = new Controlador(inicial, (aportes) => {
        saveAportes(aportes);
    });
    // Exponer utilidad de limpieza desde la consola si se necesita
    window.clearAportes = () => {
        clearAportes();
        location.reload();
    };
});
