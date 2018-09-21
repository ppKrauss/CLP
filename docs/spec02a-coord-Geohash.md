## CLP-coordenadas padrão Geohash

### Testes e ajustes preliminares

Para facilitar a auditoria sem necessidade de implementação de ferramentas, foram utilizados os sites [movable-type.co.uk/scripts/geohash](https://www.movable-type.co.uk/scripts/geohash.html) para conversão e visualizaçaõ de coordenadas,

![](assets/CLP-coord-geohash-ilustra01.png)

SELECT ST_GeoHash(ST_SetSRID(ST_MakePoint(-46.633956,-23.550385),4326), 9);

http://geohash.org/6gyf4bf1n:MarcoZero?format=osm
