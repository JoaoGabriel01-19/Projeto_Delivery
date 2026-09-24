export interface ProcessarTurnoInput {
  nomeAtacante: string;
  nomeDefensor: string;
  danoAtaque: number;
  defesaDefensor: number;
  ehGolpeCritico: boolean;
}

export class GerenciadorBatalha {
  processarTurno({
    nomeAtacante,
    nomeDefensor,
    danoAtaque,
    defesaDefensor,
    ehGolpeCritico
  }: ProcessarTurnoInput): string {

    const danoComAtaque = ehGolpeCritico
      ? danoAtaque * 2
      : danoAtaque;

    const danoAplicado = Math.max(
      0,
      danoComAtaque - defesaDefensor
    );

    const tipoAtaque = ehGolpeCritico
      ? "🔥 CRÍTICO!"
      : "⚔️ Ataque Normal";

    return `[BATALHA] ${nomeAtacante} atacou ${nomeDefensor} (${tipoAtaque}) -> Dano: ${danoAplicado} HP`;
  }
}