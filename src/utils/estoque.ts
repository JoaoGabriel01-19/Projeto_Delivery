export interface AvaliarEstoqueInput {
  nomeProduto: string;
  quantidadeAtual: number;
  estoqueMinimo: number;
  tamanhoLote: number;
}

export class GestorEstoque {
  avaliarNecessidadeReposicao({
    nomeProduto,
    quantidadeAtual,
    estoqueMinimo,
    tamanhoLote
  }: AvaliarEstoqueInput): string {

    if (quantidadeAtual <= estoqueMinimo) {
      const quantidadeNecessaria =
        (estoqueMinimo * 2) - quantidadeAtual;

      const quantidadeLotes = Math.ceil(
        quantidadeNecessaria / tamanhoLote
      );

      return `[ESTOQUE ALERTA] Produto: ${nomeProduto} | Atual: ${quantidadeAtual} | Sugestão de Compra: ${quantidadeLotes} lote(s)`;
    }

    return `[ESTOQUE OK] Produto: ${nomeProduto} | Nível seguro (${quantidadeAtual} un)`;
  }
}