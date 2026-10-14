/**
 * Mapeo inteligente de fotografías de profesionales del Policlínico Tabancura
 */

const KNOWN_PHOTO_MAP: Record<string, string> = {
  // Odontología (Dentalink)
  'carolina castillo bombardiere': '/img_profesionales/perfilCarolinaBombardiere.png',
  'carolina fones caballero': '/img_profesionales/perfilCarolinaFones.png',
  'catalina villegas lagos': '/img_profesionales/perfilCatalinaVillegas.jpg',
  'caterina benapres cortes': '/img_profesionales/perfilCaterinaBenapres.jpg',
  'caterina benapres': '/img_profesionales/perfilCaterinaBenapres.jpg',
  'matias enrique navarrete': '/img_profesionales/perfilMatiasNavarrete.jpg',
  'matias navarrete sepulveda': '/img_profesionales/perfilMatiasNavarrete.jpg',
  'matias navarrete': '/img_profesionales/perfilMatiasNavarrete.jpg',
  'loreto torres sanchez': '/img_profesionales/perfilLoretoTorres.jpg',
  'loreto torres': '/img_profesionales/perfilLoretoTorres.jpg',
  'florencia mizala garcia': '/img_profesionales/perfilFlorenciaMizala.jpg',
  'florencia mizala': '/img_profesionales/perfilFlorenciaMizala.jpg',
  'patricia montalva del pozo': '/img_profesionales/perfilPatriciaMontalva_v2.jpg',
  'patricia montalva': '/img_profesionales/perfilPatriciaMontalva_v2.jpg',
  'patricio merino acevedo': '/img_profesionales/perfilPatricioMerino.jpg',
  'patricio merino': '/img_profesionales/perfilPatricioMerino.jpg',
  'daissy mckenzie miranda': '/img_profesionales/perfilDaissyMckenzie.jpg',
  'daissy mckenzie': '/img_profesionales/perfilDaissyMckenzie.jpg',
  'sebastian ortiz mery': '/img_profesionales/perfilSebastianOrtiz.jpg',
  'sebastian ignacio ortiz': '/img_profesionales/perfilSebastianOrtiz.jpg',
  'sebastian ortiz': '/img_profesionales/perfilSebastianOrtiz.jpg',
  'daniela constanza alvarado duarte': '/img_profesionales/perfilDanielaAlvarado.jpg',
  'daniela alvarado': '/img_profesionales/perfilDanielaAlvarado.jpg',
  'felipe valenzuela pinto': '/img_profesionales/perfilFelipeValenzuela.jpg',
  'felipe valenzuela': '/img_profesionales/perfilFelipeValenzuela.jpg',
  'antonio alvear munoz': '/img_profesionales/perfilAntonioAlvear.jpg',
  'antonio alvear': '/img_profesionales/perfilAntonioAlvear.jpg',
  'consuelo olivares ortega': '/img_profesionales/perfilConsueloOlivares.jpg',
  'consuelo olivares': '/img_profesionales/perfilConsueloOlivares.jpg',
  'gardenia saldias ruiz': '/img_profesionales/perfilGardeniaSaldías.jpg',
  'gardenia saldias': '/img_profesionales/perfilGardeniaSaldías.jpg',
  'jorge ramillanca rain': '/img_profesionales/perfilJorgeRamillanca.jpg',
  'jorge ramillanca': '/img_profesionales/perfilJorgeRamillanca.jpg',
  'trinidad sanchez ruiz': '/img_profesionales/perfilTrinidadSanchez.jpg',
  'trinidad sanchez': '/img_profesionales/perfilTrinidadSanchez.jpg',
  'macarena fuenzalida calorio': '/img_profesionales/perfilMacarenaFuenzalida.jpg',
  'macarena andrea fuenzalida': '/img_profesionales/perfilMacarenaFuenzalida.jpg',
  'macarena fuenzalida': '/img_profesionales/perfilMacarenaFuenzalida.jpg',
  'maria soledad iturra lepe': '/img_profesionales/perfilMariaSoledadIturra.jpg',
  'maria soledad iturra': '/img_profesionales/perfilMariaSoledadIturra.jpg',
  'camila del puerto vergara': '/img_profesionales/perfilCamiladelPuerto.jpg',
  'camila andrea del puerto': '/img_profesionales/perfilCamiladelPuerto.jpg',
  'camila del puerto': '/img_profesionales/perfilCamiladelPuerto.jpg',
  'antonia pardo ortileb': '/img_profesionales/perfilAntoniaPardo.jpg',
  'antonia pardo': '/img_profesionales/perfilAntoniaPardo.jpg',
  'josefina maass aviles': '/img_profesionales/perfilJosefinaMass.jpg',
  'josefina mass': '/img_profesionales/perfilJosefinaMass.jpg',
  'carmen gloria mejias matus': '/img_profesionales/perfilCarmenGloriaMejias.jpg',
  'carmen gloria mejias': '/img_profesionales/perfilCarmenGloriaMejias.jpg',
  'david sandoval miranda': '/img_profesionales/perfilDavidSandoval.jpg',
  'david sandoval': '/img_profesionales/perfilDavidSandoval.jpg',
  'grace martinson tejada': '/img_profesionales/perfilGraceMartinson.jpg',
  'grace martinson': '/img_profesionales/perfilGraceMartinson.jpg',
  'pauline heinriksen perez': '/img_profesionales/perfilPaulineHeinriksen.jpg',
  'pauline henriksen': '/img_profesionales/perfilPaulineHeinriksen.jpg',
  'jorge valdes albornoz': '/img_profesionales/perfilJorgeValdes.jpg',
  'jorge valdes': '/img_profesionales/perfilJorgeValdes.jpg',
  'andres horst hampel aljaro': '/img_profesionales/perfilAndresHampel.jpg',
  'andres hampel': '/img_profesionales/perfilAndresHampel.jpg',
  'isidora aspillaga': '/img_profesionales/perfilIsidoraAspillaga.png',

  // Medicina y Especialidades (Medilink)
  'magdalena sofia dooner sepulveda': '/img_profesionales/perfilMagdalena.jpg',
  'magdalena dooner': '/img_profesionales/perfilMagdalena.jpg',
  'magdalena sofia dooner': '/img_profesionales/perfilMagdalena.jpg',
  'laura maria herrera del real': '/img_profesionales/perfilLauraHerrera.jpg',
  'laura herrera': '/img_profesionales/perfilLauraHerrera.jpg',
  'isabel rodriguez legrand': '/img_profesionales/perfilIsabelRodriguez.jpg',
  'isabel rodriguez': '/img_profesionales/perfilIsabelRodriguez.jpg',
  'valentina maria briseno ossandon': '/img_profesionales/perfilValentinaBriseño.jpg',
  'valentina briseno': '/img_profesionales/perfilValentinaBriseño.jpg',
  'isidora fernanda luengo larrain': '/img_profesionales/perfilIsidoraLuengo.jpg',
  'isidora luengo': '/img_profesionales/perfilIsidoraLuengo.jpg',
  'carola poblete plaza': '/img_profesionales/perfilCarolaPoblete.jpg',
  'carola poblete': '/img_profesionales/perfilCarolaPoblete.jpg',
  'sergio enrique parada escobar': '/img_profesionales/perfilSergioParada.jpg',
  'sergio parada': '/img_profesionales/perfilSergioParada.jpg',
  'carla andrea mazzarelli rodriguez': '/img_profesionales/perfilCarlaMazzarelli.jpg',
  'carla mazzarelli': '/img_profesionales/perfilCarlaMazzarelli.jpg',
  'catalina rojas campillo': '/img_profesionales/perfilCatalinaRojas.jpg',
  'catalina rojas': '/img_profesionales/perfilCatalinaRojas.jpg',
  'teresita covarrubias correa': '/img_profesionales/perfilTeresaCovarrubias.jpg',
  'teresa covarrubias': '/img_profesionales/perfilTeresaCovarrubias.jpg',
  'marcela burgos diaz': '/img_profesionales/perfilMarcelaBurgos.jpg',
  'marcela burgos': '/img_profesionales/perfilMarcelaBurgos.jpg',
  'francisca cisternas lira': '/img_profesionales/perfilFranciscaLira.jpg',
  'francisca lira': '/img_profesionales/perfilFranciscaLira.jpg',
  'maria jose garcia domenech': '/img_profesionales/perfilMariaJoseDomenech.jpg',
  'maria jose domenech': '/img_profesionales/perfilMariaJoseDomenech.jpg',
  'carola munoz olate': '/img_profesionales/perfilCarolaMuñoz.jpg',
  'carola munoz': '/img_profesionales/perfilCarolaMuñoz.jpg',
  'catalina aris faundez': '/img_profesionales/perfilCatalinaAris.jpg',
  'catalina aris': '/img_profesionales/perfilCatalinaAris.jpg',
  'jaime correa dominguez': '/img_profesionales/perfilJaimeCorrea.jpg',
  'jaime correa': '/img_profesionales/perfilJaimeCorrea.jpg',
  'pablo santa cruz guzman': '/img_profesionales/perfilPabloSantaCruz.jpg',
  'pablo santa cruz': '/img_profesionales/perfilPabloSantaCruz.jpg',
  'ines armstrong cox': '/img_profesionales/perfilInesArtmstrong.jpg',
  'ines armstrong': '/img_profesionales/perfilInesArtmstrong.jpg',
  'maria ximena olivares diaz': '/img_profesionales/perfilXimenaOlivares.jpg',
  'ximena olivares': '/img_profesionales/perfilXimenaOlivares.jpg',
  'cristian prado jara': '/img_profesionales/perfilCristianPrado.jpg',
  'cristian prado': '/img_profesionales/perfilCristianPrado.jpg',
  'gloria reti malusa': '/img_profesionales/perfilGloriaReti.jpg',
  'gloria reti': '/img_profesionales/perfilGloriaReti.jpg',
  'charytin salazar yanez': '/img_profesionales/perfilCharytinGonzalez_v2.jpg',
  'charytin salazar': '/img_profesionales/perfilCharytinGonzalez_v2.jpg',
  'paulina velasquez catrifil': '/img_profesionales/perfilPaulinaVelasquez.jpg',
  'paulina velasquez': '/img_profesionales/perfilPaulinaVelasquez.jpg',
  'andro drazen sapunar rodriguez': '/img_profesionales/perfilAndroSapunar_v2.jpg',
  'andro sapunar': '/img_profesionales/perfilAndroSapunar_v2.jpg',
  'javiera marchant vio': '/img_profesionales/perfilJavieraMarchant.jpg',
  'javiera alejandra marchant': '/img_profesionales/perfilJavieraMarchant.jpg',
  'javiera marchant': '/img_profesionales/perfilJavieraMarchant.jpg',
  'pilar bello martinez': '/img_profesionales/perfilPilarBello_v2.jpg',
  'pilar bello': '/img_profesionales/perfilPilarBello_v2.jpg',
  'carlos yamil garcia - huidobro acosta': '/img_profesionales/perfilCarlosGarcia_v2.jpg',
  'carlos garcia - huidobro': '/img_profesionales/perfilCarlosGarcia_v2.jpg',
  'matias estai krauss': '/img_profesionales/perfilMatiasEstai.jpg',
  'matias estai': '/img_profesionales/perfilMatiasEstai.jpg',
  'alejandra yarmuch fierro': '/img_profesionales/perfilAlejandraYarmuch.png',
  'alejandra yarmuch': '/img_profesionales/perfilAlejandraYarmuch.png',
  'joaquin vial': '/img_profesionales/perfilJoaquinVial.jpg',
};

function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Obtiene la ruta relativa de la foto del profesional a partir de su nombre
 */
export function getDoctorPhoto(fullName: string): string | null {
  const norm = normalizeText(fullName);
  if (!norm) return null;

  // 1. Coincidencia directa en el mapa
  if (KNOWN_PHOTO_MAP[norm]) {
    return KNOWN_PHOTO_MAP[norm];
  }

  // 2. Coincidencia por subcadenas conocidas
  for (const [key, path] of Object.entries(KNOWN_PHOTO_MAP)) {
    if (norm.includes(key) || key.includes(norm)) {
      return path;
    }
  }

  // 3. Coincidencia por nombre y apellido
  const parts = norm.split(' ').filter((p) => p.length > 2);
  for (const [key, path] of Object.entries(KNOWN_PHOTO_MAP)) {
    const keyParts = key.split(' ');
    const matches = parts.filter((p) => keyParts.includes(p));
    if (matches.length >= 2) {
      return path;
    }
  }

  return null;
}
