<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


## Description

Proyecto para el curso de NESTJS de Fernando Herrera de Udemy.

## Project setup

1. Clonar el repositorio

2. Ejecutar
```bash
$ npm install
```

3. Tener Nest CLI instalado
```bash
npm i -g @nestjs/cli
```

4. Levantar la base de datos local
```bash
docker-compose up -d
```

5. Clonar el archivo __.env.template__. Renombrar a ".env" y llenar los valores correspondientes.

6. Crear base de datos (SEED)
- Buscar la constante DEFAULT_LIMIT_SEED y agregarle la cantidad de pokemons a insertar, luego ejecutar
```
http://localhost:3001/api/v0/seed
```


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### LA SEMILLA SE LLENA CON LOS DATOS DE ```POKE API```

### Stack tecnologico

* MongoDB
* NestJS
* Axios [Http client]
* Joi [Validations]
