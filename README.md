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

src/
├── app/
│   ├── environment/
│   │   └── environment.ts
│   ├── posts/
│   │   ├── components/
│   │   │   ├── post-list/
│   │   │   └── post-detail/
│   │   ├── models/
│   │   │   ├── post-model.ts
│   │   │   └── comment-model.ts
│   │   ├── services/
│   │   │   └── posts.service.ts
│   │   └── posts.module.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── error-message/
│   │   │   └── loading-spinner/
│   │   └── shared.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.module.ts
│   └── app.routes.ts
└── main.ts


## Instalación

1. Clona este repositorio
```bash
git clone <url-del-repositorio>
```

2. Instala las dependencias
```bash
cd <nombre-del-proyecto>
npm install
```

3. Ejecuta la aplicación
```bash
ng serve
```