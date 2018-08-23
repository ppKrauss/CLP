# CLP
Proposta de **C**ódigo **L**ocalizador de **P**ortão para o meio rural

Com apoio das Secretarias do Estado (da Agricultura e do Meio Ambiente) do Estado de São Paulo, e você, cidadão,
estamos construimdo um novo protocolo de localização geográfica e de endereçamento, a ser utilizado inicialmente por viaturas oficiais da prefeitura, do Estado, para ocorrências policiais, ambulâncias e bombeiros. Consiste em usar métodos simples e já bem conhecidos, tudo é uma questão de se adotar o padrão:

* Usar métodos conhecidos de localização;
* Conhecer a malha viária (com o Openstreetmap) e identificá-la (com IDs eternos a Wikidata);
* Comunicar os maiores interessados &mdash; os produtores rurais;
* Divulgar e revisar os mapas básicos;
* Fazer ajustes finos nas informações oficiais e bancos de dados públicos.

![](assets/CLP-resumo1b.png)

Ver detalhes em [neste PDF](assets/CLP-gov2018-05-02.pdf).

## Motivações
Mesmo no rico Estado de São Paulo, em pleno 2018, chegar até uma propriedade rural nunca foi simples: as vias não tem nome ou não se sabe, sinalização inexiste; distâncias são imprecisas, referências são perdidas, temporárias. Mesmo com celular, o sinal nem sempre pega.

Esse abandono, essa dor é forte para o poder público e pior para o cidadão.  

É preciso "dar nome aos bois", identificar com precisão digital, e encontrar a agulha no palheiro.

## Implementação

Algumas implementações são obtidas de projetos mais especializados:

* [Identificadores persistentes](https://wiki.openstreetmap.org/wiki/Permanent_ID) no Openstreetmap, baseados na [tag Wikidata](https://wiki.openstreetmap.org/wiki/Key:wikidata), atribuida a estados, cidades e vias. <br/> O projeto de preservação digital,  [semantic-bridge](https://github.com/OSMBrasil/semantic-bridge) ajuda a garantir a "eternidade" dos identificadores e da sua resolução no Openstreetmap. Nada será perdido, e poderemos dar garantia de décadas!

* Abreviações de nome de estado (2 letras) e nome de cidade (3 letras), com respectivos mapas, também garantidos por projetos de preservação digital:  [semantic-bridge](https://github.com/OSMBrasil/semantic-bridge), [datasets-br/state-codes](https://github.com/datasets-br/state-codes) e [datasets-br/city-codes](https://github.com/datasets-br/city-codes).
