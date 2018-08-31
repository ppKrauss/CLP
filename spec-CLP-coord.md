## CLP baseado na coordenada

Como [apresentado na introdução](README.md) as coordenadas geográficas, expressas no seu formato usual de latitude e longitude decimais, formam um código muito longo. Além disso, outro problema na simples comparação ou nas bases de dados e listas de endereços, é garantir que dois endereços vizinhos tenham o mesmo "prefixo".

A adoção do popular e já bem difundido [Geohash](https://en.wikipedia.org/wiki/Geohash) permitiria a expressão do endereço em um código suficientemente curto e combinado com a padronização dos códigos mnemônicos de 3 letras para cada cidade.

![](assets/CLP-anatomia-coord.png)


## Considerações técnicas
A seguir uma breve discussão sobre as convenções e hipóteses de trabalho adotadas.

### Alternativas à lat-long tradicional

Para apresentar  de forma mais didática o problema do prefixo comum em endereços vizinhos, imaginemos um sistema de coordenadas simples com apenas quatro dígitos, dois para a coordenada _x_ e dois para a coordenada _y_. <br/>Suponhamos *x=72* e *y=19*,  e que o código desejado é formado pelo "entrelaçamemto de dígitos" desses códigos, ou seja, como os primeiros dígitos de *x* e *y*  são respectivamente 7 e 1, os segundos dígitos 2 e 9, o entrelaçamento resulta em "71" seguido de "29", o número 7129.

representação |*x* | *y* | entrelaçado direto | entrelaçado binário
--------------|----|-----|------------- |
ponto A -  **decimal** (72;19) | 72  | 19 | 71 29 = **71**29| **858**1
ponto B -  **decimal** (72;39) | 72  | 39 | 73 29 = **7**329| 9365
ponto C -  **decimal** (73;19) | 73  | 19 | 71 39 = **71**39| **858**3
ponto A - binário  | 01001000  | 00010011 | 0010000110000101 | 8581
ponto A - octal (110;23)  | 110  | 023 | 10 12 03 = 101203| 8581
ponto A -  hexadecimal (48;13) | 48  | 13 | 41 83 = 4183| 8581

![](assets/bit-enterlace01.png)

O que se percebe já do entrelaçamento decimal, é que o ponto A (72;19) parecido com B na representação de coordenadas (73;19), na verdade é mais próximo do ponto C (e portanto espacialmente similar a C). A similaridade espacial fica destacada pelo entrelaçamento: ao ordenar o resultado entrelaçado (7129,7139,7329)  agrupamos os mais os espacialmente similares. Tal como no sistema de CEP os endereços de uma mesma área terão o mesmo prefixo no seu código (os pontos A e C com prefixo 71).  Isso tudo fica mais preciso e evidente na representação binária.

### Restrição a 64-bits na hierarquia final

Considerando-se que as coordenadas geográficas de latitude e longitude, quando representadas em um contexto local (por exemplo [quadrícula UTM](https://pt.wikipedia.org/wiki/Universal_Transversa_de_Mercator) ou sufixo Geohash), não requerem mais do que 64-bits de dados, podemos convencionar os 64-bits como limite superior do tamanho do código, independentemente do formato ou conversões adotadas para que seja depois revertido em lat-long usuais.

### Adoção de uma base de ordem ~30

A conversão da representação de um número decimal para outra base (ex. hexadecimal) pode resultar na compactação da repreentação do número. O intercâmbio de dados em formatos abertos (ex. CSV, HTML, JSON, etc.), na comumunicação usual entre pessoas (voz ou escrita no celular) e nas [URIs da Web](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier), limitam a escolha da base, ou seja do seu conjunto de caracteres.

Um número inteiro de 64-bits pode ser representado com diferentes bases: *base10* é o sistema decimal usual, *base16* hexadecimal, etc. Quanto maior a base maior o grau de compactação (menos caracteres necessários para expressar o mesmo número). Convencionou-se adotar a  [*base36*](https://en.wikipedia.org/wiki/Base36) como o limite superior para a representação legível e segura. Os dígitos da *base36* são formados pelos algarismos decimais 0-9 e as letras do alfabeto A-Z, portanto 10+26=26 caracteres distintos.

## Adoção do padrão GeoHash

O padrão Geohash é um tipo de entrelaçamemto de coordenadas lat-long que permite a representação de uma coordenada de 64-bits com 9 dígitos *base32*. O  Geohash está presente em diversas plataformas de SIG e bancos de dados espaciais, notadamente no PostGIS (funções [*ST_GeoHash*](https://postgis.net/docs/ST_GeoHash.html), *ST_PointFromGeoHash*, *ST_Box2dFromGeoHash* e outras).

Convencionou-se fazer uso do código **Geohash** da localização do portão, **descartando o prefixo da [BBOX](https://en.wikipedia.org/wiki/Minimum_bounding_box) do município** &mdash; visto que seria o mesmo para todos os pontos da região. A identificação do município se dá por  [sigla mnemônica de 3 letras](sigla3letras-municipio.md).

Comparativamente ao [CLP-via](spec-CLP-via.md), o Gehash é mais aberto e universal,  dispensa o uso de autoridades centrais para "batizar as vias", e evita sucateamento do endereço quando vias são modificadas (resultando em nova metragem ou novo identificador de via).

Comparativamente a outras formas de representar coordenadas geográficas, o Geohash perde ligeiramente em compactação (*base36* é mais compacta que *base32*) e na possibilidade de correção das [distorções por longitude](https://wiki.openstreetmap.org/wiki/Precision_of_coordinates#Precision_of_longitudes).

mas oferece uma lógica espacial para análise de vizinhança muito mais sofisticada,

## Adoção de padrões similares

Conforme apresentado acima, o entrelaçamemto é

------

&#160;&#160;Conteúdos e dados deste projeto são dedicados ao domínio público. Ver também [Créditos das imagens](assets/README.md#Imagens).   <br/>&#160;&#160;[![](assets/CC0-logo-200px.png) ](LICENSE.md)
