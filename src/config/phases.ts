/**
 * Configuração centralizada de todas as fases do jogo
 * Formato: { id, number, level, name, type, image, hint }
 */

export interface Phase {
  id: string;
  number: number;
  level: number;
  name: string;
  type: string;
  image: string | null;
  hint: string;
  missing?: boolean;
}

export interface Phases {
  [key: string]: Phase;
}

const phases: Phases = {
  // NÍVEL 0 - Introdução
  fasezero: {
    id: 'fasezero',
    number: 0,
    level: 0,
    name: 'Fase Zero - Bem-vindo',
    type: 'passcode',
    image: null,
    hint: 'Bem-vindo ao RiddleZinho!'
  },

  // NÍVEL 1 - Fases de 1 a 33
  coracao: {
    id: 'coracao',
    number: 1,
    level: 1,
    name: 'Fase 1 - Trocadilho fuleiro',
    type: 'passcode',
    image: '/images/fases/aviao.jpg',
    hint: 'Santos Dumont'
  },
  '14bis': {
    id: '14bis',
    number: 2,
    level: 1,
    name: 'Fase 2 - Transportador de sonhos',
    type: 'passcode',
    image: '/images/fases/aviao.jpg',
    hint: 'Alberto Santos Dumont'
  },
  bobesponja: {
    id: 'bobesponja',
    number: 3,
    level: 1,
    name: 'Fase 3 - Paul Landowski e Carlos Oswald',
    type: 'passcode',
    image: '/images/fases/rio.jpg',
    hint: 'Em cada esquina eu vejo um olhar perdido'
  },
  jesus: {
    id: 'jesus',
    number: 4,
    level: 1,
    name: 'Fase 4 - Ele veio PIXAR o muro',
    type: 'passcode',
    image: '/images/fases/violeta_faz_parte.jpg',
    hint: 'Extraordinários, fantásticos, maravilhosos, estupendos, fabulosos!'
  },
  incriveis: {
    id: 'incriveis',
    number: 5,
    level: 1,
    name: 'Fase 5 - Força, poder, velocidade',
    type: 'passcode',
    image: null,
    hint: 'Uma família com superpoderes'
  },
  atila: {
    id: 'atila',
    number: 6,
    level: 1,
    name: 'Fase 6 - O rei dos Hunos',
    type: 'passcode',
    image: null,
    hint: 'Conquistador que aterrorizou a Europa'
  },
  xadrez: {
    id: 'xadrez',
    number: 7,
    level: 1,
    name: 'Fase 7 - Jogo das 64 casas',
    type: 'passcode',
    image: null,
    hint: 'Rei, Rainha, Torre, Bispo, Cavalo'
  },
  io: {
    id: 'io',
    number: 8,
    level: 1,
    name: 'Fase 8 - Lua de Júpiter',
    type: 'passcode',
    image: null,
    hint: 'Deusa que se tornou lua'
  },
  hipocondria: {
    id: 'hipocondria',
    number: 9,
    level: 1,
    name: 'Fase 9 - Doença imaginária',
    type: 'passcode',
    image: null,
    hint: 'Pessoas que têm medo de ficar doentes'
  },
  vangogh: {
    id: 'vangogh',
    number: 10,
    level: 1,
    name: 'Fase 10 - Um artista desconfortável',
    type: 'passcode',
    image: null,
    hint: 'Perdeu uma orelha'
  },
  burjdubai: {
    id: 'burjdubai',
    number: 11,
    level: 1,
    name: 'Fase 11 - Arranha-céu nos Emirados',
    type: 'passcode',
    image: null,
    hint: 'Edifício mais alto do mundo'
  },
  celular: {
    id: 'celular',
    number: 12,
    level: 1,
    name: 'Fase 12 - Telefone de bolso',
    type: 'passcode',
    image: null,
    hint: 'Dispositivo que marcou a geração'
  },
  pedraderoseta: {
    id: 'pedraderoseta',
    number: 13,
    level: 1,
    name: 'Fase 13 - Chave do Egito',
    type: 'passcode',
    image: null,
    hint: 'Decifrou os hieróglifos egípcios'
  },
  holanda: {
    id: 'holanda',
    number: 14,
    level: 1,
    name: 'Fase 14 - País dos moinhos',
    type: 'passcode',
    image: null,
    hint: 'Famosos por tulipas e canais'
  },
  catacrese: {
    id: 'catacrese',
    number: 15,
    level: 1,
    name: 'Fase 15 - Figura de linguagem',
    type: 'passcode',
    image: null,
    hint: 'Asas do avião, perna da mesa'
  },
  hipogrifo: {
    id: 'hipogrifo',
    number: 16,
    level: 1,
    name: 'Fase 16 - Criatura mitológica',
    type: 'passcode',
    image: null,
    hint: 'Meio cavalo, meio águia'
  },
  franca: {
    id: 'franca',
    number: 17,
    level: 1,
    name: 'Fase 17 - Berço da revolução',
    type: 'passcode',
    image: null,
    hint: 'Liberdade, Igualdade, Fraternidade'
  },
  '01000001': {
    id: '01000001',
    number: 18,
    level: 1,
    name: 'Fase 18 - Código binário',
    type: 'passcode',
    image: '/images/fases/eletrocardiograma.jpg',
    hint: '01000001 em binário é 65 em decimal'
  },
  carokann: {
    id: 'carokann',
    number: 19,
    level: 1,
    name: 'Fase 19 - Abertura de xadrez',
    type: 'passcode',
    image: null,
    hint: '1.d4 d5 2.c4 e6'
  },
  edipo: {
    id: 'edipo',
    number: 20,
    level: 1,
    name: 'Fase 20 - Tragédia grega',
    type: 'passcode',
    image: null,
    hint: 'Matou o pai e casou com a mãe'
  },
  caribe: {
    id: 'caribe',
    number: 21,
    level: 1,
    name: 'Fase 21 - Mar tropical',
    type: 'passcode',
    image: '/images/fases/rio.jpg',
    hint: 'Pirata Jack Sparrow navegava aqui'
  },
  fadaverde: {
    id: 'fadaverde',
    number: 22,
    level: 1,
    name: 'Fase 22 - Conto de fadas',
    type: 'passcode',
    image: null,
    hint: 'A bruxa má da floresta'
  },
  milan: {
    id: 'milan',
    number: 23,
    level: 1,
    name: 'Fase 23 - Cidade italiana',
    type: 'passcode',
    image: null,
    hint: 'Berço da moda'
  },
  celeritas: {
    id: 'celeritas',
    number: 24,
    level: 1,
    name: 'Fase 24 - Velocidade da luz',
    type: 'passcode',
    image: null,
    hint: 'Einstein e suas equações'
  },
  rondara: {
    id: 'rondara',
    number: 25,
    level: 1,
    name: 'Fase 25 - Dança brasileira',
    type: 'passcode',
    image: null,
    hint: 'Dança em círculo do nordeste'
  },
  operacaoverde: {
    id: 'operacaoverde',
    number: 26,
    level: 1,
    name: 'Fase 26 - Operação militar',
    type: 'passcode',
    image: null,
    hint: 'Verde, branco e vermelho'
  },
  ferpeitamente: {
    id: 'ferpeitamente',
    number: 27,
    level: 1,
    name: 'Fase 27 - Palavra perfeita',
    type: 'passcode',
    image: null,
    hint: '"F" "er" "pei" "ta" "mente"'
  },
  '4851': {
    id: '4851',
    number: 28,
    level: 1,
    name: 'Fase 28 - Números na tecla',
    type: 'passcode',
    image: null,
    hint: 'JKL no teclado'
  },
  '255': {
    id: '255',
    number: 29,
    level: 1,
    name: 'Fase 29 - Byte máximo',
    type: 'passcode',
    image: null,
    hint: '2^8 - 1'
  },
  '04151401': {
    id: '04151401',
    number: 30,
    level: 1,
    name: 'Fase 30 - Código de letras',
    type: 'passcode',
    image: null,
    hint: 'Código ASCII'
  },
  '650': {
    id: '650',
    number: 31,
    level: 1,
    name: 'Fase 31 - Números especiais',
    type: 'passcode',
    image: null,
    hint: 'DEF no teclado'
  },
  terceirocirculo: {
    id: 'terceirocirculo',
    number: 32,
    level: 1,
    name: 'Fase 32 - Ciclos do inferno',
    type: 'passcode',
    image: null,
    hint: 'Dante Alighieri'
  },
  mortedemarat: {
    id: 'mortedemarat',
    number: 33,
    level: 1,
    name: 'Fase 33 - Pintura histórica',
    type: 'passcode',
    image: null,
    hint: 'Jacques-Louis David'
  },

  // Passagem para Nível 2
  '05151402': {
    id: '05151402',
    number: 34,
    level: 1,
    name: 'Fase 34 - Transição Nível 2',
    type: 'passcode',
    image: null,
    hint: 'antonio / pollaiolo'
  },

  // NÍVEL 2 - Fases de 35 em diante
  antoniopollaiolo: {
    id: 'antoniopollaiolo',
    number: 35,
    level: 2,
    name: 'Fase 35 - Pintor renascentista',
    type: 'passcode',
    image: null,
    hint: 'Famoso por representar a musculatura'
  },
  fado: {
    id: 'fado',
    number: 36,
    level: 2,
    name: 'Fase 36 - Música portuguesa',
    type: 'passcode',
    image: '/images/fases/dois_ordens.jpeg',
    hint: 'Saudade e melancolia'
  },
  tomriddle: {
    id: 'tomriddle',
    number: 37,
    level: 2,
    name: 'Fase 37 - Lorde das trevas',
    type: 'passcode',
    image: null,
    hint: 'Voldemort'
  },
  soccer: {
    id: 'soccer',
    number: 38,
    level: 2,
    name: 'Fase 38 - Futebol',
    type: 'passcode',
    image: '/images/fases/2.brasil.jpg',
    hint: 'Esporte mais popular'
  },
  yijetuan: {
    id: 'yijetuan',
    number: 39,
    level: 2,
    name: 'Fase 39 - Evento histórico',
    type: 'passcode',
    image: '/images/fases/1991.jpg',
    hint: 'Ano importante'
  },
  chateaubriand: {
    id: 'chateaubriand',
    number: 40,
    level: 2,
    name: 'Fase 40 - Escritor francês',
    type: 'passcode',
    image: null,
    hint: 'Romantismo'
  },
  cigarro: {
    id: 'cigarro',
    number: 41,
    level: 2,
    name: 'Fase 41 - Vício',
    type: 'passcode',
    image: null,
    hint: 'Faz mal à saúde'
  },
  cemdolares: {
    id: 'cemdolares',
    number: 42,
    level: 2,
    name: 'Fase 42 - Nota americana',
    type: 'passcode',
    image: null,
    hint: 'Benjamin Franklin'
  },
  umbigo: {
    id: 'umbigo',
    number: 43,
    level: 2,
    name: 'Fase 43 - Cicatriz',
    type: 'passcode',
    image: null,
    hint: 'Todos têm'
  },
  timesnewroman: {
    id: 'timesnewroman',
    number: 44,
    level: 2,
    name: 'Fase 44 - Fonte clássica',
    type: 'passcode',
    image: null,
    hint: 'Jornal britânico'
  },
  fase45: {
    id: 'fase45',
    number: 45,
    level: 2,
    name: 'Fase 45 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  keeptalking: {
    id: 'keeptalking',
    number: 46,
    level: 2,
    name: 'Fase 46 - Continue falando',
    type: 'passcode',
    image: null,
    hint: 'Jogo da bomba'
  },
  trevorjackson: {
    id: 'trevorjackson',
    number: 47,
    level: 2,
    name: 'Fase 47 - Artista',
    type: 'passcode',
    image: null,
    hint: 'Like'
  },
  fase48: {
    id: 'fase48',
    number: 48,
    level: 2,
    name: 'Fase 48 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  rrd: {
    id: 'rrd',
    number: 49,
    level: 2,
    name: 'Fase 49 - Abreviação',
    type: 'passcode',
    image: null,
    hint: 'Três letras'
  },
  fase50: {
    id: 'fase50',
    number: 50,
    level: 2,
    name: 'Fase 50 - Marco',
    type: 'passcode',
    image: null,
    hint: 'Metade de 100'
  },
  mastimnapolitano: {
    id: 'mastimnapolitano',
    number: 51,
    level: 2,
    name: 'Fase 51 - Raça de cão',
    type: 'passcode',
    image: null,
    hint: 'Itália'
  },
  bombaatomica: {
    id: 'bombaatomica',
    number: 52,
    level: 2,
    name: 'Fase 52 - Arma poderosa',
    type: 'passcode',
    image: '/images/fases/brahma.jpg',
    hint: 'Hiroshima'
  },
  fase53: {
    id: 'fase53',
    number: 53,
    level: 2,
    name: 'Fase 53 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  volkswagen: {
    id: 'volkswagen',
    number: 54,
    level: 2,
    name: 'Fase 54 - Montadora',
    type: 'passcode',
    image: '/images/fases/uno.jpg',
    hint: 'Povo'
  },
  impostoderenda: {
    id: 'impostoderenda',
    number: 55,
    level: 2,
    name: 'Fase 55 - Tributo',
    type: 'passcode',
    image: null,
    hint: 'Governo'
  },
  seispoemas: {
    id: 'seispoemas',
    number: 56,
    level: 2,
    name: 'Fase 56 - Composições',
    type: 'passcode',
    image: null,
    hint: 'Literatura'
  },
  fase57: {
    id: 'fase57',
    number: 57,
    level: 2,
    name: 'Fase 57 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  miltonnascimento: {
    id: 'miltonnascimento',
    number: 58,
    level: 2,
    name: 'Fase 58 - Músico brasileiro',
    type: 'passcode',
    image: null,
    hint: 'Clube da Esquina'
  },
  pauloleminski: {
    id: 'pauloleminski',
    number: 59,
    level: 2,
    name: 'Fase 59 - Poeta',
    type: 'passcode',
    image: null,
    hint: 'Curitiba'
  },
  yfotmydfelx: {
    id: 'yfotmydfelx',
    number: 60,
    level: 2,
    name: 'Fase 60 - Código',
    type: 'passcode',
    image: null,
    hint: 'Cifra'
  },
  fase61: {
    id: 'fase61',
    number: 61,
    level: 2,
    name: 'Fase 61 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  saomartinho: {
    id: 'saomartinho',
    number: 62,
    level: 2,
    name: 'Fase 62 - Santo',
    type: 'passcode',
    image: null,
    hint: 'Cavalo'
  },
  fase63: {
    id: 'fase63',
    number: 63,
    level: 2,
    name: 'Fase 63 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  fase64: {
    id: 'fase64',
    number: 64,
    level: 2,
    name: 'Fase 64 - Violeta',
    type: 'passcode',
    image: '/images/fases/violeta_faz_parte.jpg',
    hint: 'Cor'
  },
  amparo: {
    id: 'amparo',
    number: 65,
    level: 2,
    name: 'Fase 65 - Proteção',
    type: 'passcode',
    image: null,
    hint: 'Ajuda'
  },
  chapa: {
    id: 'chapa',
    number: 66,
    level: 2,
    name: 'Fase 66 - Metal',
    type: 'passcode',
    image: null,
    hint: 'Chapas'
  },
  mariademedici: {
    id: 'mariademedici',
    number: 67,
    level: 2,
    name: 'Fase 67 - Rainha',
    type: 'passcode',
    image: null,
    hint: 'França'
  },
  corcel: {
    id: 'corcel',
    number: 68,
    level: 2,
    name: 'Fase 68 - Cavalo',
    type: 'passcode',
    image: null,
    hint: 'Ford'
  },
  fase69: {
    id: 'fase69',
    number: 69,
    level: 2,
    name: 'Fase 69 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  corfix: {
    id: 'corfix',
    number: 70,
    level: 2,
    name: 'Fase 70 - Cor',
    type: 'passcode',
    image: null,
    hint: 'Reparo'
  },
  pneumoultramicroscopicossilicovulcanoconiotico: {
    id: 'pneumoultramicroscopicossilicovulcanoconiotico',
    number: 71,
    level: 2,
    name: 'Fase 71 - Palavra gigante',
    type: 'passcode',
    image: null,
    hint: 'Doença pulmonar'
  },
  araraarara: {
    id: 'araraarara',
    number: 72,
    level: 2,
    name: 'Fase 72 - Ave',
    type: 'passcode',
    image: '/images/fases/asa.jpg',
    hint: 'Repetição'
  },
  fase73: {
    id: 'fase73',
    number: 73,
    level: 2,
    name: 'Fase 73 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  fase74: {
    id: 'fase74',
    number: 74,
    level: 2,
    name: 'Fase 74 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  acronimo: {
    id: 'acronimo',
    number: 75,
    level: 2,
    name: 'Fase 75 - Sigla',
    type: 'passcode',
    image: null,
    hint: 'Abreviação'
  },
  sonhodemagia: {
    id: 'sonhodemagia',
    number: 76,
    level: 2,
    name: 'Fase 76 - Ilusão',
    type: 'passcode',
    image: null,
    hint: 'Mágica'
  },
  fase77: {
    id: 'fase77',
    number: 77,
    level: 2,
    name: 'Fase 77 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  tayassu: {
    id: 'tayassu',
    number: 78,
    level: 2,
    name: 'Fase 78 - Animal',
    type: 'passcode',
    image: null,
    hint: 'Porco do mato'
  },
  hulkabilly: {
    id: 'hulkabilly',
    number: 79,
    level: 2,
    name: 'Fase 79 - Música',
    type: 'passcode',
    image: null,
    hint: 'Rockabilly'
  },
  defatigatis: {
    id: 'defatigatis',
    number: 80,
    level: 2,
    name: 'Fase 80 - Cansaço',
    type: 'passcode',
    image: '/images/fases/onda.jpg',
    hint: 'Latim'
  },
  escanhoarieis: {
    id: 'escanhoarieis',
    number: 81,
    level: 2,
    name: 'Fase 81 - Verbo',
    type: 'passcode',
    image: null,
    hint: 'Conjugação'
  },
  fonda: {
    id: 'fonda',
    number: 82,
    level: 2,
    name: 'Fase 82 - Ator',
    type: 'passcode',
    image: null,
    hint: 'Jane'
  },
  bisposardinha: {
    id: 'bisposardinha',
    number: 83,
    level: 2,
    name: 'Fase 83 - Peixe',
    type: 'passcode',
    image: null,
    hint: 'Lata'
  },
  arar: {
    id: 'arar',
    number: 84,
    level: 2,
    name: 'Fase 84 - Lavar',
    type: 'passcode',
    image: '/images/fases/animal_marinho.jpg',
    hint: 'Limpar'
  },
  tubarao: {
    id: 'tubarao',
    number: 85,
    level: 2,
    name: 'Fase 85 - Predador',
    type: 'passcode',
    image: null,
    hint: 'Mar'
  },
  fase86: {
    id: 'fase86',
    number: 86,
    level: 2,
    name: 'Fase 86 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  fase87: {
    id: 'fase87',
    number: 87,
    level: 2,
    name: 'Fase 87 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  fase88: {
    id: 'fase88',
    number: 88,
    level: 2,
    name: 'Fase 88 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  fase89: {
    id: 'fase89',
    number: 89,
    level: 2,
    name: 'Fase 89 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  fase90: {
    id: 'fase90',
    number: 90,
    level: 2,
    name: 'Fase 90 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  fase91: {
    id: 'fase91',
    number: 91,
    level: 2,
    name: 'Fase 91 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  '80000': {
    id: '80000',
    number: 92,
    level: 2,
    name: 'Fase 92 - Número',
    type: 'passcode',
    image: null,
    hint: '80 mil'
  },
  fase93: {
    id: 'fase93',
    number: 93,
    level: 2,
    name: 'Fase 93 - Em desenvolvimento',
    type: 'passcode',
    image: null,
    hint: 'Em breve'
  },
  seishelices: {
    id: 'seishelices',
    number: 94,
    level: 2,
    name: 'Fase 94 - Parafusos',
    type: 'passcode',
    image: null,
    hint: 'Seis'
  },
  corredorvermelho: {
    id: 'corredorvermelho',
    number: 95,
    level: 2,
    name: 'Fase 95 - Corredor',
    type: 'passcode',
    image: null,
    hint: 'Vermelho'
  },
  deuteranopia: {
    id: 'deuteranopia',
    number: 96,
    level: 2,
    name: 'Fase 96 - Daltonismo',
    type: 'passcode',
    image: null,
    hint: 'Verde'
  },
  iniciodofim: {
    id: 'iniciodofim',
    number: 97,
    level: 2,
    name: 'Fase 97 - Última Fase Nível 2',
    type: 'passcode',
    image: null,
    hint: 'Começo do fim'
  },
  tangerinaagitada: {
    id: 'tangerinaagitada',
    number: 98,
    level: 2,
    name: 'Fase 98 - Cítrico',
    type: 'passcode',
    image: null,
    hint: 'Mexerica'
  },
  taxonomia: {
    id: 'taxonomia',
    number: 99,
    level: 2,
    name: 'Fase 99 - Classificação',
    type: 'passcode',
    image: null,
    hint: 'Biologia'
  }
};

export default phases;
