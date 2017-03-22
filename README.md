# Plugin ESKID3

> Estructura de un plugin para Kibana con visualizaciones hechas con D3.JS

---

## Introducción

Kibana es una potente aplicación web que nos permite explotar información almacenada en una base de datos Elasticsearch de una forrma muy visual. Uno de los problemas que surgen con Kibana es la escased de tipos de visualización que nos ofrece. Para solucionar este problema se pueden crear plugins de visualización para Kibana utilizando librerías que ofrecen visualizaciones muy potentes como [D3.js](https://d3js.org/). Todos los detalles de implementación de estos plugins y algunos aspectos importantes se encuentran en la siguiente dirección: [Wiki](https://github.com/tomas-teston/plugin-eskid3/wiki)

## Como empezar

Existen varias formas para comenzar a crear un plugin básico para Kibana:
1- clonar el proyecto: Si se selecciona esta opción se deben realizar los pasos indicados en la wiki
2- Mediante la herramienta Yeoman.

## Comandos

Una vez está configurado el plugin puede situarse en la carpeta donde se encuentra el plugin y realizar alguna de las siguientes acciones:

  - `npm start`

    Lanzar Kibana incluyendo el pluginStart kibana and have it include this plugin

  - `npm start -- --config kibana.yml`
  
    puede pasar cualquier argumento como normalmente enviaría a `bin/kibana` poniendo después `--` al ejecutar `npm start`

  - `npm run build`

    Construir un archivo distribuible

  - `npm run test:browser`

    Ejecutar las pruebas de navegador en un navegador web real

  - `npm run test:server`

    Lanzar el servidor de pruebas usando Mocha

Para saber mas información sobre estos comandos lanzar `npm run ${task} -- --help`.
