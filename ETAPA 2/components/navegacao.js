import Link from 'next/link';
import estilos from './navegacao.module.css';

const ITENS = [
  { href: '/', rotulo: 'Comparar' },
  { href: '/mapa', rotulo: 'Mapa' },
  { href: '/favoritos', rotulo: 'Favoritos' },
];

/**
 * Navegação principal. `atual` é a rota da tela aberta (a Resultado não tem item próprio).
 *
 * @param {{atual?: string}} props
 */
export default function Navegacao({ atual }) {
  return (
    <nav className={estilos['nav-principal']} aria-label="Seções do aplicativo">
      {ITENS.map(({ href, rotulo }) => (
        <Link key={href} href={href} aria-current={href === atual ? 'page' : undefined}>
          {rotulo}
        </Link>
      ))}
    </nav>
  );
}
