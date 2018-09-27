((em construção))
**<center><big>CLP - Especificações</big></center>**

Especificações Técnicas do **Código Localizador de Portão** (CLP), conforme testes, levantamentos e consulta pública realizada em [projeto de iniciativa da Comunidade OSM Brasil](https://github.com/OSMBrasil/CLP).

## Sintaxe básica
A CLP é um tipo de código identificador, que toma a forma de [cadeia de caracteres](https://pt.wikipedia.org/wiki/Cadeia_de_caracteres) dividida em duas partes, um prefixo e um sufixo, separadas por um hífen:<br/>&nbsp; **`<CLP> = <prefixo> "-" <sufixo>`**

Onde o prefixo é uma sigla [ISO&nbsp;3166-2:BR](https://pt.wikipedia.org/wiki/ISO_3166-2:BR) composta de código do país (Brasil=BR), `<country>`, código da unidade da federação (por ex. estado de São Paulo é SP), `<uf>`, e uma sigla de 3 letras do nome do município, `<abbrev3>`,<br/>&nbsp; **`<prefixo> = <country> "-" <uf> "-" <abbrev3>`**.

O CLP não existe sozinho como se fosse um nome, ele dependente também da sua "infraestrutura de *resolução do CLP*", que é o mecanismo que garante a tradução do código em coordenadas geográficas de latitude e longitude.

Nesta especificação são definidos dois tipos de CLP, o "CLP default", também apelidado de CLP-coordenada, recomendado para a resolução em mapas e para substituir o CEP,  e o CLP-via, utilizado como versão compacta do  endereçamento postal tradicional, baseado em logradouro e numeração predial.

No caso do CLP-coordenada foi desenvolvida uma especificação de requisitos gerais, e diversas especifcações complementares, conforme o padrão de referência adotado (Geohash, PlusCode e S2cellId).  

A seguir um breve cada um dos módulos da especificação é apresentado com um breve resumo.

## Prefixo
Os componentes do prefixo do CLP são, na sequência:

* `<country>`-`<uf>`: código [ISO_3166-2:BR](https://pt.wikipedia.org/wiki/ISO_3166-2:BR) vigente. <br/>A última alteração nestes códigos foram acréscimos em 1988 e 1977 e uma alteração em 1962 &mdash; surgiram MS e TO, e  Rio Branco (RB) foi rebatizado para Roraima (RR) &madh;, de modo que é considerado um prefixo estável desde então.<br/>Para os testes, a tradução das siglas em outros identificadores (ex. número IBGE ou nome) está sendo adotado o conjunto de dados http://datasets.ok.org.br/state-codes

* `<abbrev3>`: código de abreviação de 3 letras. Ver [apêndice siglas](spec04ap01-siglas.md);

* `<macrocells>`: (opcional conforme município) código de macrocélula.


.... questão das abreviações
As [*regular expressions*](https://pt.wikipedia.org/wiki/Express%C3%A3o_regular) (regex) são *case-insensitive*, mas é recomendado quando possível manter o código em maiúsculas, seguindo a tradição ISO 3166 do prefixo.

* Reggex geral []

### Sensibilidade ao contexto
... Prefixo de `<country>` e `<uf>` são dispensáveis conforme o contexto de localização....

### Regras de determinação exata do contexto
1. Se o valor de `<country>` é conhecido (certeza quanto ser BR), e uma coordenada latLong é fornecida com precisão da ordem de ...
2. Se a coordenada geográfica é conhecida com precisão de ..
3. Se o valor de `<uf>` é conhecido... a UF pode designar a capital na sintaxe `<uf>-<sufixo>`, dispensando o uso de   `<abbrev3>`...
4. ...

## Sufixo no CLP-coordenada
...

### Finalidades principais

A padronização requer expressar em linguagem técnica e precisa o que se adota como padrão. Quando fazemos isso descobrimos como diversos padrões podem se relacionar, garantindo que "conversem" entre eles, ou seja, garantindo a interoperabilidade.  

A rigor o "portão genérico" adotado pelo CLP é um "ponto de acesso ao lote", de maneira que **há um vínculo entre o CLP e o [lote](https://en.wikipedia.org/wiki/Land_lot)**, e entre a precisão do CLP (erro nas coordenadas do ponto que ele representa) e o tamanho da área ocupada pelo lote.<!-- See justifica pois toda localidade de habitação, trabalho ou utilidade pública é  merecedora de um endereço público. --> Além dessa indepência do tipo de portão, o CLP se prestaria a múltiplos usos, destando-se:

  1. Servir de endereço oficial ou componente do endereço oficial:

    1.1. Servir (potencialmente) de [**código postal**](https://schema.org/postalCode), em [substituição ao CEP](https://github.com/OSMBrasil/CRP/blob/master/substituir-CEP.md).

    1.2. Servir de **endereço oficial do portão**, em bases de dados padrões de interoperabilidade,
  no sentido de ser identificador único de uma via de acesso, ou de um ponto ou região esratégica do lote.

    1.3. Servir de **endereço principal do lote**, quando no papel de identificador do *"portão principal"*. É portanto um componente  ao "esquema de identificação unívoca do lote" ao qual pertence o portão. <br/>Componente de redundância no caso de esquemas de identificação de lotes como do [SINTER](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/decreto/D8764.htm),<!-- ver tb. http://idg.receita.fazenda.gov.br/noticias/ascom/2016/maio/unificacao-de-dados-traz-simplificacao-e-mais-seguranca-na-titularidade-de-imoveis --> mas num papel de maior relevância do que o CEP. Recomenda-se inclusive que o SINTER e o CLP façam uso de infraestrutura comum  &mdash; na prática façam uso de mesmo prefixo nos respectivos identificadores.<!--
  <br/>O CLP seria aceito por exemplo  registrar o CLP da residência no cartório, caracterizar pelo seu CLP a  habitação no censo demográfico, ou registrar a sede da empresa na prefeitura pelo CLP da portaria principal. <br/>Neste contexto é proposto que o CLP seja interoperável com o código identificador de lote previsto pelo [SINTER](http://idg.receita.fazenda.gov.br/noticias/ascom/2016/maio/unificacao-de-dados-traz-simplificacao-e-mais-seguranca-na-titularidade-de-imoveis) (a proposta aliás é discutir junto o futuro padrão de identificação). <br/>Apesar da caixa de correio não ser um portão, deve-se acrescentar o [endereço para correspondência](https://schema.org/PostalAddress) como mais uma forma de uso do CLP, que neste caso viria a substituir o [problemático CEP](https://pt.stackoverflow.com/a/63936/4186). [{conferir versão nova do MANUAL DO SINTER onde esboçam o identificador de lote.  http://idg.receita.fazenda.gov.br/sinter/manuais-operacionais/arquivos-e-imagens/manual-operacional-sinter-modelo-de-dados-registrais-e-notariais-v1_0.pdf).}]
  -->

  2. Instruir aplicativos sobre as **coordenadas geográficas do portão**. Essa coordenada  teria precisão da ordem de **3 metros no meio urbano** e da ordem de **15 metros no meio rural**.<br/>Neste contexto o principal requisito  de interoperabilidade é que o código seja compatível  com as normas Web (ISO, W3C e RFC) para expressão de parâmetros em [URIs](https://tools.ietf.org/html/rfc3986). <br/>Exemplos: visualizar um CLP em destaque no OpenStreetMap, postar o CLP no Whatsapp para avisar os amigos do local da festa, digitar o CLP no Uber,  falar o CLP no telefone para garantir o local exato da entrega da pizza.


### Snap de endereços conhecidos
... *snap rounding* na grade local do CLP... <!-- ref https://doi.org/10.1016/j.comgeo.2012.02.011 e outras para o termo .. CRAR na Wikidata!  -->

### CLP baseado em Geohash
...

### CLP baseado em PlusCode
...

### CLP baseado em S2
...

## Sufixo no CLP-via
...

------

&#160;&#160;Conteúdos e dados deste projeto são dedicados ao domínio público. Ver também [Créditos das imagens](assets/README.md#Imagens).   <br/>&#160;&#160;[![](assets/CC0-logo-200px.png) ](assets/README.md)
