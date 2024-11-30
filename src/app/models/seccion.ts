export interface Seccion {

    idseccion: number;
    orden: number;
    type: number;
    idpadre: number;
    title: string;
    content: string;
    subsecciones: Seccion[];
    cuentaMayor: any;

}
