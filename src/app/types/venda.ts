import { FormaDePagamento } from "./formaDePagamento";
import { Produto } from "./produto";

export interface Venda {
  id: string,
  cliente: string,
  data: Date,
  produtos: Produto[],
  formaDePagamento: FormaDePagamento
}
