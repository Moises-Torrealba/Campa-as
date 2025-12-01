import { CL_mAporte } from "./CL_mAporte.js";

export default class CL_mDecanato {

  private listaAportes: CL_mAporte[] = [];

  constructor(datosIniciales: CL_mAporte[] = []) {
    this.listaAportes = datosIniciales;
  }

  public registrarAporte(ap: CL_mAporte): void {
    const indice = this.listaAportes.findIndex(a => a.id === ap.id);
    if (indice >= 0) {
      this.listaAportes[indice] = ap;
    } else {
      this.listaAportes.push(ap);
    }
  }

  public eliminarAporte(id: number): void {
    this.listaAportes = this.listaAportes.filter(a => a.id !== id);
  }

  public buscarPorId(id: number): CL_mAporte | undefined {
    return this.listaAportes.find(a => a.id === id);
  }

  public contarTotal(): number {
    return this.listaAportes.length;
  }

  public obtenerTodos(): CL_mAporte[] {
    return this.listaAportes;
  }
}
