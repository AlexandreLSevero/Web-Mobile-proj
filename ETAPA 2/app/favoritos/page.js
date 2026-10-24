import Link from 'next/link';
import Cabecalho from '@/components/cabecalho';
import Navegacao from '@/components/navegacao';
import Rodape from '@/components/rodape';
import ListaFavoritos from '@/components/lista-favoritos';
import estilos from '@/components/lista-favoritos.module.css';

export const metadata = {
  title: 'Favoritos',
};

export default function PaginaFavoritos() {
  return (
    <>
      <Cabecalho
        titulo="Minhas comparações"
        descricao="Pares de localidades salvos neste dispositivo. Não é necessário ter conta."
      />
      <Navegacao atual="/favoritos" />

      <main className="conteudo">
        <ListaFavoritos />
        <p className={estilos['favoritos__nova']}><Link href="/">Nova comparação</Link></p>
      </main>

      <Rodape>Projeto de extensão · ODS 11 e 13 · dados ilustrativos.</Rodape>
    </>
  );
}
