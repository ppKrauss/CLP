((em construção))

**<center><big>CLP baseado na coordenada</big></center>**

As coordenadas geográficas e a sua representação em padrões abertos não dependem de qualquer infraestrutura e, portanto, não dependem de nenhuma organização ou empresa para sua existência ou uso continuado.

Como [apresentado na introdução](index.md) as coordenadas geográficas, expressas no seu formato usual de latitude e longitude decimais, formam um código muito longo. Além disso, como o CLP substituirá o CEP, é importante que seja um número só, hierárquico &mdash; seu primeiro dígito representa uma macro-região e o prefixo com mais dígitos representa uma micro-região.

Uma das estratégias de compactação do CLP-coordenada, já demonstrada em anexo desta especificação,

O Geohash não é o único candidato a CLP-coordenada, apenas ilustra abaixo como seria a sua anatomia no uso prático. Neste relatório serão analisados também o MapCode, o PlusCode e o S2geometry.

![](assets/CLP-anatomia-coord.png)

## Características prefixadas

Apesar dos algorimos e suas variantes proporcionarem certa liberdade de escolha, as seguintes características de um  CLP-coordenada foram previamente fixadas:

* prefixo hierárquico do código CLP, até `abbrev3`: definido conforme a [especificação](spec01-hub.md/#prefixo).
* grade e cobertua dos polígonos de `macrocells`: serão recomendados algoritmos e metodologias gerais, para todos os municípios.

## Conversão para prefixo

O algoritmo de conversão que transforma dados da Geo URI em **prefixo de código CLP-coordenada** é definido *a priori*, deve ser entendido como um passo intermediário, antes da conversão final, que gera o sufixo através de um [algoritmo de conversão para CLP](#algoritmo-de-conversao-para-clp).

...

* ENTRADA: Geo URI e contexto.
* SAÍDA: Geo URI, prefixo e metadados da macrocélula.

Cabe em última análise à autoridade local (ex. prefeitura) e à autoridade normativa (ex. IBGE ou SINTER) negociarem qual será a grade macrocélulas. Um algoritmo complementar apenas sugere uma possível partição do território municipal em zero, 32 ou 1024 macrocélulas.

## Conversão para CLP

Um algoritmo de conversão transforma dados da Geo URI em código CLP-coordenada.

* ENTRADA: Geo URI, contexto normalizado e macrocélula. (proveniente da [conversão de prefixo](#))
* SAÍDA: código CLP definido pelo próprio algoritmo, e satisfazendo os critérios abaixo.

**Critérios eliminatórios** para a seleção de algoritmos de referência:

1. Ser consistente com a classificação de [Grade Discreta Global](https://en.wikipedia.org/wiki/Discrete_Global_Grid#Hierarchical_grids) (do inglês **Hierarchical DGG**), de modo que o lugar  identificado pelo CLP-coordenada seria uma célula da DGG proposta pelo algoritmo.

2. Estar publicado há mais de 1 ano e ter sido testado por uma comunidade ampla de usuários.

3. Não pode ter perda injustificada de funcionalidade, ou performance inferior aos [algoritmos ingênuos](spec04ap05-ingenuos.md).

4. Apresentar licença livre (senso [OpenDefinition](https://opendefinition.org/od/2.0/pt-br/)) e não depender de bases de dados não-livres (com copyright como o CEP) ou mecanismos adicionais patenteados (ex. restrições para o uso em QR Code).

**Critérios classificatórios** para que os **códigos de sufixo gerados** por dois algoritmos possam ser comparados.

1. Ser curto o suficiente para que possa ser memorizado pelo usuário humano.

2. Ser auto-suficiente, não exigindo informações adicionais além daquelas já fornecidas pelo prefixo do código (identificador do município).

3. Evitar caracteres visualmente confusos (por ex. "0" e "O" ou "1" e "l").

4. Ser expresso com pontuação facultativa, para que o usuário humano memorize mais facilmente em grupos de 2 a 4 caracteres.

4. Evitar a formação de fonemas (portanto evitar o uso de vogais mais frequentes) para que não sejam confundidos com palavras curtas (2 a 4 letras) do vocabulário da lingua portuguesa do Brasil (VOLP ou similar sem nomes próprios).

5. O código de um local deve ser gerado de forma determinística, não exigindo nenhuma configuração ou aplicação

6. O software que gera o código a partir da latitude/longitude deve ser leve o suficiente para estar numa página Web ou num aplicativo de smarthfone, e deve funcionar offline.  ... Os códigos devem poder ser gerados e decodificados offline. Redes de dados móveis podem não ser onipresentes ou baratas

7. Os códigos não devem depender de nenhum fornecedor, de modo que não haja risco de que eles parem de funcionar se uma empresa ou site sair do ar.


## Algoritmo de tradução do CLP

Um algoritmo de tradução transforma o CLP-coordenada em uma Geo URI. **Critérios eliminatórios** para a seleção de algoritmos de referência:

1. Apresentar um algoritmo de função inversa, [de conversão](#algoritmo-de-conversao-para-clp), aceito sem restrições.

2. Estar também publicado há mais de 1 ano e ter sido testado por uma comunidade ampla de usuários.

3. Não pode ter perda injustificada de precisão, ou restrições para fornecer resultados no padrão Geo URI.

4. Apresentar licença livre (senso [OpenDefinition](https://opendefinition.org/od/2.0/pt-br/)) e não depender de bases de dados não-livres ou mecanismos adicionais patenteados.

-----

## Jargão e Definições preliminares


* O lugar identificado pelo CLP é uma célula de [grade discreta global](https://en.wikipedia.org/wiki/Discrete_Global_Grid) (do inglês **DGG**), portanto é uma localidade horizontal e existe um código único por localidade.

## Pefil do sufixo de CLP-Coordenada

As características do CLP eleito devem ser expressas, quando necessário, com relação sua estrutura e parâmetros de implantação. São elas:

* Referencial tecnológico de DGG na qual está baseado. Exemplos: Geohash, S2, PlusCode, etc.
* Expressão pública: texto   
* Base numérica de referência para a expressão pública. Exemplos: base32, base36, base16.
* Número mínimo de bits por grupo em caso de indexar células-grade. Exemplo: bit-a-bit, 5-a-5, etc.

Os códigos devem representar uma área, não um ponto, onde o tamanho da área é variável


## Requisitos do sufixo de CLP-coordenada

Atributos desejados e [requisitos técnicos](https://en.wikipedia.org/wiki/Requirements_analysis) de um código de localização  capaz de ser traduzido diretamente em coordenadas geográficas. A listagem a seguir não segue uma ordem particular, foi baseada nas [referências](spec05-referencias.md) e discussões adicionais.

Um **código de sufixo de CLP-coordenada** deve:

1. Se baseado em uma grade global hierárquica (DGG hierarquica) de indexação do espaço, com tecnologia já consolidada de conversões para latitude/longitude. Essa hierarquia deverá estar presente na sequência de caracteres, de modo que um código com mais caracteres represente um zoom sobre a localidade identificada por aquele de menos caractres.

Encurtar um código deve representar uma área maior que contém o local original. Um efeito colateral disso é que os códigos próximos terão um prefixo comum;

1. Ser curto o suficiente para que possa ser memorizado pelo usuário humano.

2. Ser auto-suficiente, não exigindo informações adicionais além daquelas já fornecidas pelo prefixo do código (identificador do município).

3. Evitar caracteres visualmente confusos (por ex. "0" e "O" ou "1" e "l").

4. Ser expresso com pontuação facultativa, para que o usuário humano memorize mais facilmente em grupos de 2 a 4 caracteres.

4. Evitar a formação de fonemas (portanto evitar o uso de vogais mais frequentes) para que não sejam confundidos com palavras curtas (2 a 4 letras) do vocabulário da lingua portuguesa do Brasil (VOLP ou similar sem nomes próprios).

5. O código de um local deve ser gerado de forma determinística, não exigindo nenhuma configuração ou aplicação

6. O software que gera o código a partir da latitude/longitude deve ser leve o suficiente para estar numa página Web ou num aplicativo de smarthfone, e deve funcionar offline.  ... Os códigos devem poder ser gerados e decodificados offline. Redes de dados móveis podem não ser onipresentes ou baratas

7. Os códigos não devem depender de nenhum fornecedor, de modo que não haja risco de que eles parem de funcionar se uma empresa ou site sair do ar.

8. O algoritmo deve ser publicado publicamente e ser livre para usar.
