# Prueba Técnica Foca Software

Este proyecto es una aplicación Angular que consume la API de JSONPlaceholder para mostrar posts y sus comentarios asociados.

## Descripción

La aplicación permite a los usuarios:
- Ver una lista de posts
- Ver el detalle de cada post
- Ver los comentarios asociados a cada post

## Tecnologías utilizadas

- Angular 19.2.0
- TypeScript
- RxJS
- JSONPlaceholder API

## Estructura del proyecto

    PruebaTecnicaFocaSoftware/
    ├── .angular
    ├── node_modules
    ├── public
    ├── src
    │   ├── app
    │   │   ├── environment
    │   │   │   └── environment
    │   │   ├── posts
    │   │   │   ├── components
    │   │   │   │   ├── post-detail
    │   │   │   │   └── post-list
    │   │   │   ├── models
    │   │   │   │   ├── comment
    │   │   │   │   └── post
    │   │   │   ├── services
    │   │   │   │   ├── posts.service.spec
    │   │   │   │   └── posts.service
    │   │   │   └── posts.module
    │   │   ├── shared
    │   │   │   ├── components
    │   │   │   │   ├── error-message
    │   │   │   │   └── loading-spinner
    │   │   │   └── shared.module  
    │   │   ├── app.componentcss
    │   │   ├── app.component.html
    │   │   ├── app.component.spec.ts
    │   │   ├── app.component.ts
    │   │   ├── app.configts
    │   │   ├── app.module.ts
    │   │   └── app.routing.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css  
    │
    ├── angular.json
    ├── package-lock.json
    └── package.json


## Instalación

1. Clona este repositorio
```bash
git clone https://github.com/santvallejos/PruebaTecnicaFocaSoftware.git
```

2. Instala las dependencias
```bash
cd PruebaTecnicaFocaSoftware
npm install
```

3. Ejecuta la aplicación
```bash
ng serve
```

## Autor

[![LinkedIn Follow](https://img.icons8.com/?size=50&id=447&format=png&color=000000)](https://www.linkedin.com/in/santiago-vallejos-97a933236/)
[![Github](https://img.icons8.com/?size=50&id=62856&format=png&color=000000)](https://github.com/santvallejos)