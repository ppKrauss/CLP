/**
 * Lib para análise estatística e classificação da qualidade das abreviações.
 * https://github.com/datasets-br/city-codes/wiki/lixo,-gerando-abrev-3-letras
 */

CREATE SCHEMA IF NOT EXISTS abbrev;

CREATE FUNCTION abbrev.consoants(
	p_x text,  -- any input word
	p_preserveFirst boolean DEFAULT true  -- flag
) RETURNS text AS $f$
  SELECT string_agg(x,'')
  FROM regexp_split_to_table($1,'') WITH ORDINALITY t (x,a)
  WHERE (p_preserveFirst AND a=1) OR x not IN ('A','E','I','O','U')
$f$ LANGUAGE SQL IMMUTABLE;

CREATE or replace FUNCTION abbrev.drop_prep_pt(
	p_words text[]  -- any input word
	-- ,p_lang text DEFAULT 'pt'  -- flag
) RETURNS text[] AS $f$
  SELECT array_agg(x)
  FROM unnest($1) WITH ORDINALITY t(x,a)
  WHERE a=1 OR x not IN ('E', 'DA', 'DE', 'DO', 'DAS', 'DOS')
$f$ LANGUAGE SQL IMMUTABLE;

----
CREATE FUNCTION abbrev.letters3_by_rule_from_array(
	p_list text[], -- the name spplited into array
	p_rule text -- the rule to be used to obtain the 3-letter abbreviation 
) RETURNS text AS $f$
   SELECT substr(x,1,3)
   FROM ( SELECT CASE
     WHEN $2='cut1' THEN  array_to_string($1,'')
     WHEN $2='init1_cutcons1' THEN  abbrev.consoants( array_to_string($1,''), true )
     WHEN $2='init1_cut2' and array_length($1,1)>1
          THEN substr($1[1],1,1) || array_to_string($1[2:],'')
     WHEN $2='inits12_initlast'  and array_length($1,1)>2
          THEN substr($1[1],1,1) || substr($1[2],1,1) || substr($1[array_upper($1,1)],1,1)
     ELSE NULL
     END
   ) t(x)
   WHERE length(x)>2
$f$ LANGUAGE SQL IMMUTABLE;

CREATE FUNCTION abbrev.apply_rules(
	p_x text  -- any city name. E.g. 'São José dos Campos' or 'Manaus'
) RETURNS jsonb AS $f$
 SELECT jsonb_object_agg(val,rule)
 FROM (
  SELECT *, lag(val) OVER (order by val,rule) dupval
  FROM regexp_split_to_array( upper(unaccent(trim(p_x))) , '[\s\.,;\-]+') t(x),
  LATERAL ( VALUES
    ('r01', abbrev.letters3_by_rule_from_array(x,'cut1') ),
    ('r02', abbrev.letters3_by_rule_from_array(abbrev.drop_prep_pt(x),'inits12_initlast') ),
    ('r03', abbrev.letters3_by_rule_from_array(abbrev.drop_prep_pt(x),'init1_cut2') ),
    ('r04', abbrev.letters3_by_rule_from_array(x,'init1_cutcons1') )
  ) t2(rule,val)
  WHERE x IS NOT NULL AND val IS NOT NULL
 ) t3
 WHERE dupval is null OR dupval!=val
$f$ LANGUAGE SQL IMMUTABLE;

-------------------------------------------------------
-- Usando nas estatísticas das abreviações conhecidas:

/*
-- full
SELECT count(*) n, 
       count(*) FILTER (WHERE candidatas?abbrev3) as n_bate, 
       count(*) FILTER (WHERE uf='SP') as n_sp, 
       count(*) FILTER (WHERE uf='SP' AND candidatas?abbrev3) as n_sp_bate 
  FROM (
    SELECT name, uf, abbrev3, abbrev.apply_rules(name) as candidatas 
    FROM brcodes_city where abbrev3 is not null
  )  t;


------ principal:
-- SP:  (depois trocar por =! 'SP')
SELECT t2.rv, count(*) n, count(*) FILTER (WHERE t2.rk=t.abbrev3) n_bate 
  FROM (
    SELECT name, uf, abbrev3, abbrev.apply_rules(name) as candidatas 
    FROM brcodes_city where abbrev3 is not null AND uf='SP'
  )  t, jsonb_each_text(candidatas) t2(rk,rv) 
  WHERE candidatas is not null AND candidatas!='{}'::jsonb 
  GROUP BY 1
  ORDER BY 1
;
*/

----

-- relatório de perfil dos nomes na contagem de palavras e de letras
-- (ver tambem relatório já gerado de frequência de letras)

CREATE or replace FUNCTION abbrev.get_counts(
	p_x text  -- any city name. E.g. 'São José dos Campos'
) RETURNS jsonb AS $f$
 SELECT jsonb_object_agg(counter_tipe,val)
  FROM regexp_split_to_array( upper(unaccent(trim(p_x))) , '[\s\.,;\-]+') t(x),
  LATERAL ( VALUES
    ('words', array_length(x,1)::int )
    ,('words_noprep', array_length(abbrev.drop_prep_pt(x),1)::int )
    ,('letters', 2*round(length(array_to_string(x,''))::float/2.0)::int )
    -- resulta quase mesmo ,('letters_noprep', 2*round(length(array_to_string(abbrev.drop_prep_pt(x),''))::float/2.0)::int )
  ) t2(counter_tipe,val)
  WHERE x IS NOT NULL AND val IS NOT NULL
$f$ LANGUAGE SQL IMMUTABLE;

/* relatorio

SELECT rk||':'||rv, count(*) n
  FROM (
    SELECT name, uf, abbrev.get_counts(name) as items
    FROM brcodes_city where abbrev3 is not null
  )  t, jsonb_each_text(items) t2(rk,rv)
  GROUP BY 1
  ORDER BY 2 desc,1
;

*/
