/**
 * Dados mock de leituras climáticas por localidade (ClimaMonitor).
 *
 * Enquanto o backend `POST /comparar` (ideacao.md §5.4) não existe, este módulo simula
 * a resposta que ele traria: para cada localidade oferecida em `HTML/index.html`, há um
 * pequeno conjunto de leituras ilustrativas no formato do contrato (ideacao.md §5.6), já
 * com `indice`, `classificacao` e `orientacao` prontos. O front não recalcula pesos do
 * índice climático nem escreve textos de orientação — isso é regra de negócio do backend
 * (ver JS/CLAUDE.md "Rede e dados").
 */

const LEITURAS_MOCK = {
  'São Paulo, SP': [
    { temperatura: 22.4, umidade: 68, chuva: 2.0, vento: 14.5, indice: 18, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 24.3, umidade: 78, chuva: 12.5, vento: 18.2, indice: 58, classificacao: 'Atenção',
      orientacao: { tipo: 'CHUVA', mensagem: 'Atenção para chuva: o volume de precipitação está elevado. Recomenda-se atenção em áreas sujeitas a alagamentos e acompanhamento dos canais oficiais.' } },
    { temperatura: 29.8, umidade: 55, chuva: 0.0, vento: 10.0, indice: 34, classificacao: 'Atenção',
      orientacao: { tipo: 'TEMPERATURA', mensagem: 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.' } },
    { temperatura: 19.5, umidade: 82, chuva: 28.4, vento: 32.6, indice: 74, classificacao: 'Alerta',
      orientacao: { tipo: 'CHUVA', mensagem: 'Alerta de chuva forte: risco de alagamentos e pontos de lentidão. Evite áreas de baixada e acompanhe a Defesa Civil.' } },
    { temperatura: 17.2, umidade: 90, chuva: 45.0, vento: 48.3, indice: 88, classificacao: 'Crítico',
      orientacao: { tipo: 'VENTO', mensagem: 'Condição crítica: chuva volumosa combinada a rajadas fortes de vento. Evite deslocamentos desnecessários e fique atento a comunicados oficiais.' } },
  ],
  'Rio de Janeiro, RJ': [
    { temperatura: 26.5, umidade: 65, chuva: 0.0, vento: 12.0, indice: 22, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 29.1, umidade: 72, chuva: 3.2, vento: 21.0, indice: 25, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; nenhum cuidado especial é necessário no momento.' } },
    { temperatura: 33.4, umidade: 58, chuva: 0.0, vento: 9.5, indice: 42, classificacao: 'Atenção',
      orientacao: { tipo: 'TEMPERATURA', mensagem: 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.' } },
    { temperatura: 27.8, umidade: 85, chuva: 38.6, vento: 26.4, indice: 71, classificacao: 'Alerta',
      orientacao: { tipo: 'CHUVA', mensagem: 'Alerta de chuva forte: risco de alagamentos e pontos de lentidão. Evite áreas de baixada e acompanhe a Defesa Civil.' } },
    { temperatura: 30.2, umidade: 88, chuva: 52.3, vento: 40.1, indice: 90, classificacao: 'Crítico',
      orientacao: { tipo: 'CHUVA', mensagem: 'Condição crítica de chuva: volume muito acima do normal, com risco elevado de alagamentos. Evite áreas de risco e siga as orientações da Defesa Civil.' } },
  ],
  'Belo Horizonte, MG': [
    { temperatura: 20.1, umidade: 60, chuva: 0.0, vento: 8.4, indice: 14, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 23.6, umidade: 70, chuva: 9.8, vento: 13.2, indice: 36, classificacao: 'Atenção',
      orientacao: { tipo: 'CHUVA', mensagem: 'Atenção para chuva: pancadas podem se intensificar à tarde. Fique atento ao trânsito e a pontos de alagamento.' } },
    { temperatura: 28.9, umidade: 48, chuva: 0.0, vento: 11.0, indice: 39, classificacao: 'Atenção',
      orientacao: { tipo: 'TEMPERATURA', mensagem: 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.' } },
    { temperatura: 18.4, umidade: 80, chuva: 24.7, vento: 29.5, indice: 66, classificacao: 'Alerta',
      orientacao: { tipo: 'CHUVA', mensagem: 'Alerta de chuva forte: risco de alagamentos e pontos de lentidão. Evite áreas de baixada e acompanhe a Defesa Civil.' } },
    { temperatura: 16.0, umidade: 86, chuva: 41.2, vento: 35.0, indice: 83, classificacao: 'Crítico',
      orientacao: { tipo: 'CHUVA', mensagem: 'Condição crítica de chuva: volume muito acima do normal, com risco elevado de alagamentos. Evite áreas de risco e siga as orientações da Defesa Civil.' } },
  ],
  'Curitiba, PR': [
    { temperatura: 15.2, umidade: 75, chuva: 1.0, vento: 16.0, indice: 20, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 12.8, umidade: 82, chuva: 6.5, vento: 24.3, indice: 41, classificacao: 'Atenção',
      orientacao: { tipo: 'VENTO', mensagem: 'Atenção ao vento: rajadas podem dificultar deslocamentos, principalmente de ciclistas e motociclistas.' } },
    { temperatura: 9.4, umidade: 88, chuva: 14.2, vento: 31.0, indice: 63, classificacao: 'Alerta',
      orientacao: { tipo: 'VENTO', mensagem: 'Alerta de vento forte: evite áreas com árvores e estruturas soltas; atenção redobrada em deslocamentos.' } },
    { temperatura: 7.1, umidade: 91, chuva: 22.0, vento: 45.6, indice: 79, classificacao: 'Alerta',
      orientacao: { tipo: 'VENTO', mensagem: 'Alerta de vento forte: evite áreas com árvores e estruturas soltas; atenção redobrada em deslocamentos.' } },
    { temperatura: 5.0, umidade: 94, chuva: 35.5, vento: 58.2, indice: 92, classificacao: 'Crítico',
      orientacao: { tipo: 'VENTO', mensagem: 'Condição crítica de vento: rajadas muito fortes podem causar queda de galhos e risco a pedestres. Evite áreas abertas e fique atento a comunicados.' } },
  ],
  'Porto Alegre, RS': [
    { temperatura: 18.6, umidade: 64, chuva: 0.5, vento: 19.0, indice: 24, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 14.3, umidade: 79, chuva: 11.0, vento: 28.4, indice: 47, classificacao: 'Atenção',
      orientacao: { tipo: 'VENTO', mensagem: 'Atenção ao vento: rajadas podem dificultar deslocamentos, principalmente de ciclistas e motociclistas.' } },
    { temperatura: 31.2, umidade: 50, chuva: 0.0, vento: 15.2, indice: 37, classificacao: 'Atenção',
      orientacao: { tipo: 'TEMPERATURA', mensagem: 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.' } },
    { temperatura: 11.7, umidade: 85, chuva: 26.8, vento: 52.0, indice: 70, classificacao: 'Alerta',
      orientacao: { tipo: 'VENTO', mensagem: 'Alerta de vento forte: evite áreas com árvores e estruturas soltas; atenção redobrada em deslocamentos.' } },
    { temperatura: 9.0, umidade: 90, chuva: 48.9, vento: 64.7, indice: 95, classificacao: 'Crítico',
      orientacao: { tipo: 'VENTO', mensagem: 'Condição crítica de vento: rajadas muito fortes podem causar queda de galhos e risco a pedestres. Evite áreas abertas e fique atento a comunicados.' } },
  ],
  'Recife, PE': [
    { temperatura: 27.9, umidade: 70, chuva: 0.0, vento: 13.5, indice: 19, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 29.5, umidade: 80, chuva: 15.6, vento: 17.8, indice: 52, classificacao: 'Atenção',
      orientacao: { tipo: 'CHUVA', mensagem: 'Atenção para chuva: o volume de precipitação está elevado. Recomenda-se atenção em áreas sujeitas a alagamentos e acompanhamento dos canais oficiais.' } },
    { temperatura: 32.0, umidade: 62, chuva: 0.0, vento: 10.4, indice: 44, classificacao: 'Atenção',
      orientacao: { tipo: 'TEMPERATURA', mensagem: 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.' } },
    { temperatura: 26.4, umidade: 89, chuva: 60.3, vento: 22.6, indice: 77, classificacao: 'Alerta',
      orientacao: { tipo: 'CHUVA', mensagem: 'Alerta de chuva forte: risco de alagamentos e pontos de lentidão. Evite áreas de baixada e acompanhe a Defesa Civil.' } },
    { temperatura: 25.8, umidade: 93, chuva: 88.7, vento: 34.9, indice: 96, classificacao: 'Crítico',
      orientacao: { tipo: 'CHUVA', mensagem: 'Condição crítica de chuva: volume muito acima do normal, com risco elevado de alagamentos e deslizamentos. Evite áreas de risco e siga as orientações da Defesa Civil.' } },
  ],
  'Salvador, BA': [
    { temperatura: 26.8, umidade: 72, chuva: 1.2, vento: 15.0, indice: 21, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 28.3, umidade: 81, chuva: 18.4, vento: 19.6, indice: 55, classificacao: 'Atenção',
      orientacao: { tipo: 'CHUVA', mensagem: 'Atenção para chuva: o volume de precipitação está elevado. Recomenda-se atenção em áreas sujeitas a alagamentos e acompanhamento dos canais oficiais.' } },
    { temperatura: 30.6, umidade: 65, chuva: 0.0, vento: 12.8, indice: 33, classificacao: 'Atenção',
      orientacao: { tipo: 'TEMPERATURA', mensagem: 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.' } },
    { temperatura: 25.9, umidade: 87, chuva: 42.1, vento: 27.3, indice: 68, classificacao: 'Alerta',
      orientacao: { tipo: 'CHUVA', mensagem: 'Alerta de chuva forte: risco de alagamentos e pontos de lentidão. Evite áreas de baixada e acompanhe a Defesa Civil.' } },
    { temperatura: 24.7, umidade: 92, chuva: 70.5, vento: 38.0, indice: 89, classificacao: 'Crítico',
      orientacao: { tipo: 'CHUVA', mensagem: 'Condição crítica de chuva: volume muito acima do normal, com risco elevado de alagamentos. Evite áreas de risco e siga as orientações da Defesa Civil.' } },
  ],
  'Manaus, AM': [
    { temperatura: 29.4, umidade: 80, chuva: 4.0, vento: 8.0, indice: 29, classificacao: 'Normal',
      orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; aproveite o dia sem cuidados especiais.' } },
    { temperatura: 31.5, umidade: 85, chuva: 20.3, vento: 10.5, indice: 53, classificacao: 'Atenção',
      orientacao: { tipo: 'CHUVA', mensagem: 'Atenção para chuva: o volume de precipitação está elevado. Recomenda-se atenção em áreas sujeitas a alagamentos e acompanhamento dos canais oficiais.' } },
    { temperatura: 34.2, umidade: 70, chuva: 0.0, vento: 7.2, indice: 48, classificacao: 'Atenção',
      orientacao: { tipo: 'TEMPERATURA', mensagem: 'Atenção ao calor: mantenha-se hidratado e evite exposição prolongada ao sol nos horários mais quentes.' } },
    { temperatura: 28.6, umidade: 91, chuva: 55.8, vento: 16.4, indice: 75, classificacao: 'Alerta',
      orientacao: { tipo: 'CHUVA', mensagem: 'Alerta de chuva forte: risco de alagamentos e pontos de lentidão. Evite áreas de baixada e acompanhe a Defesa Civil.' } },
    { temperatura: 27.3, umidade: 96, chuva: 95.2, vento: 20.1, indice: 98, classificacao: 'Crítico',
      orientacao: { tipo: 'CHUVA', mensagem: 'Condição crítica de chuva: volume muito acima do normal, com risco elevado de alagamentos. Evite áreas de risco e siga as orientações da Defesa Civil.' } },
  ],
};

/**
 * Sorteia uma leitura mock para a localidade selecionada.
 *
 * @param {string} localidadeSelecionada - valor exatamente igual ao de uma `<option>` dos
 *   `<select>` de `HTML/index.html` (ex.: "São Paulo, SP").
 * @returns {object} cópia de uma leitura mock, com `nome` (sem a UF) e `selecionada`
 *   (valor completo escolhido) somados aos indicadores (`temperatura`, `umidade`, `chuva`,
 *   `vento`, `indice`, `classificacao`, `orientacao`).
 * @throws {Error} se não houver dados mock para a localidade informada.
 */
export function sortearLeitura(localidadeSelecionada) {
  const leituras = LEITURAS_MOCK[localidadeSelecionada];
  if (!leituras) {
    throw new Error(`Não há dados mock para a localidade "${localidadeSelecionada}".`);
  }
  const leituraSorteada = leituras[Math.floor(Math.random() * leituras.length)];
  return {
    ...leituraSorteada,
    nome: localidadeSelecionada.split(',')[0].trim(),
    selecionada: localidadeSelecionada,
  };
}
