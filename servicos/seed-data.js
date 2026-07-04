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
                mes: 'Julho 2026',
                videos: [
                    {
                        titulo: 'Dança — Se você acha academia monótona, olha isso',
                        roteiro: 'Abertura em corte rápido: alguém numa esteira olhando pro relógio, cara de tédio, repetindo o mesmo movimento mecânico. Narração ou texto na tela: "Se você acha que academia é sempre a mesma coisa..." Corte seco pra dentro da sala de dança, música já tocando, turma inteira em movimento, sorrindo, suando, se divertindo. Câmera circula a turma em vez de ficar parada de frente, dá sensação de estar dentro da aula. Narração: "...você ainda não veio na nossa aula de dança." Fecha com um aluno real, sem roteiro decorado, respondendo em uma frase curta o que ele sente na aula (pode ser espontâneo, gravado logo depois da aula real). Texto final: "Agende sua aula experimental, chama aqui."'
                    },
                    {
                        titulo: 'Step Funcional — Você precisa conhecer essa aula',
                        roteiro: 'Abertura com o instrutor de costas pra câmera, de frente pra turma, contando "3, 2, 1" no ritmo da música, câmera então gira pra mostrar a turma toda subindo e descendo do step em sincronia. Corte pra um detalhe, os pés no step, o som da batida. Narração do instrutor, gravada durante a aula mesmo, tipo "gente, aqui ninguém fica parado" com a energia real da sala. Fecha com a turma reunida, ofegante, rindo, sem cena montada. Texto final: "Você precisa conhecer essa aula. Agende sua experimental."'
                    },
                    {
                        titulo: 'Fut Training — Uma modalidade para cada objetivo',
                        roteiro: 'Abertura com um aluno jovem (ou adolescente) fazendo um exercício de coordenação com a bola, câmera em ângulo baixo pra valorizar o movimento. Narração do professor explicando em uma frase o que a modalidade trabalha, agilidade, reflexo, controle de bola, sem jargão técnico demais. Corte pra um exercício em dupla ou em grupo, mostrando interação, não só técnica individual. Fecha com o professor olhando pra câmera: "Se o objetivo dele é evoluir no futebol, é aqui que a gente trabalha isso." Texto final: "Uma modalidade pra cada objetivo. Vem conhecer o fut training."'
                    },
                    {
                        titulo: 'Ballet Baby Class — Mais que uma aula, pequenas bailarinas, grandes descobertas',
                        roteiro: 'Abertura suave, sem pressa, mostrando os detalhes que emocionam quem é mãe, a sapatilha sendo calçada, o coque sendo feito, a criança se olhando no espelho da sala. Corte pra dentro da aula, professora conduzindo com paciência, crianças tentando reproduzir o movimento, alguns erros bonitos no meio do caminho. Sem narração forçada aqui, deixar a trilha e as imagens reais carregarem o vídeo, com no máximo uma frase em texto na tela: "Mais que uma aula. Pequenas bailarinas, grandes descobertas." Fecha com uma criança fazendo uma reverência simples pro grupo, aplausos. Texto final: "Agende a aula experimental da sua pequena."'
                    },
                    {
                        titulo: 'Eletroestimulação — 25 minutos que podem transformar seu treino',
                        roteiro: 'Abertura com o equipamento sendo colocado no aluno, close nas mãos do instrutor ajustando, sem parecer procedimento médico frio, mostrar que é acompanhado e tranquilo. Narração: "Já ouviu falar em eletroestimulação?" Corte pro aluno já em movimento com o equipamento, fazendo um exercício funcional simples, o instrutor ao lado orientando. Narração segue: "25 minutos de treino, tecnologia trabalhando junto com o seu esforço, pra potencializar o resultado." Fecha com o aluno tirando o equipamento, expressão de quem terminou algo intenso, mas satisfeito. Texto final: "Quer sentir a diferença? Agende sua aula experimental de eletroestimulação."'
                    },
                    {
                        titulo: 'Flash Back — Volte no tempo no embalo do passinho',
                        roteiro: 'Abertura com uma música de época tocando (referência de outra década), aluno ou instrutor entrando em cena com uma roupa ou gesto que remete ao estilo antigo, brincando com a nostalgia. Corte pra dentro da aula, turma toda dançando o passinho ou coreografia retrô, clima de resgate, não de aula séria. Pode intercalar com um clipe de arquivo real (se tiver foto ou vídeo antigo da academia ou da modalidade) pra reforçar o "volta no tempo". Fecha com a turma toda animada, sem cara de ensaiado. Texto final: "Bateu a saudade? Volta pra dançar com a gente. Agende sua aula experimental."'
                    }
                ],
                carrosseis: [
                    {
                        titulo: 'Conheça todas as modalidades da FOCCUS',
                        roteiro: 'Slide 1 (capa): "Você sabia que a FOCCUS tem uma modalidade pra cada momento da sua rotina?" Slide 2, Musculação Completa + Personal Trainer (consolidado): tela dividida ao meio, lado esquerdo com foto de aluno em treino de musculação, ícone de halter pequeno nesse lado; lado direito com foto do personal orientando o aluno, ícone de prancheta pequeno nesse lado. Texto: "Musculação Completa e Personal Trainer, treino livre ou acompanhamento de perto, você escolhe." Slide 3, Step Funcional: "Ritmo, resistência e energia em cada subida." Slide 4, Fut Training: "Desenvolvimento técnico pra quem quer evoluir no futebol." Slide 5, Ballet Infantil: "Pequenas bailarinas, grandes descobertas." Slide 6, Linha de Dança (consolidado): fundo com foto de turma dançando, energia de grupo, sem focar em nenhum estilo específico. Quatro ícones dispostos em formato de quadrado (dois em cima, dois embaixo), um pra cada estilo: dança de salão, dança urbana, dança fitness, dança flashback. Texto: "Dança de Salão, Dança Urbana, Dança Fitness, Dança Flashback. Tem um ritmo pra cada pessoa." Slide 7, Eletroestimulação: "25 minutos que podem transformar seu treino." Slide 8 (fechamento): "Qual dessas você quer experimentar primeiro? Agende sua aula experimental, chama no direct."'
                    },
                    {
                        titulo: 'Você conhece a eletroestimulação?',
                        roteiro: 'Slide 1 (capa): foto do aluno com o equipamento, expressão de esforço real. Texto: "Você conhece a eletroestimulação?" Slide 2 (benefício 1, ativação muscular): "Enquanto um treino convencional ativa os músculos por grupo, de forma isolada, a eletroestimulação ativa cerca de 300 músculos ao mesmo tempo, incluindo os mais profundos, que são mais difíceis de alcançar no treino tradicional." Slide 3 (benefício 2, efeito que continua): "O trabalho muscular não termina quando a sessão acaba. O estímulo continua reverberando nas células por até 72 horas depois do treino." Slide 4 (benefício 3, baixo impacto + tempo): "É de baixo impacto nas articulações, ideal pra quem está retomando a rotina ou tem alguma restrição de movimento. Em 20 a 25 minutos, o corpo inteiro é trabalhado, sem precisar encadear séries longas como no treino tradicional." Slide 5 (CTA): "Quer sentir a diferença? Agende sua aula experimental de eletroestimulação."'
                    },
                    {
                        titulo: 'O treino dos craques, mais perto do que você imagina',
                        roteiro: 'Slide 1 (capa, thumb bem chamativa): foto de um aluno real da FOCCUS com o equipamento de eletroestimulação, ângulo dinâmico, cores fortes. Texto: "O treino usado pelos maiores atletas do mundo já está aqui na sua cidade." Slide 2: "A eletroestimulação de corpo inteiro é usada há anos por atletas de altíssima performance, incluindo nomes como Cristiano Ronaldo, dentro da preparação física de ponta." Slide 3: "Não é só pra quem é atleta profissional. O mesmo estímulo por trás do treino de alto rendimento está disponível aqui, adaptado ao seu ritmo e objetivo." Slide 4 (CTA): "Quer sentir o treino de alto rendimento na prática? Agende sua aula experimental de eletroestimulação na FOCCUS."'
                    },
                    {
                        titulo: '3 exercícios que não podem faltar no seu treino de glúteo',
                        roteiro: 'Slide 1 (capa): "3 exercícios que não podem faltar no seu treino de glúteo." Slide 2, Terra Sumô: "Terra Sumô: pernas mais afastadas, pegada mais próxima, um dos exercícios mais completos pra ativação de glúteo e posterior de coxa." Slide 3, Agachamento Normal: "Agachamento Normal: a base de qualquer treino de glúteo e perna, simples e extremamente eficiente quando bem executado." Slide 4, Agachamento Búlgaro: "Agachamento Búlgaro: uma perna de cada vez, apoio elevado atrás, exige equilíbrio e isola ainda mais o trabalho do glúteo." Slide 5 (fechamento/CTA): "Já treina esses três? Se não, bora incluir no seu próximo treino. Marque um horário com nossos professores."'
                    }
                ],
                posts: [
                    {
                        titulo: 'Musculação Completa',
                        roteiro: 'Foto de um aluno real no meio de uma execução de força (ex: agachamento ou levantamento), expressão de esforço genuíno, não sorriso de banco de imagem. Fundo desfocado mostrando os equipamentos da sala de musculação. Emblema no canto: um halter estilizado. Texto na imagem: "Musculação Completa". Legenda: "Aqui não é só levantar peso, é construir constância. Estrutura completa pra todo tipo de treino. Agende sua aula experimental."'
                    },
                    {
                        titulo: 'Personal Trainer',
                        roteiro: 'Foto do personal ao lado do aluno, em pleno acompanhamento de um exercício, mão orientando a postura, os dois olhando pro movimento e não pra câmera. Fundo desfocado da sala. Emblema no canto: uma prancheta ou apito estilizado. Texto na imagem: "Personal Trainer". Legenda: "Treino pensado só pra você, com acompanhamento de perto em cada repetição. Quer saber como funciona? Chama no direct."'
                    },
                    {
                        titulo: 'Step Funcional',
                        roteiro: 'Foto do aluno no ar ou no meio do movimento sobre o step, ângulo baixo pra valorizar a dinâmica. Fundo desfocado da sala de aulas coletivas. Emblema no canto: um step estilizado visto de lado. Texto na imagem: "Step Funcional". Legenda: "Ritmo, resistência e muita energia em cada subida. Vem sentir na prática. Agende sua aula experimental."'
                    },
                    {
                        titulo: 'Fut Training',
                        roteiro: 'Foto de um aluno jovem em contato com a bola, num gesto técnico (domínio, condução), câmera baixa pra dar sensação de campo. Fundo desfocado da quadra ou espaço de treino. Emblema no canto: uma bola estilizada. Texto na imagem: "Fut Training". Legenda: "Uma modalidade pra cada objetivo, aqui o foco é desenvolver técnica e reflexo. Vem conhecer o Fut Training."'
                    },
                    {
                        titulo: 'Ballet Infantil',
                        roteiro: 'Foto de uma criança em posição de ballet (mesmo que simples, como um plié ou braço em arabesque), expressão concentrada e genuína. Fundo desfocado da sala de dança, espelho ao fundo. Emblema no canto: uma sapatilha de ballet estilizada. Texto na imagem: "Ballet Infantil". Legenda: "Mais que uma aula, pequenas bailarinas, grandes descobertas. Agende a aula experimental da sua pequena."'
                    },
                    {
                        titulo: 'Dança de Salão',
                        roteiro: 'Foto de um casal ou dupla em movimento de dança de salão, close suficiente pra mostrar sincronia entre os dois. Fundo desfocado da sala. Emblema no canto: duas notas musicais entrelaçadas ou um par estilizado. Texto na imagem: "Dança de Salão". Legenda: "Elegância, conexão e ritmo em cada passo. Vem descobrir a dança de salão."'
                    },
                    {
                        titulo: 'Dança Urbana',
                        roteiro: 'Foto de um aluno em pleno movimento de dança urbana, energia forte, roupa e postura que remetem ao estilo. Fundo desfocado da sala com iluminação mais contrastada. Emblema no canto: um símbolo de raio ou estrela urbana estilizada. Texto na imagem: "Dança Urbana". Legenda: "Se você acha academia monótona, olha isso. Energia pura em cada aula de dança urbana."'
                    },
                    {
                        titulo: 'Dança Fitness',
                        roteiro: 'Foto da turma em movimento sincronizado, capturando o coletivo, não só uma pessoa, transmitindo energia de grupo. Fundo desfocado da sala cheia. Emblema no canto: um coração com pulso estilizado. Texto na imagem: "Dança Fitness". Legenda: "Diversão e queima de energia juntas numa aula só. Vem se movimentar com a gente."'
                    },
                    {
                        titulo: 'Dança Flashback',
                        roteiro: 'Foto de um aluno ou turma com algum elemento visual que remeta a outra época (figurino, gesto, clima nostálgico), sem exagerar pra não parecer fantasia. Fundo desfocado da sala. Emblema no canto: uma nota musical antiga ou disco de vinil estilizado. Texto na imagem: "Dança Flashback". Legenda: "Bateu a saudade? Volta no tempo no embalo do passinho. Agende sua aula experimental."'
                    },
                    {
                        titulo: 'Eletroestimulação',
                        roteiro: 'Foto do aluno já com o equipamento colocado, em pleno exercício funcional, expressão de esforço real, instrutor por perto orientando (pode aparecer parcialmente no quadro). Fundo desfocado da sala. Emblema no canto: um raio ou ícone de pulso elétrico estilizado. Texto na imagem: "Eletroestimulação". Legenda: "25 minutos que podem transformar seu treino. Já conhece a eletroestimulação? Agende sua aula experimental."'
                    },
                    {
                        titulo: 'Aula Experimental',
                        roteiro: 'Foto ampla do espaço da academia com movimento real acontecendo, gente treinando ao fundo, boa luz, ambiente vivo. Texto na imagem: "Sua aula experimental está esperando por você". Legenda: "Chega de adiar. Vem conhecer de perto a estrutura, os professores e o método que já transformou a rotina de quem já treina aqui. Aula experimental gratuita, sem compromisso. Chama no direct e agenda a sua."'
                    },
                    {
                        titulo: 'Conheça Nossa Equipe',
                        roteiro: 'Foto de grupo posada, bem produzida, com todos os instrutores/professores da FOCCUS reunidos, boa iluminação, composição pensada (em frente a um elemento que identifique visualmente o espaço), todos organizados e sorrindo pra câmera. Texto na imagem: "Quem cuida do seu treino, todos os dias". Legenda: "Cada professor aqui tem um papel na sua evolução, do primeiro dia até o resultado que você está buscando. [Nome do colaborador 1], [função]. [Nome do colaborador 2], [função]. [Nome do colaborador 3], [função]. Alguém da equipe não está nessa foto? Pode ser que tenha entrado depois da gravação, estivesse de folga no dia, ou já tenha sido registrado em outro momento, a equipe cresce e essa foto será atualizada em breve pra sempre representar todo mundo. Vem treinar com quem realmente entende do assunto."'
                    }
                ],
                notas: {
                    posts: 'Observação sobre este bloco de modalidades: existem duas formas de trabalhar o mesmo conteúdo, a escolha é sua. Opção 1, Post estático (os 10 itens acima, R$35 cada, R$350 no total se optar por todas as dez): a vantagem é que cada modalidade fica fixada individualmente na grade do perfil. Quem entra no Instagram vê tudo de forma explícita, sem precisar arrastar nada, é visual e direto. A desvantagem é o investimento, por ser conteúdo produzido peça por peça. Opção 2, Carrossel único com todas as modalidades (item "Conheça todas as modalidades da FOCCUS" na lista de Carrosséis): a vantagem é a economia, um único item cobre as dez modalidades. Pra isso funcionar dentro de um formato mais enxuto, algumas modalidades aparecem agrupadas no mesmo slide (Musculação Completa com Personal Trainer, e as quatro variações de dança reunidas num slide só), em vez de uma modalidade por slide como seria no post estático. A desvantagem é justamente essa: com várias modalidades por slide e uma sequência mais longa, existe o risco de quem visualizar não arrastar até o final e acabar não vendo todas as opções, ou de não perceber o detalhe individual de cada modalidade agrupada. Nenhuma opção é melhor que a outra, são formatos diferentes pro mesmo conteúdo, com nível de destaque e investimento diferentes. Fica a critério de vocês decidirem o que faz mais sentido pro mês.'
                }
            }
        }
    }
};
