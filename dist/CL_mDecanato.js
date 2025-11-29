export class CL_mDecanato {
    constructor(datosIniciales = []) {
        this.listaAportes = [];
        this.listaAportes = datosIniciales;
    }
    registrarAporte(ap) {
        const indice = this.listaAportes.findIndex(a => a.id === ap.id);
        if (indice >= 0) {
            this.listaAportes[indice] = ap;
        }
        else {
            this.listaAportes.push(ap);
        }
    }
    eliminarAporte(id) {
        this.listaAportes = this.listaAportes.filter(a => a.id !== id);
    }
    buscarPorId(id) {
        return this.listaAportes.find(a => a.id === id);
    }
    contarTotal() {
        return this.listaAportes.length;
    }
    obtenerTodos() {
        return this.listaAportes;
    }
}
