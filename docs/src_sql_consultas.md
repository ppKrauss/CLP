## PREPARP DO BANCO DE DADOS

1. Term um servidor preparado para usar PostGIS com mapas OSM.

2. Baixar datasets

3. Rodar scripts, principalmente [step01-pubLib.sql](https://github.com/OSMBrasil/CLP/blob/master/src/step01-pubLib.sql).

4. Realizar consultas uma a uma para gerar relatórios.

Para os polígonos dos estados no PostGIS pode-se usar o NaturalEarthdata:
```sh
wget https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces.zip
unzip ne_10m_admin_1_states_provinces.zip
shp2pgsql ne_10m_admin_1_states_provinces.shp | psql postgres trydatasets
```
Para os municípios, apesar da disponibilidade de dados GeoJSON o melhor é trazer os polígonos originais do Brasil.

## CONSULTAS AO BANCO DE DADOS
A seguir consultas rotuladas para poderem ser referenciadas na navegação das especificações e requisitos.

NOTA: para gerar script em separado usar `extract_sql.php`.

### stat01-gh01

Estatísticas sobre o comportamento do Geohash ao longo amostragens em todas as UFs.
`cell_size` em metros.

```sql
-- variar de 7 a 9 o valor indicado.
SELECT uf, round(avg(sample),1) ||' ± '|| round(stddev_samp(sample),1) cell_size
FROM (
   SELECT uf,  sqrt(st_area(ST_GeomFromGeoHash(x),true)) sample
   FROM (
     SELECT substr(iso_3166_2,4) uf,
            st_geohash( unnest(good_samples(geom,0.01)) ,8) x  -- 7 a 9
     FROM  ne_10m_admin_1_states_provinces
     WHERE iso_3166_2 like 'BR-%'  
     ORDER BY 1,2
  ) t1
) t2
GROUP BY 1
ORDER BY 2,1
;
```
### stat02-sigl01

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

### outra

```SQL
--
-- codigo SQL aqui
--
```
