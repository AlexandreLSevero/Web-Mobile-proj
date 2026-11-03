/**
 * `<option>`s dos selects de localidade (Comparar e Mapa).
 *
 * @param {{localidades: Array<{slug: string, selecionada: string}>}} props - lista vinda de
 *   `listarLocalidades()` (`lib/cliente-api.js`).
 */
export default function OpcoesLocalidade({ localidades }) {
  return localidades.map(({ slug, selecionada }) => (
    <option key={slug} value={selecionada}>{selecionada}</option>
  ));
}
