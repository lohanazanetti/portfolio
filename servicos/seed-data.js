/* ═══════════════════════════════════════════════════════════════
   seed-data.js — dados iniciais de exemplo
   ═══════════════════════════════════════════════════════════════
   Usado só pelo botão "Importar dados de exemplo" do admin.html,
   na primeira configuração do projeto. Depois disso, todo o
   conteúdo passa a ser editado direto pelo painel (Firestore),
   e este arquivo pode ficar como referência/backup do conteúdo
   original combinado com a Farmácia Desconto Fácil.

   Para replicar para um novo cliente (Glaucia, Roque, Marcos...),
   NÃO edite este arquivo: use o botão "+ novo cliente" no painel
   admin e preencha os textos próprios dessa parceria por lá.
   ═══════════════════════════════════════════════════════════════ */

const VALORES_PADRAO = [
    { item: 'Reel', valor: 100, unidade: 'unidade' },
    { item: 'Carrossel', valor: 65, unidade: 'unidade' },
    { item: 'Post estático', valor: 35, unidade: 'unidade' },
    { item: 'Stories Fotográficos', valor: 200, unidade: 'mês' },
    { item: 'Story Arte', valor: 30, unidade: 'unidade' }
];

const SEED_DATA = {
    geral: {
        tipo: 'geral',
        valores: VALORES_PADRAO
    },

    'descontofacil-x7k2m9': {
        tipo: 'individual',
        nome: 'Farmácia Desconto Fácil',
        valores: VALORES_PADRAO,

        textos: {
            abertura: 'Já são seis meses de trabalho juntas, cuidando da presença da farmácia, sala de vacinas e academia no Instagram. Esse período trouxe clareza sobre o que funciona, sobre o volume real de produção envolvido, e sobre onde o modelo de trabalho precisava evoluir. Esta página apresenta a atualização do modelo de contratação, válida a partir de julho de 2026.',

            comoFunciona: 'Reels priorizam colaboradores e pessoas reais, é o que gera mais pertencimento e conversão. O conteúdo é organizado por pilares definidos para cada ambiente: farmácia, vacinas e academia. Uma vez por mês, é feita uma sessão de produção fotográfica que alimenta o banco de imagens usado ao longo de todo o mês. Os stories são programados semanalmente, com postagem em horário estratégico definido por você, seja um único horário fixo ou dois horários no mesmo dia, o critério de frequência e horário é sempre sua escolha, respeitando a programação via Meta Business Suite. O volume mensal considerado dentro do valor do bloco de Stories Fotográficos é de 4 a 6 stories por dia útil (de segunda a sábado, exceto domingo), o que representa uma média de 104 a 156 stories por mês.\n\n<strong>Sobre gravações com equipe:</strong> dia, horário e equipe envolvida em gravações de Reels são definidos com antecedência. Quando não for possível produzir por indisponibilidade da equipe, o item simplesmente não é cobrado naquele mês.',

            porQueAtualizado: 'Nos últimos meses, os valores de Reels, posts, carrosséis e o próprio formato de contratação foram revistos com base no que já vem sendo praticado em outros trabalhos, tanto unitários quanto em pacote fixo. Essa atualização não é pontual para este contrato, é uma revisão geral de método de trabalho.\n\nAlém disso, o modelo de pacote fechado se mostrou limitado: ele obriga a entrega de um volume fixo por mês, independente da real necessidade daquele momento. O modelo unitário resolve isso. Você paga pelo que for de fato produzido e aprovado, com liberdade total de incluir ou retirar itens do pacote, mês a mês, de acordo com o que fizer sentido para o financeiro daquele período.\n\n<em>Você paga pelo que for de fato produzido e aprovado.</em>',

            fluxoAprovacao: 'No início de cada mês, é apresentado um pré-calendário editorial com um leque de opções de conteúdo, Reels, posts, carrosséis e linha de stories. A partir dessas opções, você escolhe o que faz sentido para aquele momento da farmácia, vacina e academia. Com base nessa escolha, o calendário do mês é fechado.\n\nAo longo do mês, ajustes acontecem naturalmente: o que não for produzido sai do fechamento, o que for pedido a mais entra. O fechamento final do mês reflete exatamente o que foi aprovado e produzido, nada é publicado sem essa confirmação prévia.\n\n<strong>Como funciona a contratação, mês a mês:</strong> não existe obrigação de contratar sempre os mesmos itens. Em um mês, você pode contratar um post estático, dois carrosséis e dez Story Arte, sem o bloco de Stories Fotográficos. No mês seguinte, pode optar pelo bloco fechado de Stories Fotográficos, sem nenhum Story Arte. O bloco de Stories Fotográficos tem valor fixo de R$200/mês e cobre a sessão mensal de produção que alimenta os stories programados. Qualquer necessidade fora do que já foi programado, como um Story Arte pontual, entra à parte no fechamento do mês.\n\n<strong>Sobre o banco de imagens:</strong> como a produção fotográfica acontece uma vez por mês, é natural que, em pilares com poucas variações de produto, as mesmas imagens sejam reaproveitadas ao longo das semanas em que esse tema aparece. Isso não significa repetição do conteúdo como um todo, é reaproveitamento estratégico de material dentro do mesmo pilar, prática comum em qualquer operação baseada em banco de imagens. Caso prefira, é possível também não contratar o bloco de Stories Fotográficos em determinado mês, e retomar quando fizer sentido. A liberdade de ajustar vale para qualquer item do serviço.',

            extensaoAcademia: 'Toda a lógica apresentada neste documento, contratação unitária, sem pacote fechado, com liberdade de incluir ou retirar itens mês a mês, se aplica também à academia, a partir de julho de 2026. Os valores atualizados apresentados aqui passam a valer igualmente para os serviços da academia.\n\nDiferente do modelo anterior, agora, se surgir a necessidade de algum story específico, ele é adicionado normalmente dentro da demanda do mês, com total liberdade.\n\n<strong>Como funciona a organização entre farmácia, vacina e academia:</strong> farmácia e sala de vacinas operam sob o mesmo CNPJ e o mesmo pagamento. Por isso, o pré-calendário editorial mensal é montado de forma unificada: as opções apresentadas misturam conteúdo de farmácia e de vacina. Você escolhe livremente dentro desse leque combinado, e o fechamento do mês, assim como o relatório final, também é entregue de forma unificada, sem separação de valores entre farmácia e vacina. A academia, por ter CNPJ próprio, funciona de forma independente: pré-calendário próprio, contratação própria e relatório próprio, separados do que é produzido para farmácia e vacina.'
        },

        simulacoes: [
            { composicao: '2 Reels + 3 Carrosséis + 3 Posts estáticos', valor: 500 },
            { composicao: 'Stories Fotográficos + 2 Reels + 3 Posts estáticos + 5 Story Arte', valor: 655 },
            { composicao: 'Stories Fotográficos + 4 Reels + 2 Carrosséis', valor: 730 },
            { composicao: 'Stories Fotográficos + 4 Reels + 3 Carrosséis + 3 Posts estáticos', valor: 900 }
        ],

        catalogos: {
            farmaciaVacinas: {
                mes: 'Julho 2026',
                videos: [
                    {
                        titulo: 'Estacionamento (Farmácia)',
                        roteiro: 'Abertura com cena de trânsito, alguém procurando vaga na avenida, tom levemente frustrado. Narração: "Sabe aquele tempo perdido procurando vaga pra fazer uma compra rápida?" Corte pra fachada da Desconto Fácil, câmera revela o estacionamento exclusivo. Narração: "Aqui na Desconto Fácil isso não é problema. Estacionamento próprio, pra você resolver rápido e sem estresse." Fecha com um colaborador acenando na entrada, convite simples pra visitar.'
                    },
                    {
                        titulo: '"A mais completa da cidade" (Farmácia)',
                        roteiro: 'Abertura na fachada, colaborador aparece numa entrada, acena e convida a câmera a entrar. Narração: "Por que a gente insiste em dizer que somos a farmácia mais completa da cidade?" Corte pra dentro, o colaborador guia o passeio por: linha completa de ortopédicos e itens hospitalares (aluguel e venda de cadeira de rodas, muletas, andadores), medicamentos e perfumaria, higiene pessoal, sala de vacinas, perfuração de orelha, aferição de glicose e pressão, testes rápidos (influenza, covid). Fecha com o colaborador de volta na entrada: "tudo isso, num só lugar, perto de você."'
                    },
                    {
                        titulo: 'Teatro "bate na porta" — tema HPV (Vacinas)',
                        roteiro: 'Cliente entra e pergunta: "Roselia, posso te perguntar uma coisa? Vacina de HPV, isso é só pra mulher?" Roselia responde desconstruindo o mito, explica que é recomendada também pra homens, fala da faixa etária ideal e da importância da prevenção. Cliente pergunta o que muitos têm vergonha de perguntar: "dói muito?", "quantas doses são?" Roselia responde com informação real, tom tranquilizador. Fecha convidando pra agendar na sala de vacinas.'
                    },
                    {
                        titulo: 'Depoimento real — tema Autocuidado, gancho 24/07 (Vacinas)',
                        roteiro: 'Vídeo em formato depoimento, entrevistador não aparece em quadro, só a voz conduzindo. Casting: cliente ou colaborador espontâneo, que já se vacinou na farmácia. Perguntas: "Por que você escolheu a Desconto Fácil pra se vacinar?" / "Como foi o antes, o processo de marcar?" (resposta reforçando que a farmácia entra em contato, ajuda a encontrar melhor dia e horário) / "E na hora, como foi o atendimento?" / "E depois, teve algum acompanhamento?" (ponto mais forte: a farmácia retorna contato pra saber como a pessoa está) / Fechamento livre: "o que você diria pra quem está em dúvida se vacina ou não?" Gancho: dia 24/07, Dia Internacional do Autocuidado (calendário grupoasfar).'
                    },
                    {
                        titulo: 'Teatro família — tema Herpes Zoster, com Luigi e Dona Marlene (Vacinas)',
                        roteiro: 'Casting: Luigi (filho da Roselia) e Dona Marlene (mãe da Roselia), pessoas reais assistidas pela farmácia. Roteiro: Luigi comenta: "Vó, você viu que tem vacina pra evitar aquela cobreiro que a senhora teve?" Dona Marlene reage surpresa. Luigi explica que é a vacina de herpes zoster, recomendada pra quem já teve catapora ou está na faixa etária de risco. Duas opções de final, a escolher: Final 1 (mais simples, mesmo cenário em casa) — Dona Marlene pega o celular e diz "já vou chamar eles agora pra agendar minha vacina." Final 2 (mais elaborado, dois cenários) — corte pra farmácia, Dona Marlene se vacinando com Luigi ao lado.'
                    },
                    {
                        titulo: 'Depoimento infantil em cortes — Vacinação geral (Vacinas)',
                        roteiro: 'Formato: gravações curtas e separadas, cada criança respondendo o mesmo roteiro, editado em cortes intercalados. Casting sugerido: Lara (filha da Luciana), Bento, e uma terceira criança a definir. Perguntas: "Lembra que você veio aqui tomar vacina no dia tal?" / "Como foi aquele dia? Você estava com medo?" / "Como foi com a Tia Ro? Doeu muito?" / "E depois, o que você ganhou?" / "Você acha que valeu a pena a picadinha do bem?" Nota: requer autorização das mães por escrito antes da gravação, por envolver imagem de menores.'
                    }
                ],
                carrosseis: [
                    {
                        titulo: 'Kit pra próxima fase (condicional — só ativa se o Brasil classificar)',
                        roteiro: 'Slide 1: "Classificados! Mas calma, você precisa do kit pra próxima fase." Slide 2: kit com produtos associados a situações do jogo (álcool em gel pro "olho colado na TV", vitamina C pra "segurar o coração", energético pro "bocejo de madrugada", protetor labial pro "lábio ressecado de gritar"). Slide 3: "Monte o seu kit pro próximo jogo do Brasil, você encontra tudo aqui na Desconto Fácil."'
                    },
                    {
                        titulo: 'Virose em alta, prevenção continua essencial',
                        roteiro: 'Slide 1: pessoa com sintomas de resfriado. "Os casos de virose estão aumentando, e a prevenção continua sendo essencial." Slide 2: "Com mais gente circulando com vírus, o risco de transmissão cresce no trabalho, na escola, dentro de casa, no transporte público." Slide 3: "A vacinação ajuda a reduzir riscos, agravamentos e a circulação das doenças."'
                    },
                    {
                        titulo: 'Herpes zoster tem ligação com a catapora',
                        roteiro: 'Slide 1: pessoa real. "Herpes zoster e catapora têm ligação. O vírus da catapora pode continuar no organismo depois da infecção." Slide 2: paleta de cores da farmácia, sem imagem de pessoa. "Ele fica adormecido por anos, e em algum momento pode reativar, causando a herpes zoster." Slide 3: paleta de cores da farmácia, sem imagem de pessoa. "A vacinação reduz o risco dessa reativação."'
                    },
                    {
                        titulo: 'A partir de quantos graus é febre?',
                        roteiro: 'Slide 1: "Afinal, a partir de quantos graus é considerada febre?" Slide 2: "Segundo a nova orientação da Sociedade Brasileira de Pediatria, a febre passa a ser considerada a partir de 37,5°C." Slide 3: "Observe sempre o estado geral da criança, e procure um médico se os sintomas persistirem."'
                    },
                    {
                        titulo: 'Suplementação e emagrecimento',
                        roteiro: 'Slide 1, Proteína: "Começou o tratamento com canetas de emagrecimento? Entenda como a suplementação pode ajudar a manter os resultados." + dica de shake proteico. Slide 2, Vitaminas e minerais: "Seu corpo sente falta de ferro, magnésio, vitamina D, entre outros." + dica de suplementação. Slide 3, Hidratação: "Dor de cabeça, intestino preso ou cansaço sem motivo podem ser sinais de desidratação." + dica de repor eletrólitos.'
                    }
                ],
                posts: [
                    {
                        titulo: 'Posso tomar mais de uma vacina no mesmo dia?',
                        roteiro: 'Legenda: "Sim, na maioria dos casos isso é seguro e recomendado. As vacinas são desenvolvidas pra serem aplicadas juntas, sem sobrecarregar o organismo. Isso ainda ajuda a manter o calendário vacinal em dia e evita atrasos na proteção."'
                    },
                    {
                        titulo: 'Pra que serve a Pneumo 20?',
                        roteiro: 'Legenda: "Protege contra 20 tipos diferentes de bactérias pneumocócicas, que podem causar pneumonia, meningite e infecções no sangue. Indicada principalmente pra crianças com maior risco, idosos e pessoas com doenças crônicas. Agende sua vacina pelo nosso WhatsApp."'
                    },
                    {
                        titulo: 'Pode relaxar na proteção solar durante o inverno?',
                        roteiro: 'Imagem: pessoa em ambiente nublado ou chuvoso. Legenda: "Não. A pele continua exposta aos raios UV, que causam envelhecimento precoce. Use o protetor solar sempre, não é só coisa de verão."'
                    }
                ]
            },
            academia: {
                mes: '',
                videos: [],
                carrosseis: [],
                posts: []
            }
        }
    }
};
