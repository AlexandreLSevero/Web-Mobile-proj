import Cabecalho from '@/components/cabecalho';
import Navegacao from '@/components/navegacao';
import Rodape from '@/components/rodape';
import MapaLocalidades from '@/components/mapa-localidades';

export const metadata = {
  title: 'Mapa das localidades',
};

export default function PaginaMapa() {
  return (
    <>
      <Cabecalho titulo="Mapa das localidades" />
      <Navegacao atual="/mapa" />

      <main className="conteudo">
        <MapaLocalidades />
        <p>A visualização espacial reforça a leitura do impacto no ambiente urbano (ODS 11).</p>
      </main>

      <Rodape>Projeto de extensão · ODS 11 e 13 · dados ilustrativos.</Rodape>
    </>
  );
}
