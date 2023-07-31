import { UsuarioModel } from "./Usuario.model";

export class CompraModel {
    constructor(
        public idCompra: number,
        public idUsuario: number,
        public valorTotal: number,
        public fecha:Date,
        public Usuario: UsuarioModel
    ) {
    }
}

