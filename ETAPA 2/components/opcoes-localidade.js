import { LOCALIDADES } from '@/lib/localidades';

/**
 * `<option>`s dos selects de localidade (Comparar e Mapa).
 */
export default function OpcoesLocalidade() {
  return LOCALIDADES.map((localidade) => (
    <option key={localidade} value={localidade}>{localidade}</option>
  ));
}
