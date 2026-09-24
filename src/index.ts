import { GerenciadorBatalha } from "./utils/batalha";
import { CalculadoraDelivery } from "./utils/delivery";
import { ProcessadorPix } from "./utils/banco";
import { GestorEmprestimos } from "./utils/biblioteca";
import { GestorEstoque } from "./utils/estoque";

const batalha = new GerenciadorBatalha();

console.log(
  batalha.processarTurno({
    nomeAtacante: "Guerreiro",
    nomeDefensor: "Orc",
    danoAtaque: 40,
    defesaDefensor: 15,
    ehGolpeCritico: true
  })
);


const delivery = new CalculadoraDelivery();

console.log(
  delivery.calcularEntrega({
    distanciaKm: 8,
    valorPedido: 80,
    estaChovendo: true
  })
);


const pix = new ProcessadorPix();

console.log(
  pix.processarCobranca({
    nomeEmpresa: "Tech Store",
    valorTransacao: 1000,
    tipoChave: "CNPJ",
    ehClientePremium: true
  })
);


const biblioteca = new GestorEmprestimos();

console.log(
  biblioteca.calcularPrazoDevolucao({
    tituloLivro: "Dom Casmurro",
    diasPadrao: 14,
    ehEstudante: true,
    diasAtrasoAnterior: 3
  })
);


const estoque = new GestorEstoque();

console.log(
  estoque.avaliarNecessidadeReposicao({
    nomeProduto: "Arroz",
    quantidadeAtual: 10,
    estoqueMinimo: 20,
    tamanhoLote: 10
  })
);