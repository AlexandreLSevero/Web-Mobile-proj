import Cabecalho from '@/components/cabecalho';
import Navegacao from '@/components/navegacao';
import Rodape from '@/components/rodape';
import FormularioComparar from '@/components/formulario-comparar';

export const metadata = {
  title: { absolute: 'Comparar clima — ClimaMonitor' },
};

export default function PaginaComparar() {
  return (
    <>
      <Cabecalho titulo="Compare o clima de duas localidades" naInicio />
      <Navegacao atual="/" />

      <main className="conteudo">
        <FormularioComparar />
      </main>

      <Rodape>
        Protótipo estático: os dados exibidos no resultado são mock, sorteados entre
        algumas leituras ilustrativas por localidade. Projeto de extensão · ODS 11 e 13.
      </Rodape>
    </>
  );
}
