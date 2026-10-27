import './globals.css';

export const metadata = {
  title: {
    template: '%s — ClimaMonitor',
    default: 'ClimaMonitor',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
