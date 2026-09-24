export interface ProcessarCobrancaPixInput {
  nomeEmpresa: string;
  valorTransacao: number;
  tipoChave: string;
  ehClientePremium: boolean;
}

export class ProcessadorPix {
  processarCobranca({
    nomeEmpresa,
    valorTransacao,
    tipoChave,
    ehClientePremium
  }: ProcessarCobrancaPixInput): string {

    const percentualTaxa = ehClientePremium ? 0.005 : 0.015;

    const valorTaxa = valorTransacao * percentualTaxa;

    const valorLiquido = valorTransacao - valorTaxa;

    return `[PIX GATEWAY] Empresa: ${nomeEmpresa} | Bruto: R$ ${valorTransacao.toFixed(2)} | Taxa: R$ ${valorTaxa.toFixed(2)} | Líquido Repassado: R$ ${valorLiquido.toFixed(2)}`;
  }
}