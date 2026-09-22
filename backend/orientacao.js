/**
 * Geração da orientação por localidade (ideacao.md §5.8), no formato que
 * `JS/inicializar-resultado.js` já lê hoje: um `{ tipo, mensagem }` por localidade, não um
 * campo único no topo da resposta.
 *
 * Os textos reaproveitam exatamente as mensagens já usadas em `JS/dados-mock.js` para
 * cada combinação (tipo, classificação); "Alerta"/"Crítico" de temperatura não existiam
 * no mock (nenhum cenário ilustrativo chegava lá) e foram escritos aqui seguindo o mesmo
 * tom crescente dos demais indicadores.
 */

const MENSAGENS = {
  NORMAL: {
    Normal: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.',
  },
  CHUVA: {
    'Atenção': 'Atenção para chuva: o volume de precipitação está elevado. Recomenda-se atenção em áreas sujeitas a alagamentos e acompanhamento dos canais oficiais.',
    Alerta: 'Alerta de chuva forte: risco de alagamentos e pontos de lentidão. Evite áreas de baixada e acompanhe a Defesa Civil.',
    'Crítico': 'Condição crítica de chuva: volume muito acima do normal, com risco elevado de alagamentos. Evite áreas de risco e siga as orientações da Defesa Civil.',
  },
  VENTO: {
    'Atenção': 'Atenção ao vento: rajadas podem dificultar deslocamentos, principalmente de ciclistas e motociclistas.',
    Alerta: 'Alerta de vento forte: evite áreas com árvores e estruturas soltas; atenção redobrada em deslocamentos.',
    'Crítico': 'Condição crítica de vento: rajadas muito fortes podem causar queda de galhos e risco a pedestres. Evite áreas abertas e fique atento a comunicados.',
  },
  TEMPERATURA: {
    'Atenção': 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.',
    Alerta: 'Alerta de calor intenso: evite atividades físicas ao ar livre e mantenha-se hidratado, especialmente nos horários de sol forte.',
    'Crítico': 'Condição crítica de calor: risco de mal-estar e desidratação. Evite exposição ao sol, hidrate-se constantemente e procure locais frescos.',
  },
};

/**
 * Escolhe o tipo de orientação: o indicador de maior risco entre chuva/vento/temperatura
 * quando a classificação não é "Normal" (umidade não tem orientação própria — ela entra
 * só como peso do índice, ideacao.md §5.7).
 *
 * @param {{temperatura: number, umidade: number, chuva: number, vento: number}} riscos
 * @returns {'CHUVA'|'VENTO'|'TEMPERATURA'}
 */
function escolherTipo(riscos) {
  const candidatos = ['chuva', 'vento', 'temperatura'];
  const maior = candidatos.reduce((a, b) => (riscos[b] > riscos[a] ? b : a));
  return maior.toUpperCase();
}

/**
 * Gera a orientação de uma localidade a partir da classificação e dos riscos calculados.
 *
 * @param {'Normal'|'Atenção'|'Alerta'|'Crítico'} classificacao
 * @param {{temperatura: number, umidade: number, chuva: number, vento: number}} riscos
 * @returns {{tipo: string, mensagem: string}}
 */
export function gerarOrientacao(classificacao, riscos) {
  if (classificacao === 'Normal') {
    return { tipo: 'NORMAL', mensagem: MENSAGENS.NORMAL.Normal };
  }
  const tipo = escolherTipo(riscos);
  return { tipo, mensagem: MENSAGENS[tipo][classificacao] };
}
