/**
 * @param {{children: React.ReactNode}} props - texto do rodapé, que muda por tela.
 */
export default function Rodape({ children }) {
  return (
    <footer className="rodape">
      <p>
        <small>{children}</small>
      </p>
    </footer>
  );
}
