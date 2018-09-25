## Dados complementares
Dados complementares para subsidiar as justificativas adotadas na especificação.
<!-- ver também apếndices -->

## Área média dos municípios brasileiros

O valor de área média dos municípios brasileiros, da ordem de **1500 km²**, <!-- bbox 3300--> não possui muito significado, visto que o  desvio padrão excede  o seu valor, em mais que o dobro.
A média faz sentido e terá seu desvio reduzido quando agrupada; a mediana pode ser utilizada como classificador, separando entre as áreas acima ou abaixo da mediana nacional:

* Área mediana nacional dos municípios: **415 km²**
* Área mediana da sua [BBOX](spec-auxTec.md): **820 km²**

Municípios com **áreas abaixo da mediana**:

Região | Qt | Área média (km²)  | Área média da BBOX (km²)   
-------|-----|--------|--------------------------
 N     | 32  |   270 ± 80 | 600 ± 200
 S     |  811 |  203 ± 97 | 400 ± 200
 SE    |  998 |  217 ± 99 | *500 ± 1200*
 NE    | 862  | 209 ± 103 | 400 ± 200
 CO    |  73 | 240 ± 100 | 500 ± 200
(total) | **2776** |**210 ± 100**| *430 ± 750*

Municípios com **áreas acima da mediana**:

Região | Qt | Área média (km²)  | Área média da BBOX (km²)   
 -------|-----|--------|-------------------
 N     | 417  |   *9000 ± 17000* |       *21000 ± 39000*
 S      |  378  |   1100 ± 950 |        2150 ± 2000
 SE    |  665    |   1100 ± 1000 |        2160 ± 2100
 NE    | 932   |   *1500 ± 1700* |        *3000 ± 3750*
 CO     |  391 |   *3900 ± 4600* |        *8100 ± 9600*
 (total) | **2783** |*3000 ± 7600* | *6000 ± 17000*

**Conclusão**: nos municípios menores pode não ser relevante (e estar sujeita a distorções num futuro próximo) a utilização de uma sub-grade (maior resolução) no meio urbano. **Nos municípios de maior área, com mais de 300 km², será importante oferecer uma grade de maior densidade na mancha urbana e suas imediações** previstas como expanção urbana.

Capitais e municípios com maior população (ex. mais de 1 milhão de habitantes), naturalmente, demanda maior cuidado na análise e decisões relativas à sub-grade.
