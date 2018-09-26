**<center><big>CLP</big></center>**

Proposta de **C**ódigo **L**ocalizador de **P**ortão, CLP: recomendações, estudos de viabilidade e lançamento de consulta pública para a proposta de um padrão.

A ideia central do CLP é **oferecer de maneira simples e padronizada, através de um código, a localização geográfica de um portão**. O código seria usado também como  **"endereço do *local*"** ao qual o portão dá acesso.

Porteira, portão, porta ou portal: no meio urbano a menor distância entre portões é da ordem de 3 metros, no meio rural é da ordem de 15 metros. Portões de condomínios, parques, etc. no meio urbano, requerem menos precisão, como no meio rural.

![](assets/ilustra-escalas01.jpg)

As tecnologias para se implantar e padronizar um CLP  são bem consolidadas, existem opções como o [Geohash](http://geohash.org/6gyf4bf1n), [S2](https://s2geometry.io/) ou [PlusCode](https://plus.codes/588MC9X8+RC), que são padrões livres, e [MapCode](http://www.mapcode.com/getcoords.html?iso3=331&mapcode=RR.56&xx=-46.633956&yy=-23.550385) ou Whats3words, patenteados mas úteis como exemplo. Estas opções podem ser melhor adaptadas às condições e padrões locais do Brasil, e nisto consistirá uma parte relevante dos estudos e recomendações realizados pelo presente projeto.

[Queremos substituir o CEP](https://github.com/OSMBrasil/CRP/blob/master/substituir-CEP.md) por um código que vá além: assim como o CEP, seu prefixo identifica partes maiores, estado, cidade, bairro, rua... E não deveria parar por aí, já existe tecnologia para, com um simples código, chegarmos até o portão!

Para localizar o "portão" do [MASP](https://pt.wikipedia.org/wiki/Museu_de_Arte_de_S%C3%A3o_Paulo), por exemplo.

![](assets/masp-comparing2b.jpg)

Os códigos de localização existentes, como o Geohash ou o PlusCode, podem ser melhorados, **adaptados para o Brasil**, fazer uso do que os brasieiros já usam no dia-a-dia. Deveria ser natural, por exemplo,

* o uso de abreviações consagradas como os **códigos de estado**: `BR-SP` ou simplesmente `SP` designa o Estado de São Paulo, `AM` Amazonas, etc.

* a [abreviação de **3 letras do município**](spec04ap01-siglas.md):  Sampa é `SPA`, a vizinha Guarulhos `GRH` e Piracicaba `PIR`;

* das regras de  **hierarquia**: primeiro sigla estadual depois municipal. A sigla  PIR só tem significado dentro da sua hierarquia, `BR-SP-PIR` significa Piracicaba, que é diferente de `BR-GO-PIR`, de Pires do Rio;

* do **contexto**. Numa carta internacional acrescentamos prefixo `BR` ficando `BR-SP-SPA`, mas se a carta  circula apenas dentro de SP basta `PIR` ou `SPA`.

Isso tudo resultaria em um código CLP mais adequado para o brasileiro usar. As siglas você não vê todos os dias, mas já vinhamos usando: em diversos códigos oficiais, tais como [identificadores LEX de normas jurídicas](https://pt.wikipedia.org/wiki/Lex_(URN)), e nas placas de vias públicas ou mapas oficiais. As siglas estão no código das estradas federais (ex. BR-116), estaduais (ex. SP-147) e municipais (ex. PIR-033).

Voltemos ao CLP do MASP, como é hoje e como seriam pequenas adaptações:

Opção de CLP proposta|Tecnologia de referência (código padrão) e resolução |
----------------------------------|---------------------
**`SP`**     | [**Código ISO** 3166](https://en.wikipedia.org/wiki/ISO_3166-2:BR) do estado (BR-SP)
**`SP:Y`**   | [*Geohash*](http://geohash.org/6gy) da região (`6gy`)&nbsp; ~140x140 km
**`SP-SPA`** | [**Código Oficial** do município](spec04ap01-siglas.md) (`BR-SP-SPA`)
**`SP:YCF`** | [*Geohash*](http://geohash.org/6gycf) da sub-região (`6gycf`)&nbsp; ~4x5 km |
**`SPA-YCFQ.F0`** | [*Geohash*](http://geohash.org/6gycfqf0) do **portão** (`6gycfqf0`)&nbsp; ~25x20&nbsp;m
**`SPA-YCFQ.F0M`** | [*Geohash*](http://geohash.org/6gycfqf0m) de um  ponto (`6gycfqf0m`)&nbsp; ~4x4&nbsp;m
**`SPA-C8QV+CJ`** | [*PlusCode*](https://plus.codes/588MC8QV+CJ) do **portão** (`588MC8QV+CJ`)&nbsp; ~15x15 m
**`SPA-C8QV+CJ4`** | [*PlusCode*](https://plus.codes/588MC8QV+CJ4) de um ponto (`588MC8QV+CJ4`)&nbsp; ~3x3 m
**`SPA-2PP5.5C`**&nbsp;\* | [*S2*](https://s2.sidewalklabs.com/regioncoverer/?center=-23.561540%2C-46.656141&zoom=20&cells=94ce59c94ac) do **portão** (`94ce59c94ac`)&nbsp;<!--94ce--> ~15x15&nbsp;m
**`SPA-1CSI.IN1`**&nbsp;\* | [*S2*](https://s2.sidewalklabs.com/regioncoverer/?center=-23.561540%2C-46.656141&zoom=20&cells=94ce59c94ae1) de um ponto (`94ce59c94ae1`)&nbsp; ~2x2&nbsp;m
&nbsp;\* <small>convertido p. base32.</small>|

No debate devemos chamar atenção para o fato de que o PlusCode não satisfaz o requisito da hierarquia nas macroregiões: é fundamental saber, antes de decidir qual tecnologia usar, quais critérios consensuais adotaremos.

Entre os padrões que satisfazem todos os requisitos, como o Geohash e o S2, outras  otimizações podem ainda ser realizadas, levando a códigos mais curtos ou mnemônicos.  Ao fixarmos em normas brasileiras uma tabela de subregiões do município, por exemplo, podemos reduzir em um dígito ambos os casos S2 e Geohash. Se além disso, fazermos uso de estimativas da "mancha urbana futura" como fizeram o CEP e o MapCode, o resultado fica ainda melhor, mas a custo de códigos mais longos no meio rural... Tudo isso seria detalhado pelo presente projeto, para que tenhamos **subsídios para uma decisão racional**.

O <!-- [levantamento sistemático](locationCodes.md)-->levantamento sistemático, com seleção de otimizações viáveis e a [comparação](comparacao.md) dos resultados otimizados é também tema central da presente proposta, um resultado importante de ser apresentado.
<!--
As recomendações não se limitam à sintaxe dos códigos e sua tradução em latitude-longitude.  Hoje a maioria das aplicações é sensível a contexto, por exemplo meu celular sabe que estou no Estado de São Paulo, onde `PIR` significa Piracicaba, sem risco de confusão com Pirai do Sul (`PIR` no Paraná). São também recomendadas regras de decisão para interpretar prefixos internacionais, tais como `BR-SP` para a capital, mais curto que `BR-SP-SPA`.
-->

# Dois padrões, via e corodenada

Afinal CLP, *Código Localizador de Portão*, faz também papel de "endereço da casa dona do portão".  Falta então definir um outro padrão que é um código que seja uma versão compacta do  endereço postal tradicional. Por exemplo o endereço do MASP,  *"Avenida Paulista 1578, São Paulo"*. Suponhamos que o código oficial da avenida fosse `U131`, então o CLP  resultaria em algo como &nbsp; **`SPA-U131-1578`**.<!-- "u" de urbano, é o  menor CEP da via, no caso a paulista usa 01310-000, teria o ponto por exempl Quintana do CEP 04965-010 seria 4965.01  -->

Esse tipo de código é importante para a representação interna dos endereços de correspondência em bancos de dados abertos, e na comunicação entre bancos de dados (interoperabilidade).  

Existem portanto dois grupos principais de CLPs:

<table border="0"><tr>
<th width="50%">Definição do tipo</th> <th>Aplicações e exemplos</th>
</tr><tr>
<td><b>CLP-via</b>:<br/>Soluções baseadas na <b>proximidade do portão com uma via de acesso</b> a ele. <br/>O CLP-via seria uma escrita simplificada e padronizada do <a href="https://schema.org/PostalAddress" rel="external">endereço postal</a>; o tradicional, baseado em logradouro e numeração predial.
</td><td>Garantiria maior  interoperabilidade entre bases de endereços.
</tr><tr>
<td><b>CLP-coordenada</b>:<br/> Soluções baseadas na <b>coordenada geográfica do portão</b>.<br/> Um algoritmo seguro, do tipo Geohash, PlusCode ou outro, toma como entrada as coordenadas padrão <a href="https://en.wikipedia.org/wiki/Geo_URI_scheme" rel="external">[Geo URI</a>, e devolve um código compacto, que é adotado como CLP.
</td>
<td>Seria um código dado por tecnologias como as exemplificadas, Geohash, S2, PlusCode, etc. Além  do CLP-coordenada de ser proposto como substituto do CEP, seria também proposto como uma opção de expressão de coordenadas dentro do protocolo Geo URI e similares, atingindo um amplo especttro de aplicações.<!-- seria utilizado também localizador em aplicativos, links e outros dispositivos, -->
</td>
</tr></table>

Tecnicamente um tipo pode ser convertido no outro através de [procedimentos de geocodificação](https://en.wikipedia.org/wiki/Geocoding#Geocoding_process). E como existe um crescente *mercado de geocofificação*, a padronização dos dois tipos de CLP  também ajudaria a regulamentar o setor, garantindo a separação entre pré-processamento do CLP-via (que pode envolver abordagens estatísticas e linguísticas), e a geocodificação, que resulta num *Geo URI* com certo grau de confiabilidade.  

com critérios mínimos de custo e confiabilidade na conversão dos mesmos para coordenadas geográficas.

<!-- O CLP neste caso seria uma versão complementar do protocolo `geo` da internet, conhecido como [Geo URI](https://en.wikipedia.org/wiki/Geo_URI_scheme), para a expressão de coordenadas. As tecnologias e convenções candidatas a código seriam aquelas discutidos acima na introdução.-->



# Existe um problema?

Parece haver um certo deslocamento, no debate público, a respeito do real problema e decisões a serem tomadas. Enquanto  há de fato uma grande diversidade de alternativas tecnológicas a serem avaliadas, acreditamos que o problema não seria  tanto responder *"Qual a melhor solução tecnológica?"*, mas sim às perguntas:

1. O que de fato precisamos no Brasil? Como chegar a um consenso racional sobre nossas prioridades?

2. Como adaptar qualquer uma das boas soluções tecnológicas, otimizando-as para as necessidades do Brasil,  incluindo a necessidade de não ficarmos dependentes de multinacionais para isso?

3. Como transformar, mesmo que aos poucos, a decisão consensual em um [padrão *de facto*](https://en.wikipedia.org/wiki/De_facto_standard)? Como garantir que a convenção do CLP venha a ser amplamente adotada?

O que demonstraremos é que, além de ser vantajoso em termos de soberania nacional, a adaptação às condições locais do Brasil são a única maneira de obter um código mais compacto e mais amigável para o brasileiro.

Não basta um padrão "de cima para baixo", sem passar pelas etapas dos itens 1 e 2. Certamente ajudarão e serão relevantes, mas sozinhos, nem o governo federal nem grandes empresas como Google ou Microsoft seriam capazes de impor um padrão *de facto*.  A garantia de racionalidade, soberania e abertura (licenças livres) passa também pelo apoio e adesão gradual nas prefeituras, e o apoio de comunidades acadêmicas e tecnológicas, tais como a OpenStreetMap Brasil.

## Latitude-longitude e contexto, a solução!

O sistema mais amplamente utilizado para localização geográfica é o [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System) em coordenadas decimais, que especifica longitude e latitude usuais dos mapas digitais, uma para cada local na superfície do planeta. Por exemplo, coordenadas WGS84 que identificam o MASP em São Paulo com precisão de ~5m são *"-23.56151,-46.65596"*.<!-- (23°33′41.432″S 46°39′21.458″W) -->

De fato, existe já na internet um padrão para isso, é a [RFC&nbsp;5870](https://tools.ietf.org/html/rfc5870) do **Geo URI**, basta escrever `geo:-23.56151,-46.65596;u=5`... Isso já foi uma grande conquista, o que queremos mais?<br/>São 14 dígitos, o código CLP do MASP precisa ser mais simples e compacto que isso. A solução seria simplesmente compactar, sem reinventar padrões.   Se conseguirmos compactar para uns 7 dígitos sem depender de terceiros, sem fazer uso de tecnologia sofisticada, estaria resolvido!

Na "receita mágica" de [software mais simples e até ingênuo](spec04ap05-ingenuos.md#exemplo-novamente) já se demonstra que isso é possível: sem infraestrutura complexa ou softwares sofisticados compactamos para 7 dígitos, portanto a tecnologia é uma questão secundária, não há ganho maior numa tecnologia ou outra, o ganho maior surge de:

* fazer uso de **normas brasileiras** tais como as abreviações de 3 letras, ou reconhecer a latitude e longitude máximas de cada município;

*  **preservar a autonomia** dos brasileiros em obter seus códigos **sem** depender de uma autoridade central de "batismo" (como o CEP centrado nos Correios) ou uma tecnologia sofisticada, que só multinacinais possam suprir.

# Planejamento
O trabalho foi apenas esboçado,  um banco de dados preparado, alguns testes foram feitos... Mas ainda há muito que ser realizado. A seguir o planejamento detalhado, incluindo metas e prazos.

## Objetivo e metas do trabalho

Objetivo geral: <blockquote>Revisar, debater e publicar os resultados da consulta pública sobre  **especificação técnica e recomendações para um CLP**, bem como disponibilizar protótipos para a realização de testes abertos durante a consulta pública.</blockquote>

Objetivos específicos, metas e resultados previstos:

1. Estabelecer formalmente os **requisitos do CLP**, traduzindo em parâmetros objetivos as decisões tomadas em consenso, primeiramente na comunidade técnica/acadêmica e depois refinando decisões com a comunidade de potenciais usuários.

2. Levantamento, com apoio da comunidade, das **principais soluções e padrões vigentes**. A cada solução avaliar se ela satisfaz os requisitos e se existem casos de uso em prefeituras ou outros países. Em seguida classificar variantes quando existirem alternativas ou parametrizações. <br/>PS: soluções sem  licença aberta ou adaptações em conflito com patentes ou *copyright* já seriam  eliminadas nesta etapa.

3. Estabelecer formalmente **versões adaptadas** e não-adaptadas às condições do Brasil (ao uso de abreviaturas de nomes de cidade por exemplo).

4. Definição, com apoio da Comunidade, de um **conjunto de testes** (*benchmark*) ao qual todas as soluções e suas variantes serão submetidas, estabelecendo critérios de rejeição e parâmetros de comparação.

5. **Relatório dos resultados** de testes principais, alguns eliminatórios.

6. **Oferta pública de protótipos** para a comunidade testar durante um período os padrões e variantes satisfatórios.  

7. **Redação** da especificação técnica do CLP, seguida de disponibilização para **consulta pública** e debate, principalmente terceiro setor,  universidades, etc.

8. **Texto final da especificação técnica do CLP**, redação, e entrega de pareceres.

9. **Apoio a projetos-piloto** com encaminhamento e reutilização da infraestrutura de testes viabilizada.

10. **Diálogo com autoridades** e governo em geral: já vem ocorrendo e vai ocorrer em paralelo, ao longo de todo o processo. Mas com resultados seguros e a legitimação da comunidade, o dilágo deixa de ser consultivo e passa a ser mais propositivo. É quando podemos apoiar e somar esforços com as reais autoridades do assunto, tais como SINTER, IBGE, ABNT, etc.

<br/>Nota: mesmo com sorte e um aceno positivo no item 10, o processo é lento, do item 9 seguiria para uma etapa de adesão por estados e/ou municípios menores (zonas rurais) que demonstrarem interesse em adotar voluntariamente o CLP. Grandes condomínios horizontais e conjuntos de habitações precárias (favelas) também seriam convidados nesta etapa de testes-piloto.

## Custos e prazos

A cada uma das metas acima foram estimadas horas de trabalho bem como tempo mínimo necessário para a discussão com a comunidade e a sua participação em testes e consultas públicas.

Item                              | Horas-trabalho | Tempo de espera
----------------------------------|----------------|-------------------
**1.1.** Requisitos do CLP, redação | ~15            | ~1 semana entre redação e revisão
**1.2.** ", discussão | ~5            | ~2 semanas (horas de trabalho para leitura/resposta e backup)
**1.3** ", entrega | ~5            | ~1 semana entre redação final, revisão e redação do extrato das discussões.
**2.1** principais soluções e padrões vigentes, ?? | ~5            | ~1
**...** ... | ~5            | ~1

Optou-se por adotar um preço fixo e mais baixo para as horas-trabalho, tendo em vista que são horas "semi voluntárias". Enquanto as estimativas não estiverem certas e revisadas, utilizaremos como valor R$30 a hora, depois de revisadas pode ou não chegar ao teto de R$40/hora.

Como o total de horas estimado foi da ordem de ??  conclui-se que o valor mínimo para se concluir o projeto seja da ordem de R$??  ...

# Situação atual

Exceto por este texto de apresentação, que tem valor de "carta compromisso" com a comunidade, todos os devem ser considerados rascunhos, foram disponibilizados apenas para facilitar o diálogo com quem deseja participar ou discutir detalhes.

... Veja o [rascunho inicial das especificações aqui](spec01-hub.md), ..., [comparações aqui](comparacao.md), ...

## Não estamos sozinhos

A busca por soluções é mundial, e floresceu nos anos recentes.  A demanda por códigos de localização abertos não é exclusividade do Brasil. Veja esta lista com uma centena de outros países, analisados quanto à abertura da sua base de códigos postais,  apenas ~5% são considerados razoavelmente abertos:   [OpenDataIndex/Postcodes](https://index.okfn.org/dataset/postcodes/), 90% dos países aida apresentam problemas sérios como o do Brasil.  

Quanto à população mais sensível ao problema de "não ter um endereço para chamar de seu", quem mais sofre é a população do meio rural, e os bairros e regiões em situação de habitação precária &mdash; segundo dados da [TETO Brasil](https://www.techo.org/brasil/) são ~15 milhões habitantes desatendidos pelo CEP ou nome de rua.  Todos beneficiariam enormemente de um código de localização oficial, um CLO para o local onde habitam.

------

&#160;&#160;Conteúdos e dados deste projeto são dedicados ao domínio público. Ver também [Créditos das imagens](assets/README.md#Imagens).   <br/>&#160;&#160;[![](assets/CC0-logo-200px.png) ](assets/README.md)
