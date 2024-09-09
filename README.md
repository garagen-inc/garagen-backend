# Garager Backend

Este é o backend do aplicativo Garager, o projeto é feito em NestJS.  
A branch principal é `main`.

O código principal está dentro de "src".

---

# Padrão de projeto Decorator

Vamos exemplificar o padrão de projeto **Decorator** criado no arquivo `src/decorators/jwt.decorator.ts` (https://github.com/garager-inc/garager-backend/blob/main/src/decorators/jwt.decorator.ts) presente em todos (quase todos) os Controllers da API.

A função do decorator é facilitar a remoção do uso de rotas que precisam de autenticação para funcionar.
Quando declarado:

```ts
@JWT(false)
```

Sobre a definição endpoint, quando false, a rota **não precisa de autenticação** para responder.

O controle de autenticação é feito no guard (https://github.com/garager-inc/garager-backend/blob/main/src/guards/auth.guard.ts), que observa o estado do decorator JWT antes de processar uma rota:

```ts
const checkJWT = this.reflector.get<boolean>('jwt', context.getHandler()) ?? true; // verifica se a rota possuí o decorator @JWT

// caso checkJWT === @JWT(true) ou @JWT não existir sobre uma rota do Controller, a autenticação será feita normalmente (observando o token JWT no nosso caso).
```

---

# Clonar o repositório

```shell
git clone https://github.com/garager-inc/garager-backend
```

## Instalar dependências com Yarn

```shell
yarn
```

## Rodar o backend com Yarn (porta default é 3001)

```shell
yarn start
```

ou em modo de desenvolvimento (auto-refresh)

```shell
yarn dev
```

## Para rodar no Docker

```shell
yarn docker
```
