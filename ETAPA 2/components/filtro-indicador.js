'use client';

import estilos from './filtro-indicador.module.css';

export const INDICADORES_FILTRO = [
  { valor: 'geral', rotulo: 'Geral' },
  { valor: 'temperatura', rotulo: 'Temperatura' },
  { valor: 'chuva', rotulo: 'Chuva' },
  { valor: 'umidade', rotulo: 'Umidade' },
  { valor: 'vento', rotulo: 'Vento' },
];

/**
 * Filtro "Comparar por indicador" da tela Resultado (ideacao.md §5.9). Controlado: quem
 * renderiza os painéis guarda o indicador marcado e esconde os demais.
 *
 * @param {{valor: string, aoMudar: (indicador: string) => void}} props
 */
export default function FiltroIndicador({ valor, aoMudar }) {
  return (
    <fieldset className={estilos['filtro-indicador']}>
      <legend className={estilos['filtro-indicador__legenda']}>Comparar por</legend>
      <div className={estilos['filtro-indicador__lista']}>
        {INDICADORES_FILTRO.map((opcao) => (
          <label key={opcao.valor} className={estilos['filtro-indicador__opcao']}>
            <input
              type="radio"
              name="indicador"
              value={opcao.valor}
              checked={valor === opcao.valor}
              onChange={() => aoMudar(opcao.valor)}
            />
            {' '}{opcao.rotulo}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
