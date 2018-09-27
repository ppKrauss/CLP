((em construção))

**<center><big>SIGLAS BRASILEIRAS</big></center>**

As siglas brasileiras não são apenas um brinquedo, um recurso de linguagem  para encurtar a conversa, enxugar o texto quando o espaço é reduzido.  Elas fazem parte do vocabulário oficial da Língua Portuguesa do Brasil e dos padrões oficiais de identificação.

Quem cria a sigla  não é o autor de um catálogo ou as empresas de busca na Internet...  As siglas dos estados, por exemplo, foram criadas e são mantidas pelo IBGE, existem leis e normas técnicas oficializando o uso nacional, e um tratado internacional com a ISO reforçando o uso como código identificador internacional. Nas siglas de nomes de cidade e códigos de rua não é muito diferente.

A "autoridade definidora da sigla" é uma autoridade do governo brasileiro. Ainda assim não é o governo isolado, a sigla não pega, não se consolida se o governo não a desenvolve buscando consenso, com respeito e com a ajuda dos usuários,  os 200 milhões de brasileiros.  Estabelecer as regras e o bom uso dos códigos, siglas e abreviações oficiais é um ato de **soberania nacional**. Podemos confiar nas nossas siglas, e elas são de fato nossas.<!-- ver https://www12.senado.leg.br/manualdecomunicacao/redacao-e-estilo/estilo/siglas  -->

# Siglas de país e estado
Na escola aprendemos todas elas: AC é Acre, AM é Amazonas, ... É uma das missões do ensino garantir que o cidadão entenda a linguagem oficial, que saiba reconhecer o contexto e designar elementos com simplicidade e sem ambiguidade.

