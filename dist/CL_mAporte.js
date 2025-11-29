export class CL_mAporte {
    constructor(id, // número de aporte
    fechaAporte, // fecha
    tipoAporte, // Efectivo / Especie
    descripcion, // descripción
    montoAporte, // monto
    nombreAporte, // donador
    tipoAportante // tipo de donador
    ) {
        this.id = id;
        this.fechaAporte = fechaAporte;
        this.tipoAporte = tipoAporte;
        this.descripcion = descripcion;
        this.montoAporte = montoAporte;
        this.nombreAporte = nombreAporte;
        this.tipoAportante = tipoAportante;
    }
}
