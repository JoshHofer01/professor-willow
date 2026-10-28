export function weServTransformURL(
  url: string,
  imageType: "dashboardImage" | "eventDetailsImage" | "popoutImage" | "eventCardImage" | "pokedexImage" | "pokemonDetailsImage",
) {
  const urlPrefix: string = "https://wsrv.nl/?url=";
  const urlSuffix: string = "&output=webp";

  const desktopImgSizeMap: Record<string, number> = {
    "dashboardImage": 800,
    "eventDetailsImage": 1000,
    "popoutImage": 600,
    "eventCardImage": 350,
    "pokedexImage": 100,
    "pokemonDetailsImage": 180,
};

  const width = desktopImgSizeMap[imageType];
  // Encode so a source URL with its own ?, & or # can't break the query.
  return `${urlPrefix}${encodeURIComponent(url)}&w=${width}${urlSuffix}`;
}
