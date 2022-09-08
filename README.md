<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>
<p align="center">
<span><strong> Task Management App </strong><span>
</p>

## Description

Task Management App created while going through official overview docs to understand best practices used in NestJS. Initial boilerplate was setup using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
  
## NestJS concepts

1. **Controller:** handle requests and send responses
2. **Provider(Service):** contains buisness logic. Can be used by controllers and other services. Interacts with models.
3. **Modules:** provide abstraction grouping Providers, Controller and Models by business entities (features, etc).
4. **Model:** provide abstraction over data storage and retrieval logic.
5. **DTO (Data Transfer Objects):** define shape of incoming data in request body and act as reusable types entities across whole application
6. **Pipes:** specific middleswares for validation/transformation before handling request to **Controller**
    - can be defined at parameter or handler level
    - Use both of these for helper decorator functions
        - https://github.com/typestack/class-validator
        - https://github.com/typestack/class-transformer

## License

[MIT](https://github.com/griimick/blog/blob/master/LICENSE) © [Soumik Pradhan](https://www.soumik.dev)
