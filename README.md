# Garager Backend

Este é o backend do aplicativo Garager, o projeto é feito em NestJS.  
A branch principal é `main`.

O código principal está dentro de "src".

---

# Padrão de projeto Decorator

Vamos exemplificar o padrão de projeto **Decorator** criado no arquivo `src/decorators/jwt.decorator.ts` (https://github.com/garager-inc/garager-backend/blob/main/src/decorators/jwt.decorator.ts) presente em todos (quase todos) os Controllers da API.

A função do decorator JWT é facilitar a remoção da necessidade de autenticação para acessar determinadas rotas.

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

# Testes Unitários

## Para rodar os testes:

```shell
yarn test
```

## Os seguintes Services foram testados:

- Available Slots
- Appointments

## Os seguintes Controllers foram testados:

- Available Slots
- Auth

# Regras de negócio do service Appointments

## Criação de Agendamentos (`createAppointment`)

1. **Verificação de slot disponível**:

   - Se o slot disponível para o dia especificado não for encontrado, um erro é lançado: `Available slot not found for the specified day`.

2. **Horário do agendamento fora do intervalo**:

   - Se o horário do agendamento estiver fora do intervalo do slot disponível, um erro é lançado: `Appointment time is outside the available slot range`.

3. **Slot ocupado**:

   - Se o slot disponível já estiver ocupado, um erro é lançado: `The available slot is already occupied`.

4. **Criação bem-sucedida**:
   - Um agendamento é criado com sucesso se todas as validações forem atendidas.

## Listagem de Agendamentos (`listAppointments`)

1. **Retorno de lista de agendamentos**:
   - Retorna a lista de agendamentos para um workshop específico.
2. **Resultado vazio**:
   - Se não houver agendamentos, retorna uma lista vazia.

## Busca de um Agendamento (`findOne`)

1. **Retorno de um agendamento específico**:
   - Retorna um agendamento baseado no ID fornecido.
2. **Resultado indefinido**:
   - Se o agendamento não for encontrado, retorna `undefined`.

## Exclusão de Agendamentos (`delete`)

1. **Deleção de agendamento**:

   - Remove um agendamento baseado no ID fornecido. Após a remoção, a lista de agendamentos é atualizada.

2. **Deleções concorrentes**:

   - Lida com exclusões concorrentes, retornando `true` ou `false` dependendo da conclusão ou falha da deleção.

3. **Entrada inválida para `appointmentId`**:
   - Se um ID inválido for fornecido, o método de exclusão retorna `false`.
