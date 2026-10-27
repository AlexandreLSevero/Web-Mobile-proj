import Rodape from '@/components/rodape';
import ResultadoComparacao from '@/components/resultado-comparacao';

export const metadata = {
  title: 'Resultado da comparação',
};

// O cabeçalho desta tela depende da comparação salva no navegador, por isso fica dentro de
// ResultadoComparacao (Client) em vez de aqui.
export default function PaginaResultado() {
  return (
    <>
      <ResultadoComparacao />
      <Rodape>Valores: média normalizada de várias APIs meteorológicas. Dados ilustrativos.</Rodape>
    </>
  );
}