A história completa das siglas de estado é [descrita por esta tabela](http://datasets.ok.org.br/state-codes/blob/master/data/br-state-codes.csv). Já existiu uma sigla `GB`, que entre os brasileiros, até 1975, não era Grã-Bretanha, designava o antigo Estado da Guanabra. Quem controla isso, garantindo a identificação sem ambiguidade e apenas dos elementos vigentes, é uma autoridade nacional designada por lei federal: atualmente, e já fazendo algumas décadas, o IBGE.

Uma vez estabelecidas internamente, as siglas passaram a ser também elementos da comunicação internacional. O Brasil é signatário do acordo que dá estabilidade e legitimidade ao padrão ISO&nbsp;3166, e a autoridade do padrão [**ISO&nbsp;3166-2:BR**](https://en.wikipedia.org/wiki/ISO_3166-2:BR).

**Regra geral** para uso contextualizado das siglas de país e estado:

* Em contexto internacional usar a sigla completa, ex. `BR-SP`.

* Em contexto nacional usar apenas a sigla de estado, `SP`.

* Quando houver uma regra consensual (entre as partes) ou oficial na comunicação, a hierarquia "país-estado-cidade" poderá ser reduzida para apenas "cidade", portanto omitindo a designação de estado. <br/>Por exemplo, ao invés de `Manaus (AM)` ou `BR-AM-MNS`, usar apenas `Manaus` ou `MNS`.

# Sigla de 3 letras do município
Considerações sobre a padronização das siglas de 3 letras para a identificação municípios.
Apesar de terem sido propostos e setorialmente adotados alguns padrões de codificação, eles são incompativeis e distintios.  Os principais são:

* Siglas em escopo **federal**: padrão **ANATEL**, de uso interno.

* Siglas de escopo **estadual**:   padrão **DER - Departamento de Estradas de Rodagem**, com uso já consolidado em placas e mapas. Conforme o estado há uma autoridade diferente (ex. DER/MG é de Minas  Gerais) e grau de uso/maturidade diferente.

Na seção [Padrão Estadual](#padrao-estadual), abaixo, é apresentado o exemplo de SP. Atualmente a Assembleia de SP está regulamentando de forma mais ampla o uso das siglas do DER/SP, sendo prevista a publicação de decreto estadual relativo ao assunto.

## Quase hashes

O conceito já amplamente estudado e difundido de [função hash](https://en.m.wikipedia.org/wiki/Hash_function) ajuda a conceber as "funções sigla", que convertem um nome qualquer em um código de 3 letras  que seja percebido (pelo humano) como uma sigla.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Hash_table_4_1_1_0_0_0_0_LL.svg/240px-Hash_table_4_1_1_0_0_0_0_LL.svg.png)

Enquanto a função hash *H(x)* devolve um número diferente para cada nome *x* de um conjunto *X*, a função sigla *S(x)* devolve um código de letras mnemônico (que faz lembrar do nome).

Os principais coceitos trazidos da *teoria das funções hash* são

Conceito | definição no escopo de *H(x)* | definição no escopo *S(x)*
---------|----------------|-------
*colisão* | Quando dá o azar de dois elementos de *X*, digamos *x1* e *x2*, resultarem em *H(x1)=H(x2)*. | Idem, há colisão quando *S(x1)=S(x2)*.
*domímio* | Conjunto de todos os possíveis nomes, *X*. | idem.
*contra-domímio* | Conjunto de todos os possíveis resultados de *H(x)*, conjunto *C*. | Mais específico:  todos os possíveis resultados de *S(x)* são todas as combinações de 3 letras do alfabeto utilizado por *X*.  Se usar 26 letras, teremos *\|C\|=26³=17576*.
*probabilidade de colisão* | Problabilidade *P(H,X)* em função do número do tamanho do contra-domínio, *\|C\|*. | Idem.|

Em caso de colisão a função hash tradicional, *H(x)*, apenas evita repetição, enquanto a função sigla segue uma ordem de tentativas, começando pelas tentativas de percepção *p* mais amigável (*p=0* significa zero-pior), e recorrendo depois das colisões a valores  *p=1*, *p=2*, etc. até um valor *p=N* pior de fato.   A rigor portanto a função sigla usa também *p* como parâmetro que muda com o número de colisões, *S(x,p)*.

O compromisso com a percepção humana pode demandar um certo refinamento, o que nos obriga a considerar duas classes distintas de funções sigla:

1. **Funções estatísticas** *S(x,p,Q)*, mais refinadas: que requerem uma análise prévia do conjunto *X* para escolher a melhor estratégia. Análise de frequência de letras por exemplo é um tipo de análise prévia. Supondo que o resultado de uma análise seja o conjunto *Q* de frequências, desvios ou outros indicadores quantitativos, a  função sigla será parametrizada por *S(x,p,Q)*. Casos de agrupamentos, tais como metaphones, podem ser modelados por *Q(x)*. <br/>No caso de nomes de município basta tomar o cuidado de usar apenas estatísticas válidas para uma perspectiva de décadas, ou seja, usar uma análise estatística mais geral e grosseira é permitido.

2. **Funções autônomas** *S(x,p)*: a função não "olha" para o conjunto *X* ou outros elementos, só para o elemento *x* em questão.

NOTA: existe ainda o caso espacial de sinônimos *x'* de *x* que são utilizados como primeira opção para a aplicação de *S(x,p)*, ou seja, descarta-se *S(x,p_i)* quando *p_i* não levar a um resultado compativel com *x'*. Vide os ~50 casos de [abreviações votadas no Registro-BR](http://www.cidades.registro.nic.br/), tais como POA, Sampa, Jampa, etc.  O critério de compatilidade é simplesmente confirmar que as letras do resultado *r* sejam letras presentes em *x'* e numa mesma ordem.

## Siglas boas, mnemônicas

A "sigla mnemônica" para nome de município é aquela que é fácil do cidadão lembrar, em geral porque cumpre um uma  regra óbvia de formação. Mesmo quem é moradodor da cidade, só vai decorar a sigla se ela parecer importante. E vai ser menos importante a sigla da cidade vizinha, menos importante ainda de uma cidade de outro estado.

O que fica na memória é a "sigla que pega", que é fácil lembrar. Siglas e abreviações, assim como siglas derivadas de abreviações já populares. As abreviações "Sampa" para São Paulo e "POA" para Porto Alegre são exemplos que pegaram. No caso de Sampa, poderia ser reduzida para SPA, de modo a preservar apenas letras do nome original, e causando menos estranheza que "SAL" ou "SPO".
<!--Quanto à importância, hoje o que se constata é que as siglas da Anatel (federal) e do DER (por estado) não são consideradas importantes, nem sequer para prefeitos e agentes públicos. -->

A seguir algumas regras consensualmente (consulta pública preliminar) aceitas como "boas" para se formar uma sigla de 3 letras fácil de lembrar:

Regra | Exemplos | Notas
------|----------|------
*R1.* Primeiras três letras do primeiro nome| **AGU**	(Agudos), **BEL** (Belém de Maria), **EMB** (Embu das Artes), **ITU**	(Itu), **SUZ** (Suzanópolis) | Principal regra por ser  mais óbvio e natural. <br/>Como as demais tem seus limites, colisões surgem aos montes em nomes prefixados como "São".
*R2.* Principais Iniciais na sequência | **SJC**	(São José dos Campos), **SCE** (Santa Cruz da Esperança), **SRQ** (Santa Rita do Passa Quatro) | Primeira letra de cada palavra, ignorando preposições ou contrações. No caso de mais que 3 palavras, eleger a inicial seguida das mais usadas para se referir ao município (ou as que apresentem [letra menos frequente](#alfabeto-com-menos-de-26-letras)).
*R2b.* Principais Iniciais pulando uma ou duas palavras |  **SRQ** (Santa Rita do Passa Quatro) | Variação de R2 porém pulando Primeira letra de cada palavra, ignorando preposições ou contrações.
*R3.* Inicial seguida das primeiras consoantes | AGD	(Agudos), BLM (Belém de Maria) | Equivale a deletar as vogais e depois aplicar a regra R1.
*R4.* Inicial da primeira palavras seguida de primeiras letras de uma palavra subsequente | **SPA** (São Paulo), BMA (Belém de Maria) | Usada em  nomes compostos que tenha 2, 4 ou mais palavras, ignorando preposições.
... |...|...
*R10.* Idem R2 mas usando preposições | ...|...
*R11.* Idem R4 mas usando preposições | ...|...
...|...|...

Em negrito as siglas "oficiais" (Anatel ou DER).  No caso do "teste de qualidade da sigla", por exemplo para comparar o resultado da Anatel como o resultado do DER, as regras porporcionam uma avaliação objetiva para pontuar as escolhas de abreviação realizadas.

É possível criar um "padrão de abreviação" a partir das regras. A vantagem do uso de regras é que também fica estabelecido um referencial do que é justo, ou seja, não deixa de contemplar nenhum dos ~5600 municípios, não há risco da proposta  se preocupar mais com a sigla de um nome e menos com a sigla de outro.

A sequência de regras a ser usar a cada colisão, primeiro R1, depois R2, R3, etc. é só sugerida, uma definição mais rigorosa precisa ser dada ao se eleger um algoritmo.  A finalidade das regras aqui é apenas avaliar o perfil estatístico, por exemplo das abreviações Anatel.

### Evitando colizões
Um importante modelo, muito usado na *teoria das funções hash*, fazendo uso do [princípio do pombal](https://en.wikipedia.org/wiki/Pigeonhole_principle) no contexto conhecido como ["paradoxo do aniversário"](https://pt.wikipedia.org/wiki/Paradoxo_do_anivers%C3%A1rio),<!-- ou seja, que para nomes distintos sempre consegue obter sem colisão um valor de hash distint--> permite avaliar a probabilidade de colisão em uma "hash perfeita":

<!-- fig https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Birthday_Paradox.svg/450px-Birthday_Paradox.svg.png)-->
![](http://preshing.com/images/probability-distribution.png)

No caso das abreviações de 3 letras pode-se simular como se fossem resultados (hashe digests) de 12 a 15 bits  (3×4bits para simular alfabeto de 16 letras, 3×5bits para alfabetos de 32 letras). O total de combinações no alfabeto convencional é 26³~17600, mais próximo de 14 bits do que de 15.  As funções usuais de colição ([exemplo](http://everydayinternetstuff.com/2015/04/hash-collision-probability-calculator/)) avaliam apenas a chance da  colisão depois de ter obtido a penúltima sigla. Na prática é mais razoável conferir quantos itens podem ser inseridos antes da chance de colisão ultrapassar os 50%. Os resultados para 14 bits são:

* ~150 primeiros nomes com chance inferior a 50%
* ~200 ... &lt;70%
* ~300 ... &lt;90%
* ~500 ... ~100%

Disso se conclui que a busca por *siglas de qualidade razoável* é praticamente impossível depois de obtidas as primeiras 500 siglas de 3 letras, e que elas serão garantidamente *boas siglas* apenas no inicio, até as primeiras 150.

Na prática, como [vimos](#siglas-boas-mnemonicas), existem mais de quatro regras consensualmente consideradas boas, de forma que **seriam permitidas 3 ou 4 colisões** antes de considerar "qualidade menor". Esse dado precisa ser levado em conta num modelo de probabilidades... Mas foge ao escopo do presente rascumho formular um modelo mais sofisticado. Podemos esboçar para dar uma ideia das contas, argumentos e conclusões:
<br/>a segunda, terceira e quarta tentativas caem no mesmo problema, devendo ter as suas chances  multiplicadas para resultar em falha... <br/>Por exemplo com 200 itens já eleitos, são 70% de chances na primeira tenativa, 70% na segunda, 70% na terceira, portanto 70%^3 = 30% de chances de falha. Com 300 itens 90%^3 = 73% de chances ... E com 500 chegamos ao limiar de 99,9%^3 = 99,7%, continua sendo ~100%. No 100% o que se pode fazer é escolher "uma vaga qualquer" entre as siglas que sobram, sem chance de fazer uma boa escolha.

## Um padrão nacional nunca será mnemônico

A experiência mostra que, se a suposta sigla não for relativamente fácil de lembrar, acaba sendo **pior do que um código numérico**, pois é natural do ser humano não assumir que esqueceu "aquilo que quase lembra"... Ao preencher um formulário, por exemplo, podemos nos equivocar trocando a sigla certa por uma parecida, causando mais confusão do que deixando o campo em branco.

Mesmo um código alfanumérico longo<!-- , como placa de carro-->, assumidamente "código", sem compromisso ou confusão com nomes: os ~5600 municípios representam itens do número 1 ao 5600, que em [base36](https://en.wikipedia.org/wiki/Base36) seriam repersentados por números identificadores do `001` ao `F9K` (com decimal intercalado).

Apesar de não ser endossado por outros órgãos, o padrão Anatel de siglas de 3 letras é de abrangência nacional, uma para cada nome de município. A proposta é razoável, fez o possível para que as os códigos se pareçam siglas nas capitais e cidades mais populares, mas como são quase 5600 nomes, eles representam mais que 34% das 26<sup>3</sup>=17576 [combinações das letras do alfabeto em sigla de 3 letras](https://www.quora.com/How-many-combinations-of-three-letters-in-a-26-letter-alphabet-are-there).

A recomendação matemática para se ter boa liberdade de escolha na sigla de cada nome, como vimos acima, é que não ultrapasse 500, portanto as 5600 siglas da Anatel representam uma dose 10 vezes maior do que a recomendada.

Vejamos se na prática a teoria comentada antes faz sentido... Na prática o que seriam 3 ou 4 regras se tornam umas  "10 regras boas" para achar a sigla depois de uma colisão... Pela teoria, com 600 ou mais itens temos 99,999%^10 = 99,9% de chances de colisão. Teoriacamente, não há como melhorar o resultado quando passamos muito do limiar de 500 itens...  Então na tabela Anatel encontraríamos casos  siglas que nem sequer fazem uso das letras do nome.

Um bom exemplo de como "estoura o limite" é o uso da letra Y: na tabela Anatal encontramos ~150 abreviações com Y entre nomes que não apresentam a letras Y, de `AAY` (Alto Alegre/RS), `ABY` (Abaiara/CE) e `AGY` (Aguiar/PB)  até `YCA` Içara/SC, `YGI` (Itagi/BA) e  `YPE` (Itape/BA). Idem para a letra K, com ~160 "abreviações" de nomes que não apresentam a letra K, de `AAK` (Anamã/AM) a `TUK` (Tururu/CE).

**É um limite da Natureza**, não tem como instituir uma lei federal ou fazer um grande investimento para um super-computador ou grandes experts chegarem a um resultado melhor do que a Anatel chegou, seria jogar dinheiro fora. As estatísticas a seguir apenas reforçam que esse limite é ainda mais baixo.

### Alfabeto com menos de 26 letras

Se olharmos com lupa, veremos ainda que não são todas as 26 letras do alfabeto utilizadas nos nomes dos municípios brasileiros, as letras K, W e Y praticamente não são usadas, e, junto com F,Z,Q e X representam menos que 2% da frequencia de uso entre os nomes. <!--  1056/56983=1.8 -->  Assim, removendo essas 7 letras ficamos com um alfabeto de 19 letras, de modo que os ~5600 municípios podem na prática escolher entre  19<sup>3</sup>≈6900 possíveis siglas (AAA, AAB, ..., VVA, VVB, ..., VVV), ou seja, representam mais que 80% das possibilidades, praticamente não há margem para a escolha de uma sigla mais amigável quando outro município já escolheu a sua preferida.

 letra |   n   | letra | n
-------|-------|-------|----
 A     | 10683 | D     |  1402
 O     |  5611 | B     |  1295
 I     |  5194 | G     |  1173
 R     |  4885 | V     |   806
 E     |  3985 | H     |   623
 N     |  3538 | J     |   569
 S     |  3435 | F     |   372
 T     |  2641 | Z     |   302
 U     |  2332 | Q     |   209
 C     |  2183 | X     |   124
 L     |  2090 | Y     |    26
 M     |  1757 | W     |    15
 P     |  1725 | K     |     8

Como a maior parte das "siglas bacanas" é composta por uma ou mais inicias das palavras que formam o nome, eliminando preposições e ficando com as primeiras letras teremos a seguinte distribuição:

Inicial |   freq   | Inicial | freq
-------|-------|-------|----
C       |  667 (13%)|F       |  164 (3%)
P       |  580 (11%)|V       |  153 (3%)
S       |  534 (10%)|D       |  111 (2%)
A       |  486 (9%)|E       |   88 (2%)
M       |  459 (9%)|O       |   87 (2%)
I       |  404 (8%)|U       |   68 (1%)
B       |  361 (7%)|Q       |   41 (1%)
J       |  250 (5%)|H       |   30 (1%)
T       |  247 (5%)|X       |   14 (0%)
G       |  245 (5%)|W       |    8 (0%)
R       |  202 (4%)|Z       |    4 (0%)
N       |  177 (3%)|K       |    2 (0%)
L       |  173 (3%)|Y  |0 (0%)

É nula a frequência de uso do Y entre as iniciais dos municípios, e percentualmente nula, 0%, para as letras K, Z, W e X.  Todas com frequência inferior a 1/3 da mediana de ~170 em 5559 (~3%). Dessa forma se justificaria usar um alfabeto reduzido, de 21 letras, para avaliar melhor avaliar as chances de obtenção de siglas baseadas em iniciais.

Fazendo as contas, 21<sup>3</sup>=9261, logo os nomes ocupam  ~60%, ainda bem longe dos 10% ou menos recomendados para ter uma folga.

```SQL
-- Distribuição de freq. de letras nos nomes:
SELECT  regexp_split_to_table(replace("lexLabel",'.',''), '') letra,  count(*) as n
FROM test_city GROUP BY 1 ORDER BY 2 DESC; --  mediana em D (1402).

-- Distribuição não usada (sem peso):
SELECT substr(regexp_split_to_table("lexLabel", '\.'),1,1) letra, count(*) as n
FROM test_city GROUP BY 1 ORDER BY 2 DESC;
-- Mediana  entre L (288) e F (287), pode ser arredondada para 290.

-- Distribuição consistente de freq. de iniciais:
WITH distrib AS (
 SELECT inicial, sum(n) freq
 FROM  (
   SELECT substr(unnest(pals),1,1) inicial, n1::float/array_length(pals,1) n
   FROM (
      SELECT regexp_split_to_array("lexLabel", '\.') pals, count(*) n1
      FROM test_city  
     GROUP BY 1
   ) t1
 ) t2 GROUP BY 1 ORDER BY 2 DESC
)  SELECT upper(inicial) inicial,
          round(freq) || ' ('||round(100.0*freq/5292.0)||'%)' freq
   FROM distrib
; -- Novamente mediana  entre L (173) e F (164),
  -- pode ser arredondada para 169 (de um total de 5292)
```

## Padrão estadual

É o escopo correto para se obter siglas boas ou razoáveis, bons mnemônicos para o cidadão.  A média de municípios por estado é ~210<!--213.77--> (mediana ~140) e o pior caso é MG com ~850 municípios. Praticamente todos estão dentro do limite razoável de 500 nomes, e mais 50% dos municípios satisfaz a condição de  *\|C\|*&lt;150, para ter *boas siglas*.

Abaixo uma amostra da lista completa de todas as abreviações de municipios de São Paulo:<!-- copy (select abbrev3 ||' ('|| name||')' from test_city where state='SP' order by 1) to '/tmp/lix' -->
<blockquote>
AAG (Alto Alegre), AAI (Aguaí), ABR (Américo Brasiliense), ACD (Aparecida), ACP (Américo de Campos), ADD (Andradina), ADF (Adolfo), ADM (Adamantina), ADT (Aparecida d'Oeste), AEI (Areias), AEP (Areiópolis), AFM (Alfredo Marcondes), AGD (Agudos), AGL (Águas de Lindóia), ...  <br/>..., PBT (Pereira Barreto), PBU (Pacaembu), PCT (Piacatu), PDB (Pedra Bela), PDD (Piedade), PDH (Pindamonhangaba), PDM (Pindorama), PDN (Pederneiras), PDP (Pradópolis), PDR (Pedreira), PEP (Pedrinhas Paulista), PFR (Porto Ferreira), PFZ (Porto Feliz), PGA (Porangaba), PGH (Pedregulho), PGI (Pirangi), PGP (Paraguaçu Paulista), PGR (Pitangueiras), PGT (Pontes Gestal), PIR (Piracicaba), PIZ (Pinhalzinho), PLC (Paulicéia), PLF (Paulo de Faria), PLN (Paulínia), PLO (Palmeira d'Oeste), PLP (Palmares Paulista), PLS (Pilar do Sul), PLT (Planalto), PMP (Pompéia), PMT (Palmital), PNG (Pirassununga), PNL (Pedranópolis), PNP (Penápolis), PNR (Panorama), POA (Poá), POG (Pongaí), POL (Poloni), PON (Pontal), POT (Potim), PPL (Populina), PPM (Paranapanema), PQA (Pariquera-Açu), PQB (Piquerobi), PQT (Piquete), PRA (Pracinha), PRB (Peruíbe), PRC (Piracaia), PRD (Pardinho), PRG (Praia Grande), PRI (Pirajuí), PRJ (Piraju), PRN (Paranapuã), PRP (Parapuã), PRR (Pereiras), PRS (Paraíso), PRT (Pratânia), PSA (Presidente Alves), PSB (Presidente Bernardes), ...<br/>..., UBT (Ubatuba), UCH (Uchoa), UJR (Ubirajara), UNP (União Paulista), URN (Urânia), URP (Urupês), URU (Uru), VAR (Vargem), VAT (Vista Alegre do Alto), VCR (Vera Cruz), VGP (Vargem Grande Paulista), VGS (Vargem Grande do Sul), VLG (Valentim Gentil), VLH (Valinhos), VNH (Vinhedo), VOT (Votorantim), VPS (Valparaíso), VRD (Viradouro), VTB (Vitória Brasil), VTG (Votuporanga), VZP (Várzea Paulista), ZAC (Zacarias).</blockquote>

A recomendação para que as siglas sejam mnemônicas, já apresentada acima neste mesmo apêndice, é que se use sempre o "escopo Estado", **jamais escopo nacional**. Tecnicamente dizemos isso afirmando que o *namaspece* é o conjunto de municípios de um estado. A rigor são dois estados que fogem ligeiramente do limite de  ~500 nomes por *namespace*.  Por isso, na metodologia de construção ou revisão das siglas do DER, os estados de MG e SP deveriam estabelecer regras justas de escolha, com critérios objetivos. A escolha de boas siglas priorizaria, por exemplo, a capital, as cidades com nomes curtos e as ~200 cidades com projeção de população maior que as demais.

Para os demais estados os procedimentos de revisão são igualmente válidos, mas não parece ser necessário sugerir tal acréscimo de complexidade. Cabe a cada "comunidade do estado" avaliar a sua tabela de siglas, antes de decidir se submete ou não a tabela DER do seu estado a uma revisão.

Revisões de tabelas DER só fazem sentido dentro da perspectiva de uma iniciativa conjunta das prefeituras e/ou as câmaras municipais dos municípios "lezados". Seriam a parte legítima em um pedido conjunto de revisão na tabela do seu estado, antes de iniciar um processo de maior investimento no uso das siglas oficiais.

<!-- Tanto a média como o pior caso são inferiores a 10% das 17576 combinações possíveis, e .. com as letras mais frequentes. Se desejamos usar "siglas de fato", que façam uso das letras do nome, e sejam fáceis de lembrar, é importante adotar....

A recomendação é que se use sempre o "escopo Estado" para que as siglas sejam mnemônicas. Apenas o estado de MG foge um pouco demais dos limites. A rigor, por terem mais de 500 municípios, os estados de MG e SP deveriam estabelecer regras justas de escolha, priorizando por exemplo a capital, as cidades com nomes curtos e as 200 cidades com projeção de população maior que as demais.
-->
