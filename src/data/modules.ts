import {
  Brain,
  Hand,
  Crosshair,
  Gauge,
  Wind,
  Target,
  DollarSign,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Quantity = "poucas" | "medias" | "muitas";

export interface ModuleSection {
  /** Título curto. */
  title: string;
  /** Texto da seção (Markdown leve permitido com **negrito** simples). */
  body: string;
  /** URL de imagem ilustrativa (placeholder Unsplash que existe). */
  image?: string;
  /** Legenda curta da imagem. */
  imageCaption?: string;
}

export interface QuantitySection {
  label: string;
  /** Headline forte. */
  headline: string;
  /** Resumo de bolso. */
  summary: string;
  /** Passo a passo prático. */
  steps: string[];
  /** Erros que matam o tapa. */
  mistakes: string[];
  /** Imagem demonstrativa. */
  image: string;
  imageCaption: string;
}

export interface BafoModule {
  slug: string;
  /** Posição na ordem (1 = pior, 6 = melhor). */
  order: number;
  /** Número exibido. */
  number: string;
  title: string;
  /** Subtítulo na barra/cards. */
  subtitle: string;
  /** Lead da página interna. */
  lead: string;
  icon: LucideIcon;
  /** Liberação em dias após a compra (0 = imediato). */
  unlockAfterDays: number;
  /** Seções introdutórias (3 obrigatórias antes do conteúdo prático). */
  intro?: ModuleSection[];
  /** Conteúdo central por quantidade. */
  byQuantity?: Record<Quantity, QuantitySection>;
  /** Conteúdo único (sem divisão por quantidade) — para módulos especiais. */
  bigContent?: ModuleSection[];
  /** É um crossell pago? */
  isCrossell?: boolean;
  /** Etiqueta especial (ex.: "EXTRA", "VIP"). */
  flag?: string;
}

const UNSPLASH = {
  hand: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&q=80&auto=format&fit=crop",
  trade: "https://images.unsplash.com/photo-1610915065470-cb8b9c799f1f?w=1200&q=80&auto=format&fit=crop",
  cards: "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=1200&q=80&auto=format&fit=crop",
  stadium: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80&auto=format&fit=crop",
  ball: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80&auto=format&fit=crop",
  brain: "https://images.unsplash.com/photo-1559757175-08e220a51097?w=1200&q=80&auto=format&fit=crop",
  wind: "https://images.unsplash.com/photo-1527482797697-8795b05a13b6?w=1200&q=80&auto=format&fit=crop",
  table: "https://images.unsplash.com/photo-1521120098171-bf73a18dfae0?w=1200&q=80&auto=format&fit=crop",
  money: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=1200&q=80&auto=format&fit=crop",
  spark: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80&auto=format&fit=crop",
  fist: "https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=1200&q=80&auto=format&fit=crop",
  finger: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop",
};

// ============================================================
// MÓDULOS PRINCIPAIS (ordenados do pior → melhor)
// ============================================================

export const modules: BafoModule[] = [
  // ---------------------- 1
  {
    slug: "por-que-voce-nunca-vira",
    order: 1,
    number: "01",
    title: "Por que você nunca vira uma figurinha",
    subtitle: "A verdade que ninguém te contou sobre bafo",
    lead: "Antes de aprender a virar, você precisa entender por que tá perdendo. Sem isso, qualquer técnica vai pro lixo.",
    icon: Brain,
    unlockAfterDays: 0,
    intro: [
      {
        title: "Bafo não é sorte. Nunca foi.",
        body:
          "Tem um cara na sua roda que entra com cinco figurinhas e sai com cinquenta. Você acha que ele tem sorte. Não tem. Ele aprendeu uma coisa que você ainda não enxergou: bafo é física, é controle de ar, é leitura do bolo.\n\nA partir do momento que você aceita isso, o jogo muda. Você para de jogar no chute e começa a jogar com intenção. E quando você joga com intenção, a roda inteira começa a respeitar.",
        image: UNSPLASH.cards,
        imageCaption: "O bolo de figurinhas é só a superfície. O jogo de verdade tá embaixo.",
      },
      {
        title: "Os 4 erros que estão te derrotando agora",
        body:
          "Mão reta demais — você bate como quem dá um tapa numa porta. Não cria vácuo.\n\nImpacto no lugar errado — você bate no topo do bolo e o ar escapa pelos lados.\n\nForça sem direção — você bate forte, mas o ar vai pra qualquer lado.\n\nDistância errada — você se aproxima demais e tira o impulso que precisava.\n\nSe você se reconheceu em pelo menos dois desses, calma: é exatamente isso que a gente vai destravar.",
        image: UNSPLASH.hand,
        imageCaption: "Mão reta = ar escapando = figurinha não vira.",
      },
      {
        title: "O que muda quando você entende a técnica",
        body:
          "Você para de comprar pacotinho pra repor o que perdeu. Para de evitar a roda. Para de ouvir piadinha. E começa a sair com mais figurinha do que entrou — toda vez.\n\nNão é mágica. É repetição do gesto certo. E é isso que os próximos módulos vão te dar.",
        image: UNSPLASH.spark,
        imageCaption: "Antes e depois. A diferença está em três detalhes que você nunca prestou atenção.",
      },
    ],
    byQuantity: {
      poucas: {
        label: "Poucas figurinhas (1 a 5)",
        headline: "Por que com poucas figurinhas você ainda perde",
        summary:
          "Com poucas figurinhas o erro fica nu. Não tem peso pra disfarçar técnica ruim. Quem não sabe bater, com poucas, fica exposto.",
        steps: [
          "Reconheça que poucas figurinhas exigem PRECISÃO, não força.",
          "Observe se o bolo está plano ou levemente inclinado — é isso que define o ângulo.",
          "Identifique a face de cima: virar bafo é mudar a face, não empurrar o bolo.",
          "Antes de bater, respire fundo. Tensão na mão é ar escapando pelos lados.",
        ],
        mistakes: [
          "Bater com força máxima achando que vai virar tudo.",
          "Aproximar a mão demais — você precisa de ar entre a mão e o chão.",
          "Não olhar a borda do bolo antes do tapa.",
        ],
        image: UNSPLASH.cards,
        imageCaption: "Com poucas, a margem de erro é zero. Cada detalhe pesa.",
      },
      medias: {
        label: "Médias figurinhas (6 a 15)",
        headline: "A faixa que mais engana iniciante",
        summary:
          "É o número onde o cara acha que precisa bater mais forte. Errado. O bolo médio precisa de CONCAVIDADE, não de pancada.",
        steps: [
          "Forme a mão em concha. Polegar e mindinho selam as laterais.",
          "Identifique o centro de massa do bolo (não é o centro visual).",
          "Posicione a mão a 5-7 cm do chão antes de descer.",
          "O tapa precisa empurrar AR, não a figurinha.",
        ],
        mistakes: [
          "Mão aberta demais — ar escapa pelas laterais antes de criar pressão.",
          "Bater no centro visual em vez do centro de massa.",
          "Tirar a mão rápido demais depois do impacto.",
        ],
        image: UNSPLASH.hand,
        imageCaption: "Concha bem feita = vácuo de pressão = figurinhas virando em sequência.",
      },
      muitas: {
        label: "Muitas figurinhas (16+)",
        headline: "O bolo grande engana — mas premia quem sabe",
        summary:
          "Muita figurinha junto cria um bolo instável. Quem entende isso, vira 30, 50 numa tapa só. Quem não entende, só desloca o monte.",
        steps: [
          "Avalie a altura do bolo. Acima de 2 dedos? Divide ou aceita o desafio.",
          "A entrada do tapa precisa ser MAIS angulada (cerca de 30°).",
          "Mão mais aberta, porque o volume de ar deslocado é maior.",
          "Recolha a mão devagar — quem recolhe rápido suga o ar de volta.",
        ],
        mistakes: [
          "Achar que força vence volume. Não vence. Estratégia vence.",
          "Bater perpendicular ao chão num bolo alto. Desestabiliza, mas não vira.",
          "Não observar de onde vem a corrente de ar do ambiente.",
        ],
        image: UNSPLASH.stadium,
        imageCaption: "Bolo grande, dinheiro grande. Acerta o gesto e leva tudo.",
      },
    },
  },

  // ---------------------- 2
  {
    slug: "posicao-das-maos",
    order: 2,
    number: "02",
    title: "A posição certa das mãos",
    subtitle: "O gesto que separa o iniciante do apelão",
    lead: "Tem uma posição específica que cria vácuo. Quem aprende, vira. Quem não aprende, fica empurrando figurinha pra todo lado.",
    icon: Hand,
    unlockAfterDays: 0,
    intro: [
      {
        title: "A mão é uma ventosa. Não um martelo.",
        body:
          "A primeira coisa que muda quando você assiste o apelão batendo é a forma da mão. Não é rígida, não é totalmente aberta. É uma concha viva, que se molda no ar antes do impacto.\n\nIsso não é estilo. É engenharia. A concha cria uma câmara de ar selada. No tapa, essa câmara explode pra dentro e arranca a face de baixo do bolo pra cima.",
        image: UNSPLASH.hand,
        imageCaption: "A concha viva: relaxada, mas controlada.",
      },
      {
        title: "Os 3 dedos que ninguém te ensinou",
        body:
          "**Polegar** — sela uma das laterais. Não tem que estar grudado, mas tem que estar firme.\n\n**Mindinho** — sela a outra. Junto com o polegar, eles formam as paredes da câmara.\n\n**Dedo médio** — é o teu acelerador. É ele que dá a leve curvatura no centro da concha.\n\nIndicador e anelar são passageiros. Mas polegar, médio e mindinho fazem o trabalho pesado.",
        image: UNSPLASH.finger,
        imageCaption: "Polegar + mindinho selam. Médio acelera. Simples assim.",
      },
      {
        title: "Como saber se sua mão tá certa antes de bater",
        body:
          "Teste rápido: coloque a mão fechada em concha sobre uma mesa lisa e tente \"sugar\" o ar. Se você sente uma pequena resistência ao levantar, sua concha está vedando. Se a mão sobe leve, tem ar escapando — e nessa hora, sua figurinha não vira.\n\nFaça isso 5 vezes antes de cada partida. Vira ritual. Vira reflexo.",
        image: UNSPLASH.fist,
        imageCaption: "Se sua mão suga o ar da mesa, ela vai sugar a figurinha também.",
      },
    ],
    byQuantity: {
      poucas: {
        label: "Poucas figurinhas (1 a 5)",
        headline: "Concha pequena, dedos mais juntos",
        summary:
          "Com poucas, a área de impacto é menor. Sua concha tem que diminuir junto, ou você desperdiça energia em ar que não vai virar nada.",
        steps: [
          "Junte os dedos um pouco mais que o normal. A concha fica compacta.",
          "Posicione o pulso quase paralelo ao chão antes do tapa.",
          "Mire o centro do bolo com a base da palma — não com os dedos.",
          "Bata seco, sem follow-through grande.",
        ],
        mistakes: [
          "Usar a mesma concha que você usa pra bolo grande.",
          "Bater com a ponta dos dedos. Não cria vácuo.",
          "Soltar o pulso. Pulso solto = sem direção.",
        ],
        image: UNSPLASH.hand,
        imageCaption: "Concha pequena pra alvo pequeno. Precisão acima de força.",
      },
      medias: {
        label: "Médias figurinhas (6 a 15)",
        headline: "A concha clássica do apelão",
        summary:
          "Esse é o cenário em que a posição padrão brilha. Concha média, dedos levemente espaçados, pulso firme. É a base que você vai treinar 80% do tempo.",
        steps: [
          "Abra a mão como se fosse pegar uma maçã. Esse é o tamanho.",
          "Dedos com leve espaço — não cole, não abra demais.",
          "Polegar a uns 45° em relação ao indicador.",
          "Pulso ligeiramente curvado pra baixo no momento do impacto.",
        ],
        mistakes: [
          "Esticar todos os dedos no ar — vira tapa de mão aberta, sem câmara.",
          "Não usar o polegar como selante. Ele é metade do truque.",
          "Bater de cima pra baixo reto. Tem que ter um leve ângulo.",
        ],
        image: UNSPLASH.finger,
        imageCaption: "A concha clássica. Treina ela até virar muscle memory.",
      },
      muitas: {
        label: "Muitas figurinhas (16+)",
        headline: "Concha grande, pulso elástico",
        summary:
          "Bolo grande pede concha grande. E pede um pulso elástico — quase como um chicote. Mão rígida não move volume.",
        steps: [
          "Abra a concha quase no máximo, mas mantenha o selo polegar-mindinho.",
          "Deixe o pulso solto na descida e firme no impacto. É um chicotinho.",
          "Use o antebraço junto, não só a mão. Pra volume grande, o corpo entra.",
          "Mire dois dedos atrás do centro do bolo.",
        ],
        mistakes: [
          "Manter pulso travado — você perde 40% da potência.",
          "Esquecer do selo das laterais ao abrir a concha.",
          "Bater no centro exato — em bolo grande, a face de baixo cede mais atrás.",
        ],
        image: UNSPLASH.fist,
        imageCaption: "Concha grande + pulso elástico = bolo inteiro virando.",
      },
    },
  },

  // ---------------------- 3
  {
    slug: "onde-bater",
    order: 3,
    number: "03",
    title: "Onde bater no bolo",
    subtitle: "O ponto que vira tudo — e o ponto que vira nada",
    lead: "Errar o lugar é o motivo número 1 de figurinha boa não virar. Aqui você vai parar de chutar.",
    icon: Crosshair,
    unlockAfterDays: 0,
    intro: [
      {
        title: "O ponto certo não é o centro. Quase nunca.",
        body:
          "A maioria bate bem no meio. Faz sentido pra cabeça, não faz sentido pra física. O centro de massa do bolo quase nunca coincide com o centro visual — principalmente quando tem figurinhas de espessuras diferentes (e tem sempre).\n\nA regra que funciona em 9 de 10 casos: bata 1 a 2 dedos atrás do centro visual, no sentido contrário ao seu corpo. É ali que a pressão se distribui pra virar.",
        image: UNSPLASH.cards,
        imageCaption: "Centro visual ≠ centro de massa. O bolo conta uma história.",
      },
      {
        title: "Como ler o bolo em 3 segundos",
        body:
          "Olha pra borda. Tá mais alta de um lado? Ali tem mais figurinhas — é dali que vem a virada.\n\nOlha pra cima. Tem alguma figurinha levemente curvada? Aquilo é uma alavanca natural. Mira nela.\n\nOlha pro chão em volta. Tá liso? Vai escorregar. Tá fosco? Vai segurar. Isso muda totalmente o lugar do tapa.",
        image: UNSPLASH.table,
        imageCaption: "Antes de bater, lê. Quem lê, vence.",
      },
      {
        title: "O \"X\" do apelão",
        body:
          "Imagina um X marcado no chão, com o cruzamento atrás do centro do bolo, no quadrante mais distante de você. Esse é o teu alvo. Não muda. Treina mirar esse X em qualquer bolo, qualquer dia.\n\nDepois de 100 partidas mirando ali, vira automático. E é nesse momento que você para de pensar e começa a vencer.",
        image: UNSPLASH.spark,
        imageCaption: "O X invisível. Quem enxerga, rapela.",
      },
    ],
    byQuantity: {
      poucas: {
        label: "Poucas figurinhas (1 a 5)",
        headline: "Mira na borda, não no centro",
        summary:
          "Em bolos pequenos, o centro é raso. A borda é onde o impulso ainda tem o que levantar.",
        steps: [
          "Identifique a borda mais grossa do bolo.",
          "Mire 0,5 cm pra dentro dessa borda, no sentido contrário ao teu corpo.",
          "Bata com a base da palma alinhada com esse ponto.",
          "Mantenha a mão ali por 0,5 segundo depois do impacto.",
        ],
        mistakes: [
          "Bater no centro de um bolo raso — não tem coluna de ar.",
          "Mirar com os dedos em vez da base da palma.",
          "Recolher a mão imediatamente. O selo precisa durar um instante.",
        ],
        image: UNSPLASH.cards,
        imageCaption: "Borda grossa = alavanca. Mira ali.",
      },
      medias: {
        label: "Médias figurinhas (6 a 15)",
        headline: "O ponto canônico atrás do centro",
        summary:
          "Aqui a regra do X funciona perfeitamente. Mira 1 a 2 dedos atrás do centro visual e atinge a face de baixo de toda a coluna.",
        steps: [
          "Localize o centro visual do bolo.",
          "Mova mentalmente 1-2 dedos pra trás (longe do teu corpo).",
          "Abaixe a mão na vertical até 5 cm e desça em ângulo leve.",
          "Sela o impacto por meio segundo antes de levantar.",
        ],
        mistakes: [
          "Bater na frente do bolo (perto de você) — vira contra você.",
          "Acertar o centro visual e achar que é a mesma coisa.",
          "Ignorar o eixo de inclinação do bolo.",
        ],
        image: UNSPLASH.hand,
        imageCaption: "1-2 dedos atrás do centro visual. Regra de ouro.",
      },
      muitas: {
        label: "Muitas figurinhas (16+)",
        headline: "Mira no segundo terço",
        summary:
          "Bolo alto tem três terços invisíveis. O segundo terço (a partir do teu corpo) é onde a coluna de ar é mais densa. É ali que o tapa precisa pousar.",
        steps: [
          "Divida o bolo mentalmente em 3 fatias horizontais.",
          "Mira no início da fatia do meio.",
          "Use a borda externa da palma (lado do mindinho) como referência.",
          "O ângulo do tapa deve ser de aproximadamente 30°.",
        ],
        mistakes: [
          "Bater no topo do bolo. Vira só uma camada.",
          "Mirar no terço mais próximo a você. Empurra contra você.",
          "Tentar virar tudo com força. É ângulo + selo, não pancada.",
        ],
        image: UNSPLASH.stadium,
        imageCaption: "Segundo terço. Coluna densa. Tapa cirúrgico.",
      },
    },
  },

  // ---------------------- 4 (BLOQUEADO 3 DIAS)
  {
    slug: "controle-de-forca",
    order: 4,
    number: "04",
    title: "Controle de força (e não força bruta)",
    subtitle: "Por que o cara mais magrelo vira mais que o forçudo",
    lead: "Força sem direção é só barulho. Aqui você aprende a calibrar exatamente quanta energia o bolo pede.",
    icon: Gauge,
    unlockAfterDays: 3,
    intro: [
      {
        title: "Força bruta perde pra calibragem",
        body:
          "Tem um detalhe que a maior parte da galera nunca presta atenção: o cara que mais vira figurinha quase nunca é o mais forte. É o que tem o tapa mais calibrado. Porque força demais espirra figurinha pra todo lado. Força de menos não cria vácuo. O ponto certo é o meio — e tem técnica pra achar.",
        image: UNSPLASH.fist,
        imageCaption: "Calibragem > força. Sempre foi assim.",
      },
      {
        title: "A escala 1–10 do tapa",
        body:
          "**1-3** — Bolo pequeno e raso. Tapa de pulso, sem antebraço.\n\n**4-6** — Bolo médio. Pulso + antebraço, sem ombro.\n\n**7-9** — Bolo grande ou denso. Pulso + antebraço + leve giro de ombro.\n\n**10** — Quase nunca. Reserva pra bolo gigante (20+) em chão fosco.\n\nMaioria dos amadores bate em 8-10 sempre. Por isso perdem.",
        image: UNSPLASH.brain,
        imageCaption: "Calibragem mental antes do tapa. Vira ritual.",
      },
      {
        title: "Como treinar calibragem em casa",
        body:
          "Pegue 3 bolos de tamanhos diferentes (poucas, médias, muitas). Bata em cada um 10 vezes. Anota quantas virou em cada nível de força. Em 3 dias você descobre o teu ponto ótimo pra cada tamanho.\n\nIsso é ouro. Ninguém faz. Você vai fazer. E vai sentir a diferença na próxima roda.",
        image: UNSPLASH.table,
        imageCaption: "Treino calibrado em casa = vitória garantida na rua.",
      },
    ],
    byQuantity: {
      poucas: {
        label: "Poucas figurinhas (1 a 5)",
        headline: "Tapa nível 2-3: só pulso",
        summary:
          "Com poucas, força extra atrapalha. O bolo voa em vez de virar. Trabalhe só com pulso, antebraço relaxado.",
        steps: [
          "Antebraço imóvel, apoiado no corpo se possível.",
          "Movimento curto, de pulso, com aceleração no último centímetro.",
          "Velocidade alta, mas amplitude pequena.",
          "Foco na velocidade final, não na força inicial.",
        ],
        mistakes: [
          "Usar antebraço inteiro — manda o bolo pra outra rua.",
          "Bater devagar achando que está sendo cuidadoso.",
          "Não acelerar nos últimos centímetros.",
        ],
        image: UNSPLASH.hand,
        imageCaption: "Pulso solto, antebraço travado. Tapa rápido e curto.",
      },
      medias: {
        label: "Médias figurinhas (6 a 15)",
        headline: "Tapa nível 4-6: pulso + antebraço",
        summary:
          "Aqui o antebraço entra na conversa. Mas o ombro fica fora. É um soquinho controlado, não um murro.",
        steps: [
          "Antebraço acompanha o pulso na descida.",
          "Cotovelo se mantém no mesmo lugar — só o antebraço pivota.",
          "Aceleração progressiva ao longo de uns 15 cm de descida.",
          "Selo de meio segundo no impacto.",
        ],
        mistakes: [
          "Tirar o cotovelo do lugar — perde precisão.",
          "Acelerar tudo de uma vez no começo da descida.",
          "Ignorar o selo pós-impacto.",
        ],
        image: UNSPLASH.fist,
        imageCaption: "Cotovelo ancorado. Antebraço entra. Pulso fecha o serviço.",
      },
      muitas: {
        label: "Muitas figurinhas (16+)",
        headline: "Tapa nível 7-9: corpo inteiro, controlado",
        summary:
          "Aqui sim você libera o ombro. Mas com controle cirúrgico. É o tapa do apelão — parece simples mas tem 4 articulações sincronizadas.",
        steps: [
          "Inicie o movimento pelo ombro, num arco curto.",
          "Antebraço acelera no meio do arco.",
          "Pulso entrega a velocidade final.",
          "Mantenha o corpo estável — pés firmes, tronco neutro.",
        ],
        mistakes: [
          "Jogar o corpo pra frente. Você compensa, mas perde direção.",
          "Sincronizar mal as 3 articulações. Vira pancada sem alma.",
          "Esquecer do selo no fim. Tudo isso pra desperdiçar no último 0,5s.",
        ],
        image: UNSPLASH.stadium,
        imageCaption: "Ombro abre o arco, pulso fecha a venda.",
      },
    },
  },

  // ---------------------- 5 (BLOQUEADO 7 DIAS)
  {
    slug: "direcao-do-vento",
    order: 5,
    number: "05",
    title: "A direção do vento a seu favor",
    subtitle: "O detalhe que separa o bom do invencível",
    lead: "Vento? Sim. Em rodas ao ar livre, em galpão, perto de ventilador, até a respiração da galera ao redor conta. Quem ignora, perde de graça.",
    icon: Wind,
    unlockAfterDays: 7,
    intro: [
      {
        title: "Sim, vento existe — mesmo dentro de casa",
        body:
          "Você abre a janela. Liga o ventilador. A galera respira fundo em volta. Tudo isso mexe a coluna de ar que você está tentando criar com a mão. Em rodas competitivas sérias, os caras escolhem o LADO da mesa baseado no fluxo de ar do ambiente. É detalhe de profissional.",
        image: UNSPLASH.wind,
        imageCaption: "O ar do ambiente é teu aliado — ou teu inimigo silencioso.",
      },
      {
        title: "Como detectar o vento em 5 segundos",
        body:
          "Lambe levemente o dedo indicador. Levanta. O lado que esfria mais rápido é a direção de onde vem o ar.\n\nOlha uma cortina, uma folha no chão, a fumaça de algo perto. Tudo isso conta.\n\nObserva o cabelo dos amigos. Sério. Se tá indo pra um lado, o ar vai pra esse lado.",
        image: UNSPLASH.table,
        imageCaption: "Teste do dedo. Antigo, brega, infalível.",
      },
      {
        title: "Posicionando-se com o vento",
        body:
          "Regra de ouro: posicione-se de costas pra origem do vento. Assim o ar do ambiente ajuda a empurrar a coluna de ar do teu tapa pra dentro do bolo.\n\nSe não puder mudar de lugar, ajuste o ÂNGULO do tapa. Bate com um leve desvio na direção contrária ao vento. Compensa.",
        image: UNSPLASH.brain,
        imageCaption: "Posição + ângulo de compensação. Detalhe de campeão.",
      },
    ],
    byQuantity: {
      poucas: {
        label: "Poucas figurinhas (1 a 5)",
        headline: "Vento atrapalha mais com pouco",
        summary:
          "Bolo pequeno é leve. Qualquer brisa empurra. Aqui você TEM que ler o ar — ou troca de lugar, ou compensa o ângulo.",
        steps: [
          "Identifique a direção do vento antes de qualquer coisa.",
          "Se possível, gire o bolo (não a mesa) pra que o vento bata na borda externa.",
          "Bate com um desvio de 5° no sentido contrário ao vento.",
          "Use a mão livre como anteparo se o vento for forte.",
        ],
        mistakes: [
          "Ignorar a janela aberta atrás de você.",
          "Bater perpendicular num bolo que tá sendo empurrado pelo ar.",
          "Esquecer que respiração da galera é vento também.",
        ],
        image: UNSPLASH.cards,
        imageCaption: "Com poucas, vento manda. Sua leitura tem que mandar mais.",
      },
      medias: {
        label: "Médias figurinhas (6 a 15)",
        headline: "Compensação leve resolve",
        summary:
          "Bolos médios são mais estáveis. O vento influencia menos, mas ainda influencia o último gesto: a saída da mão.",
        steps: [
          "Posicione-se de costas pro vento.",
          "Ângulo padrão de 20-25°.",
          "Saída da mão na mesma direção do vento — usa o vento como combustível.",
          "Não levante a mão muito alto depois do tapa — interfere no bolo.",
        ],
        mistakes: [
          "Sair com a mão contra o vento — atrapalha a virada final.",
          "Achar que vento médio não importa. Importa.",
          "Não ajustar o ângulo de impacto pela direção do ar.",
        ],
        image: UNSPLASH.wind,
        imageCaption: "Vento como combustível. Sai de vez com ele.",
      },
      muitas: {
        label: "Muitas figurinhas (16+)",
        headline: "Use o vento como amplificador",
        summary:
          "Aqui o pulo do gato: em bolos grandes, o vento ajuda. Se você se posicionar certo, a brisa empurra a face de cima junto com o teu tapa. É virada em dobro.",
        steps: [
          "Identifique se há corrente de ar consistente (não rajadas).",
          "Posicione o bolo com o lado mais alto na direção contrária ao vento.",
          "Bate com ângulo de 30-35°, alinhado com a direção do ar.",
          "Sai com a mão acompanhando o vento, num gesto contínuo.",
        ],
        mistakes: [
          "Bater contra o vento num bolo grande. Cancela metade da virada.",
          "Não esperar uma janela de ar estável. Rajada vai te enganar.",
          "Ignorar que a posição do teu próprio corpo bloqueia ou libera vento.",
        ],
        image: UNSPLASH.stadium,
        imageCaption: "Bolo grande + vento alinhado = rapelagem histórica.",
      },
    },
  },

  // ---------------------- 6 BÔNUS (BLOQUEADO 7 DIAS) — módulo extra de overdelivery
  {
    slug: "psicologia-da-roda",
    order: 6,
    number: "06",
    title: "Psicologia da roda",
    subtitle: "Como dominar a roda antes de bater a primeira figurinha",
    lead: "Este módulo é o nosso EXTRA gratuito. Você prometeu pra você mesmo só aprender técnica. A gente entrega técnica + a mente que faz a técnica funcionar.",
    icon: Target,
    unlockAfterDays: 7,
    flag: "BÔNUS",
    intro: [
      {
        title: "Roda é jogo mental antes de ser jogo físico",
        body:
          "Antes do primeiro tapa, a roda já está decidida. Quem entra inseguro, hesitante, perde antes de começar. Os apelões sabem disso. Eles entram fazendo piada, com voz firme, com cara de quem vai virar tudo. E a galera já entra desconfiando.\n\nVocê vai aprender aqui a chegar na roda com a presença que faz adversário recuar.",
        image: UNSPLASH.brain,
        imageCaption: "Roda é palco. Quem domina o palco, domina o resultado.",
      },
      {
        title: "Os 3 gatilhos pra desestabilizar o apelão da casa",
        body:
          "**Pergunta técnica antes de bater** — \"Você costuma bater de palma ou de dedo?\" Vai deixar ele se justificando.\n\n**Comentário de física** — \"Olha como esse bolo tá inclinado.\" Ele vai duvidar do alinhamento dele.\n\n**Pausa proposital** — Antes do teu tapa, demora 4 segundos. A galera fica atenta. Pressão muda de lado.",
        image: UNSPLASH.spark,
        imageCaption: "A guerra mental é silenciosa. E mortal.",
      },
      {
        title: "Quando NÃO entrar na roda",
        body:
          "Apelão sábio sabe a hora de não bater. Se o bolo tá muito raso, se o chão tá errado, se você acabou de comer e teu pulso tá lerdo — pula a rodada. Vale mais perder uma vez por não jogar do que perder a melhor figurinha do álbum por orgulho.\n\nIsso aqui muda tudo. Sério. É contraintuitivo, mas é regra ouro.",
        image: UNSPLASH.table,
        imageCaption: "Saber não jogar é tão técnico quanto saber jogar.",
      },
    ],
    byQuantity: {
      poucas: {
        label: "Poucas figurinhas (1 a 5)",
        headline: "Rodada de teste — observa, não disputa",
        summary:
          "Com pouco em jogo, joga PRA OBSERVAR. Veja como cada um bate, qual o ritmo da mesa, quem é blefe.",
        steps: [
          "Aposte só repetidas, nunca uma rara.",
          "Observe os 2 melhores da roda — copia ritmo, não estilo.",
          "Faça pergunta técnica em pelo menos uma rodada.",
          "Anota mentalmente: quem hesita, quem é confiante.",
        ],
        mistakes: [
          "Apostar figurinha boa numa rodada de teste.",
          "Não prestar atenção em ninguém além de você.",
          "Tentar impressionar com gestos exagerados.",
        ],
        image: UNSPLASH.cards,
        imageCaption: "Rodada barata = treino caro. Aproveita.",
      },
      medias: {
        label: "Médias figurinhas (6 a 15)",
        headline: "Já dá pra mostrar serviço",
        summary:
          "Aqui você começa a dosar técnica e presença. Acerta dois seguidos e o respeito muda de mesa.",
        steps: [
          "Entre falando pouco. Quem fala demais entrega ansiedade.",
          "Sela o tapa por meio segundo só pra mostrar controle.",
          "Comenta sutilmente o vento — \"hoje tem corrente, hein.\"",
          "Reage com naturalidade ao virar. Sem festejar demais.",
        ],
        mistakes: [
          "Festejar como se nunca tivesse virado nada.",
          "Falar demais antes do tapa — gera expectativa, gera erro.",
          "Olhar pros amigos enquanto bate. Distrai.",
        ],
        image: UNSPLASH.hand,
        imageCaption: "Mostra serviço sem alarde. É assim que se vira referência.",
      },
      muitas: {
        label: "Muitas figurinhas (16+)",
        headline: "O jogo do respeito",
        summary:
          "Bolo grande é palco. Você é o ator principal. Aqui não é só virar — é virar fazendo a galera entender que ali tem técnica.",
        steps: [
          "Anuncie o que vai fazer ANTES — \"vou pegar pelo segundo terço.\"",
          "Pausa de 5 segundos pra ler o bolo.",
          "Tapa firme, único, com selo de 1 segundo.",
          "Recolhe a mão devagar. Não comemora. Apenas olha.",
        ],
        mistakes: [
          "Bater rápido demais — parece sorte, não técnica.",
          "Reagir demais ao acertar. Quebra a aura.",
          "Não anunciar — perde a chance de educar a roda.",
        ],
        image: UNSPLASH.stadium,
        imageCaption: "Bolo grande + presença = lenda nascendo.",
      },
    },
  },
];

// ============================================================
// MÓDULOS ESPECIAIS — CROSSELLS
// ============================================================

export const crossells: BafoModule[] = [
  {
    slug: "bafo-a-distancia",
    order: 100,
    number: "X1",
    title: "Bafo à distância: humilhe quem ria de você",
    subtitle: "A técnica avançada que poucos sabem que existe",
    lead:
      "Virar figurinha COLADA na mão é fácil. Virar a 5, 10 centímetros de distância é o que faz amigo virar fã. Aqui você aprende a física exata desse golpe.",
    icon: Target,
    unlockAfterDays: 0,
    isCrossell: true,
    flag: "EXTRA",
    bigContent: [
      {
        title: "Por que distância é o nível mais alto",
        body:
          "Quando você bate colado, o vácuo é direto. Quando você bate à distância, você projeta uma coluna de ar comprimido — é mais difícil de criar e mais devastador quando acerta. É o equivalente a um drive de golfe no bafo: prática, leitura, controle.\n\nE psicologicamente? Quebra. A roda inteira fica em choque quando vê um bolo virando sem mão encostando.",
        image: UNSPLASH.spark,
        imageCaption: "Distância é estilo. Estilo é poder na roda.",
      },
      {
        title: "Conteúdo completo dentro do módulo",
        body:
          "• 6 vídeos de demonstração em câmera lenta\n• Diagramas de pressão de ar a 3, 5 e 8 cm\n• Treino guiado de 14 dias\n• PDF \"manual do tapa à distância\" pra imprimir\n• Acesso a grupo VIP dos alunos que dominaram a técnica",
        image: UNSPLASH.hand,
        imageCaption: "Conteúdo prático, treino guiado, manual em PDF.",
      },
    ],
  },
  {
    slug: "momento-de-apostar-raras",
    order: 101,
    number: "X2",
    title: "O momento exato pra apostar figurinha rara",
    subtitle: "Escudos, FWC, Legends — quando entrar com elas no jogo",
    lead:
      "A maioria perde figurinha rara porque aposta na hora errada. Tem ciência por trás do timing — e tem 3 sinais infalíveis que indicam o momento perfeito.",
    icon: DollarSign,
    unlockAfterDays: 0,
    isCrossell: true,
    flag: "EXTRA",
    bigContent: [
      {
        title: "A pior figurinha pra apostar não é a rara",
        body:
          "É a rara apostada na hora errada. O cara perde uma Legend porque entrou numa roda fria, com adversário descansado e mesa em desvantagem. Você vai aprender os 3 sinais que separam o bolo certo do bolo armadilha.\n\nEsse módulo já economizou centenas de reais pra galera que aplicou.",
        image: UNSPLASH.money,
        imageCaption: "Cada figurinha rara perdida é um pacotinho caro pelo ralo.",
      },
      {
        title: "O conteúdo completo do módulo",
        body:
          "• Os 3 sinais da \"roda quente\" (momento certo de entrar com rara)\n• Os 5 sinais de \"roda armadilha\" (NUNCA entre)\n• Planilha de avaliação de risco antes de cada aposta\n• Tabela de quando trocar figurinha rara em vez de jogar\n• Estudo de caso: como o Pedro completou o álbum com 4 apostas certeiras",
        image: UNSPLASH.trade,
        imageCaption: "Estratégia pura. Cabeça fria. Bolso cheio.",
      },
    ],
  },
];

export function getAllModulesSorted() {
  return [...modules].sort((a, b) => a.order - b.order);
}

export function findModule(slug: string) {
  return modules.find((m) => m.slug === slug);
}

export function findCrossell(slug: string) {
  return crossells.find((m) => m.slug === slug);
}
