# CLP

Proposta de **C**ódigo **L**ocalizador de **P**ortão: recomendações, estudos de viabilidade e consulta pública.

A ideia central do CLP é **oferecer de maneira simples e padronizada, através de um código, a localização geográfica de um portão**. O código seria usado também como um **"endereço do *local*"** ao qual o portão dá acesso. Portão, porta, porteira ou portal. <!--O código seria como que o endereço do portão (ou porta, porteira, portal),  válido como "endereço do *local*" ao qual o portão dá acesso.-->

As tecnologias para se padronizar um CLP  são bem consolidadas, existem opções como o [Geohash](http://geohash.org/6gyf4bf1n), [S2](https://s2.sidewalklabs.com/regioncoverer/?center=-23.550385%2C-46.633956&zoom=20) ou [PlusCode](https://plus.codes/588MC9X8+RC), que são padrões abertos, e [MapCode](http://www.mapcode.com/getcoords.html?iso3=331&mapcode=RR.56&xx=-46.633956&yy=-23.550385) ou Whats3words, patenteados mas úteis como exemplo. Estas opções podem ser melhor adaptadas às condições e padrões locais do Brasil, e nisto consistirá uma parte do estudo e no diferencial das recomendações.

E o CLP poderia ser algo mais tradicional, um código expressando de maneira compacta "estado, cidade, nome do logradouro e número de portão". Esta segunda forma não será *a priori* a recomendada, mas dela extraiu-se o requisito de hierarquia de códigos, iniciando pelos já bem conhecidas  siglas de 2 letras do estado e, menos conhecidas, siglas de 3 letras da cidade.

<!-- tem sido sonhado e por vezes proposto por prefeituras, autarquias, secretarias, empresas, até entregadores de pizza...

 ... O CLP não é algo novo, tem sido sonhado e por vezes proposto por prefeituras, autarquias, secretarias, empresas, até entregadores de pizza... Existem opções satisfatórias, resta  adaptá-las melhor às necessidades do Brasil e estabelecer o consenso em torno da melhor opção. *A presente proposta é um estudo sério  e pragmatico das opções*. -->

![](assets/ilustra-escalas01.jpg)

O CLP endereçaria **qualquer tipo de portão**: aquele que dá acesso à via principal de uma vila, a porta de entrada da casa da cidade grande, a portaria do prédio, o portal de um parque, a porteira da fazenda... Por exemplo a localização "São Paulo, Av. Paulista 1578", marca o centro da face de quadra do [MASP](http://wikidata.org/entity/Q82941), e os "portões" de fato são 3 (porta do elevador, corrente da escada-acima e portão da escada-abaixo), concentrados na altura do que seria o número 1560, de modo que nenhum deles correspondendo exatamente à numeração predial adotada.

A rigor esse "portão genérico" adotado pelo CLP é um "ponto de acesso ao lote", de maneira que **há um vínculo entre o CLP e o [lote](https://en.wikipedia.org/wiki/Land_lot)**, e entre a precisão do CLP (erro nas coordenadas do ponto que ele representa) e o tamanho da área ocupada pelo lote.<!-- See justifica pois toda localidade de habitação, trabalho ou utilidade pública é  merecedora de um endereço público. --> Além dessa indepência do tipo de portão, o CLP se prestaria a múltiplos usos, destando-se:

  1. Servir de endereço oficial ou componente do endereço oficial:

    1.1. Servir (potencialmente) de [**código postal**](https://schema.org/postalCode), em [substituição ao CEP](https://github.com/OSMBrasil/CRP/blob/master/substituir-CEP.md).

    1.2. Servir de **endereço oficial do portão**, em bases de dados padrões de interoperabilidade,
  no sentido de ser identificador único de uma via de acesso, ou de um ponto ou região esratégica do lote.

    1.3. Servir de **endereço principal do lote**, quando no papel de identificador do *"portão principal"*. É portanto um componente  ao "esquema de identificação unívoca do lote" ao qual pertence o portão. <br/>Componente de redundância no caso de esquemas de identificação de lotes como do [SINTER](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/decreto/D8764.htm),<!-- ver tb. http://idg.receita.fazenda.gov.br/noticias/ascom/2016/maio/unificacao-de-dados-traz-simplificacao-e-mais-seguranca-na-titularidade-de-imoveis --> mas num papel de maior relevância do que o CEP. Recomenda-se inclusive que o SINTER e o CLP façam uso de infraestrutura comum  &mdash; na prática façam uso de mesmo prefixo nos respectivos identificadores.<!--
  <br/>O CLP seria aceito por exemplo  registrar o CLP da residência no cartório, caracterizar pelo seu CLP a  habitação no censo demográfico, ou registrar a sede da empresa na prefeitura pelo CLP da portaria principal. <br/>Neste contexto é proposto que o CLP seja interoperável com o código identificador de lote previsto pelo [SINTER](http://idg.receita.fazenda.gov.br/noticias/ascom/2016/maio/unificacao-de-dados-traz-simplificacao-e-mais-seguranca-na-titularidade-de-imoveis) (a proposta aliás é discutir junto o futuro padrão de identificação). <br/>Apesar da caixa de correio não ser um portão, deve-se acrescentar o [endereço para correspondência](https://schema.org/PostalAddress) como mais uma forma de uso do CLP, que neste caso viria a substituir o [problemático CEP](https://pt.stackoverflow.com/a/63936/4186). [{conferir versão nova do MANUAL DO SINTER onde esboçam o identificador de lote.  http://idg.receita.fazenda.gov.br/sinter/manuais-operacionais/arquivos-e-imagens/manual-operacional-sinter-modelo-de-dados-registrais-e-notariais-v1_0.pdf).}]
  -->

  2. Instruir aplicativos sobre as **coordenadas geográficas do portão**. Essa coordenada  teria precisão da ordem de **3 metros no meio urbano** e da ordem de **15 metros no meio rural**.<br/>Neste contexto o principal requisito  de interoperabilidade é que o código seja compatível  com as normas Web (ISO, W3C e RFC) para expressão de parâmetros em [URIs](https://tools.ietf.org/html/rfc3986). <br/>Exemplos: visualizar um CLP em destaque no OpenStreetMap, postar o CLP no Whatsapp para avisar os amigos do local da festa, digitar o CLP no Uber,  falar o CLP no telefone para garantir o local exato da entrega da pizza.

## Objetivo e metas do trabalho

Objetivo geral:

Objetivos específicos, metas e resultados revistos:

1. Estabelecer formalmente os **requistos do CLP**, traduzindo em parâmetros objetivos as decisões tomadas a posteriori pelo govervo ou consenso da comunidade.

2. Levantamento, com apoio da Comunidade OpenStreetMap Brasil e Wikipedia, das principais soluções. A cada solução avaliar se a solução satisfaz  os requisitos e se existem casos de uso. Em seguida classificar variantes quando existirem alternativas ou parametrizações.

3. Definição, com apoio da Comunidade, de um conjunto de testes (*benchmark*) ao qual todas as soluções serão submetidas, estabelecendo critérios de rejeição e parâmetros de comparação


3. Verificar a reproducibilidade da metodologia e algorimos. Havendo código de licença aberta (pré-requisito) testes automatizados serão gerados.

4. Auditorar o grau de abertura das soluções candidatas:

   1.1. Licença de uso do software, e dos dados de apoio que garantem, livre de pantentes, a resolução do endereço (transformar o código em coordenada geográfica);

   1.2. Licenças e grau independência nas soluções vinculadas: geocodificação, QR Code, roterização, etc.


o "endereço de portão", ou seja, endereço para um amigo chegar até a sua casa para uma visita, [endereço para correspondência](https://schema.org/PostalAddress), endereço para entregas entre empresas ou empreendimentos em Logística, endereço de um equipamento social, etc. A referência, independente da aplicação, é o conceito generalizado de "portão".

O que é um CLP?

Um Código Localizador de Portão, CLP, é como um endereço postal ou de entregas, para quem tem e quem tem e quem não tem um endereço oficial, para quem mora na cidade grande ou no meio rural. O  CLP precisa fornecer endereços para todos, em qualquer lugar do Brasil, permitindo que lá chegue a ambulância, o bombeiro, a policia e a prefeitura, assim como entregas, correspondências e os amigos.

Um endereço de código mais parece um endereço regular, mas com um código curto, onde o nome da rua e o número seriam. Esses endereços existem para qualquer local, mesmo em locais onde não há estradas.


---

O intuito deste projeto é apresentar recursos tecnológicos, provas de conceito e metodologias para a Comunidade OpenStreetMap e o cidadão brasileiro em geral. O foco é o "endereço de portão", ou seja, endereço para um amigo chegar até a sua casa para uma visita, [endereço para correspondência](https://schema.org/PostalAddress), endereço para entregas entre empresas ou empreendimentos em Logística, endereço de um equipamento social, etc. A referência, independente da aplicação, é o conceito generalizado de "portão".

Existe por trás disso o [Direito de Ir e Vir](http://www.conteudojuridico.com.br/artigo,direito-de-ir-e-vir-na-sociedade-brasileira,53479.html) (até o portão); o [Direito de Habitar](https://pt.wikipedia.org/wiki/Direito_%C3%A0_moradia), de ser dono de um portão (com pleno usufruto do mesmo); o [Direito de ser Informado](https://pt.wikipedia.org/wiki/Direito_da_informa%C3%A7%C3%A3o#Direito_%C3%A0_informa%C3%A7%C3%A3o) da localização precisa de um serviço público ou de uma sede institucional; além das questões de **custo**: buscamos exercer nossos direitos de forma o menos onerosa possível, idealmente a custo zero.

A grosso modo o **endereço de portão é um ponto geográfico**, com as suas coordenadas de latitude e longitude, e com uma certa resolução: um quadrado de **3m×3m em espaço urbano**, posicionando uma porta de casa sem confundir com o vizinho ou com o outro lado da rua; e um quadrado **15m×15m em espaço rural** (assim como também em parques e grandes propriedades), posicionando uma porteira de estratada, uma casa sem fachada, um pórtico, uma portaria, ou algo similar.

![](assets/ilustra-escalas01.jpg)

> A função do **CLP** é portanto localizar geograficamente, através de um códigio curto, um "portão genérico", de utilidade pública ou de interesse do cidadão.

## Soluções levantadas

Geocoding systems typically use more than one geographic reference dataset to improve match rates and spatial accuracy, resulting in multiple candidate geocodes from which the single 'best' result must be selected

Existem dois grupos principais de "soluções para endereçamento de portão":

1. Soluções baseadas na **proximidade do portão com uma via de acesso** a ele.
2. Soluções baseadas na **coordenada geográfica do portão**.

Tecnicamente uma pode ser convertida na outra através de [procedimentos de geocodificação](https://en.wikipedia.org/wiki/Geocoding#Geocoding_process).

Entre as soluções conhecidas, no presente entende-se que necessitam ser "soluções codificáveis", ou seja, que possam ser traduzidas em um *número identificador do endereço*. Esse número pode ter uma representação alternativa, não precisa ser estritamente decimal (pode usar letras como no heaxadecimal), mas precisa resultar em um código **código curto** &mdash;  sugere-se códigios de no máximo ~6 caracteres não-mnemônicos, totalizando máximo de ~12 caso  apresente também blocos mnemônicos.

Por exemplo o ponto do marco-zero de São Paulo é a coordenada `-23,5503270/-46,6339431`, que consome 23 caracteres... Para uma resolução de ~4 metros, reduziriam-se a 21 caracteres, uma cadeia ainda muito longa para se memorizar. Se a mesma coordenada for codificada em [Geohash](https://en.wikipedia.org/wiki/Geohash) como `6GYF4BF1Y`, fica reduzida a 9 caracteres. Como o prefixo `6G` de Geohash aparece em todos os pontos do município, pode-se reduzir para um mnemônico do tipo _"**Sampa-YF4.BF1Y**"_, com prefixo fácil de memorizar, e código de 7 caracteres,  palatável para a memória e comunicação entre humanos.

![](assets/marcoZeroSP.png)

Quanto aos critérios de seleção, os principais são o custo e o risco de alto custo no futuro.

Se um  *sistema de localização baseada no código* não é eficiente, a sua  baixa eficiência pode ser traduzida em "alto custo para quem quer chegar no endereço". Não existem estatísticas no Brasil, mas é um custo mensurável e objetivo. Já o  critério de "risco de alto custo no futuro", se traduz na seleção de licenças abertas e identificadores transparentes:

* Algo que não faça uso de licenças abertas ([licenças _OpenDefinitoin_](https://opendefinition.org/od/2.0/pt-br/)), mesmo que não tenha custo hoje, corre sério risco de ser explorado pelo seu licenciador (proprietário) amanhã. <!-- por exemplo Mapcode e What3words são patenteados http://www.mapcode.com/makecpp.html?src=php#terms -->

* Um [identificador que dependa de autoridade central](https://doi.org/10.5281/zenodo.159004) não é considerado "transparente", e o *grau de transparência* pode ser expresso pelo grau de comprometimento com uma autoridade central. <br/>Como existem "hierarquias de identificação" (como que caixinhas uma dentro da outra), é suposto que quando mais geral (escalas de país ou Estado são mais gerais que município ou condomínio), maior a necessidade de certa centralização. Hoje identificadores tais como [ISO 3166-2:BR](https://en.wikipedia.org/wiki/ISO_3166-2:BR), dos códigos de duas letras para país (ex. AR, BO, BR) e estado (ex. AM, MG, SP), apesar de serem centralizados pela autoridade ISO, são considerados padrões abertos.

A "autoridade" do identificador, quando realmente necessária, é uma entidade sem fins lucrativos, com governança aberta e democrática... O cidadão não quer se refém de uma empresa que busca maximizar seu lucro, nem refém de troca de favores a "políticos" (risco de corrupção)  numa instituição pública fraca ou desorganizada.

### Problemas históricos considerados

Quando o endereço funciona, é "barato" para o indivíduo, não quer dizer que está sendo barato para a soma de todos os indivíduos e serviços demandados. A análise precisa levar em conta por exemplo custa para uma empresa de logística gerenciar os endereços numa base de dados sua, e quanto custo enviar para o endereço errado quando esse sistema falha.

Historicamente instituições como os Correios vem se beneficiando do [fato de ser autoridade do CEP](https://github.com/OSMBrasil/CRP/blob/master/substituir-CEP.md) e poder cobrar direitos autoriais sobre as listas de códigos, enquanto empresas como Google se beneficiam do caos brasileiro para tornar o cidadão dependente das suas ferramentas de geocodificação.

Do ponto de vista social também são bem conhecidos os problemas, que se somam ao longo da História da Vida Privada do brasilerio, a falta de vontade politica em oferecer um endereço a quem mora em "espaços informais" (ex. favelas) e quem mora no espaço rural.

### Problemas no espaço rural

Mesmo no rico Estado de São Paulo, em pleno 2018, chegar até uma propriedade rural nunca foi simples: as vias não tem nome ou não se sabe, sinalização inexiste; distâncias são imprecisas, referências são perdidas, temporárias. Mesmo com celular, o sinal nem sempre pega.

A dor por esse abandono  é forte para o poder público e para o cidadão... É preciso unir esforços para "dar nome aos bois", identificar com precisão digital, e encontrar a agulha no palheiro.

Há anos que o governo de SP vem tentando oferecer um endereço para o ciadão do meio rural. Acreditamos que o presente estudo possa ajudar as autoridades governamentais a apreciar soluções simples, baratas e viáveis, com  comprovação de conceito realizada com o OpenStreetMap.

## Padrões considerados

O intuito deste projeto é apresentar recursos tecnológicos, provas de conceito e metodologias. Com apoio conjunto da  comunidade de cada município e do governo, acreditamos  ser possível construir um novo protocolo de localização geográfica e de endereçamento. O padrão seria adotado inicialmente por viaturas oficiais da prefeitura, do Estado, para ocorrências policiais, ambulâncias e bombeiros. Consiste em usar métodos simples e tecnologicamente já bem conhecidos... O desafio  se resume a avaliar e adotar padrões.

### Padrões baseados na coordenada geográfica do portão
Conforme comentado acima, os principais padrões envolvidos na escrita de uma coordenada geográfica duradoura e amplamente reconhecida são:

* [ISO 6709](https://en.wikipedia.org/wiki/ISO_6709): as características gerais (inicia por latitude, usa sinal, representa graus, etc.) são estáveis desde 1983, e sua última versão é de 2009.

* [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System): sistema de referência adotado nos mapas digitais universalmente. Estável desde 1984, com revisão em 2004 e ajustes futuros não afetando a resolução nominal para a localização de um portão (3 metros).

### Padrões baseados no endereçamento postal tradicional

O principal padrão para se expressar endereços em conformidade com as tradições nacional e internacional, é  [endereço postal](https://schema.org/PostalAddress). Seus componentes básicos são o nome identificador do logradouro, que é a via de acesso ao portão, e a [numeração predial](https://en.wikipedia.org/wiki/House_numbering), que é a "metragem" da posição do portão sobre a via. Esses dois componentes, para que possam ser codificados de forma compacta, persistente e confiável precisam satisfazer padrões abertos:

* A  via é "batizada" pelo **identificador oficial da via**. Por exemplo [`BR-116`](https://pt.wikipedia.org/wiki/BR-116) é o código de uma via federal primária,  `PIR-033/260` é o código de uma  via municipal terciária. Conforme a escala ou área em que se insere a via, fica estabelecida uma autoridade para a sua manutenção e seu batismo. "Autoridades de batismo" podem ser grosseiramente classificadas por: pública (federal, estadual, municipal), privada (interior de condomínios,  fazendas, etc.) e "natural" (riachos e trilhas naturais de menor uso).

* A numeração predial depende do **"marco zero" da via**, onde inicia a sua "metragem", e de como foi digitalizado o  percurso da via &mdash; se mais retilínio a numeração diminui se mais rugoso a numeração aumenta &mdash;, portanto do registro em meio digital do **"traçado oficial" da via**. Alternativamente traçados satisfatórios (aceitos como "próximos do oficial") podem ter sua métrica ajustada por algumas **amostras de "numeração predial oficial"** ao longo da via.

* **Delimitação do municipio**: sendo a principal "autoridade de batismo da via", e considerando que diferentes municípios podem ter diferentes graus de preocupação com a gestão e  publicidade dos IDs de via, acaba sendo convencionado também que cada via batizada, bem como sua numeração predial,  inicia e acaba dentro dos limites do município. Assim uma via federal ou estadual pode ser rebatizada quando a autoridade local julgar necessário. Desse processo resulta a dependência do endereçamento com os limites recisos (no mapa) da demarcação oficial do território do município.

### Convenções sobre acurácia na localização do portão

Pode-se supor que, para fins de calibração de mapas ou localização oficial de um endereço, sejam usadas tecnologias mais precisas que aquelas usualmente embarcadas num aparelho de telefonia celular de custo médio. A prinpal tecnologia é a [RTK](https://en.wikipedia.org/wiki/Real-time_kinematic) (*Real-time kinematic*), acessível em todo o território nacional.  Aferições de "marco-zero da via", "metragem da via" e coordenada do portão podem ser obtidos com precisão de metro em aferições oficiais (apresentam custo).

Quanto à convenção da resolução de 3m×3m "sem custo", é uma estimativa para se caracterizar dois portões distintos em espaço urbano, aproximadamente compativel com o limite atual dos sistemas de Multi-GNSS (GPS/GLONASS/Galileo). Largura de automóvel, rua, calçada, e outros parâmetros médios também são compativeis com esse limite. A rigor não existe um padrão &mdash; como referência pode-se citar o sistema [what3words](http://what3words.com), que se compromete com a resolução nominal de 3m×3m, e o sistema [mapcode](). A estimativa de precisão do código Geohash de 9 caracteres também é da mesma ordem de grandeza, ~4 mertros.

## Soluções analisadas e revisadas

A seguir um breve resumo das especificações detalhadas de cada uma das duas soluções:

1. [CLP baseado em coordenadas](spec-CLP-coord.md)
2. [CLP baseado em via](spec-CLP-via.md)

![](assets/CLP-anatomia.png)

-----

Resumindo a **solução baseada em coordenada**: o principal recurso padronizado para se expressar as coordenadas de latitude e longitude de um ponto através de um só número é o padrão Geohash. O que propomos é uma variante do Geohash, que, com o  acréscimo de convenções abertas (derivadas da ISO 3166-2:BR) para referenciar municípios, consegue uma pequena otimização, oferecendo códigos mais curtos e mnemônicos.

![](assets/CLP-resumo1-coord.png) <br/>PS: existem variantes ainda mais compactas do Geohash,  mas elas só serão exploradas como solução se houver confirmação de que o público "sente que o código Geohash é muito grande".

------

Resumindo a **solução baseada em código de via e numeração predial**: um CLP-rural baseado em endereço, por código identificador de via, requer padronização e estabilidade dos códigos de via por parte das "autoridades de batismo", entre elas o governo do estado e os municípios. Já o CLP-urbano baseado em endereços pode fazer uso do "menor CEP da via" como código oficial da via, aproveitando o fato de que a tradução de fragmentos de CEP através do [CRP](https://github.com/OSMBrasil/CRP) não oferece barreiras de direitos autoriais. Todavia nem todo município tem CEP-por-lograsouro, de modo que tais municípios, no seu espaço urbano demandariam mesma solução (e portanto enfrentariam mesmos problemas de identificação de via) que a no espaço rural.

![](assets/CLP-resumo2-vias.png)

------

&#160;&#160;Conteúdos e dados deste projeto são dedicados ao domínio público. Ver também [Créditos das imagens](assets/README.md#Imagens).   <br/>&#160;&#160;[![](assets/CC0-logo-200px.png) ](LICENSE.md)
