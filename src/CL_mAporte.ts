export type TipoAporte = "Efectivo" | "Especie";

export  class CL_mAporte {
  constructor(
    public id: number,              // número de aporte
    public fechaAporte: string,     // fecha
    public tipoAporte: TipoAporte,  // Efectivo / Especie
    public descripcion: string,     // descripción
    public montoAporte: number,     // monto
    public nombreAporte: string,    // donador
    public tipoAportante: string    // tipo de donador
  ) {}
}
