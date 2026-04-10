export function getPkmnImgUrl(dexNr: number, isShiny?: boolean) {
  const base = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  return isShiny ? `${base}/shiny/${dexNr}.png` : `${base}/${dexNr}.png`;
}
