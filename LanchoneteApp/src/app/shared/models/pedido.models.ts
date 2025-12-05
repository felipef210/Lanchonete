import { StatusPedidoEnum } from "../enums/StatusPedidoEnum";

export interface PedidoDto {
  id: string;
  cliente: string;
  dataHora: Date;
  status: StatusPedidoEnum;
  itens: ItemPedidoDto[];
  total: number;
}

export interface ItemPedidoDto {
  produtoId?: string;
  produtoNome: string;
  produtoPreco: number;
  quantidade: number;
}

