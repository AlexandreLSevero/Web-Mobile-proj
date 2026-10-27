import Link from 'next/link';
import estilos from './cabecalho.module.css';

/**
 * Cabeçalho comum às 4 telas. A marca é sempre um link para a tela inicial, em forma de
 * botão; na própria tela inicial ele é marcado como página atual.
 *
 * @param {{titulo: string, descricao?: string, naInicio?: boolean}} props
 */
export default function Cabecalho({ titulo, descricao, naInicio = false }) {
  return (
    <header className={estilos.cabecalho}>
      <p className={estilos.cabecalho__marca}>
        <Link href="/" {...(naInicio ? { 'aria-current': 'page' } : { rel: 'prev' })}>ClimaMonitor</Link>
      </p>
      <h1 className={estilos.cabecalho__titulo}>{titulo}</h1>
      {descricao && <p className={estilos.cabecalho__descricao}>{descricao}</p>}
    </header>
  );
}
