# API REST com autenticação JWT

API REST de um sistema de consulta e manipulação de jogos em um banco de dados fictício.

## Logo

### Interface do usuário

<div align="center">
  <img src="img/logo.png" alt="Imagem do Projeto" width="600">
</div>

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Status](#status)
- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Documnetação da API](#documentação-da-api)
- [Autor](#autor)

## Tecnologias Utilizadas

<div style="display: flex; flex-direction: row;">
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/node.png" alt="Logo Linguagem" width="150"/>
  </div>
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/js.png" alt="Logo Linguagem" width="150"/>
  </div>
</div>

## Status

![Em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge)

<!-- ![Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)-->

## Descrição

Esse projeto consiste em uma API de games responsável por realizar o login com autenticação do usuário, este que pode adicionar novos jogos a lista, pode excluir ou editar os jogos.

## Funcionalidades

- Autenticação de usuario.
- Login de usuario.
- Adição de jogos no banco de dados.
- Edição de jogos no banco de dados.
- Exclusão jogos no banco de dados.

## Como Usar

1. Clone o reṕositorio em sua maquina local
2. cd pastaDoArquivo
3. npm init
4. npm install express --save
5. node main.js

Com isso a API já esta rodando, para consumir esta API basta ir no index.html e utilizar a extensão liveServer para ter acesso a interface.

## Documentação

### Endpoints

#### POST /auth

Este endpoint autentica um usuário e retorna um token de acesso JWT válido para uso em endpoints protegidos.

##### Parâmetros:

Corpo da requisição deve conter os seguintes campos:

- `email` (string): O endereço de e-mail do usuário.
- `password` (string): A senha do usuário.

##### Retorno:

- Status Code: 200 OK se as credenciais forem válidas e o token for gerado com sucesso.
- Status Code: 400 Bad Request se houver um erro interno durante a geração do token.
- Status Code: 401 Unauthorized se as credenciais forem inválidas.
- Status Code: 404 Not Found se o e-mail fornecido não existir na base de dados.

Corpo da resposta (em caso de sucesso):

- Um objeto JSON contendo o token de acesso JWT.

Exemplo de corpo de resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkaWVnb0BlbWFpbC5jb20iLCJpYXQiOjE2MzAxMjY3MzYsImV4cCI6MTYzMDIzMDMzNn0.Y5BSsGv4XRfVAgXou3rfpsQUBZUDeKwSk-MTmWhNwlE"
}
```

#### GET /games

Este endpoint retorna a lista de jogos disponíveis.

##### Parâmetros:

Nenhum.

##### Retorno:

- Status Code: 200 OK
- Corpo da resposta: Uma lista de objetos JSON, cada um representando um jogo com os seguintes atributos:
  - `id` (number): O identificador único do jogo.
  - `title` (string): O título do jogo.
  - `year` (number): O ano de lançamento do jogo.
  - `price` (number): O preço do jogo.

#### GET /game/:id

Este endpoint retorna um jogo específico com base no seu ID.

##### Parâmetros:

1. `id` (number): O ID do jogo a ser recuperado.

##### Retorno:

- Status Code: 200 OK se o jogo for encontrado.
- Status Code: 404 Not Found se o jogo não for encontrado.
- Corpo da resposta: Um objeto JSON representando o jogo com os seguintes atributos:
  - `id` (number): O identificador único do jogo.
  - `title` (string): O título do jogo.
  - `year` (number): O ano de lançamento do jogo.
  - `price` (number): O preço do jogo.

#### POST /game

Este endpoint adiciona um novo jogo à lista de jogos.

##### Parâmetros:

Corpo da requisição deve conter os seguintes campos:

- `title` (string): O título do novo jogo.
- `price` (number): O preço do novo jogo.
- `year` (number): O ano de lançamento do novo jogo.

##### Retorno:

- Status Code: 200 OK se o jogo for adicionado com sucesso.

#### DELETE /game/:id

Este endpoint exclui um jogo com base no seu ID.

##### Parâmetros:

1. `id` (number): O ID do jogo a ser excluído.

##### Retorno:

- Status Code: 200 OK se o jogo for excluído com sucesso.
- Status Code: 404 Not Found se o jogo não for encontrado.

#### PUT /game/:id

Este endpoint atualiza as informações de um jogo existente com base no seu ID.

##### Parâmetros:

1. `id` (number): O ID do jogo a ser atualizado.

Corpo da requisição pode conter os seguintes campos para atualização:

- `title` (string): O novo título do jogo.
- `price` (number): O novo preço do jogo.
- `year` (number): O novo ano de lançamento do jogo.

##### Retorno:

- Status Code: 200 OK se o jogo for atualizado com sucesso.
- Status Code: 404 Not Found se o jogo não for encontrado.

# Autor

Desenvolvido por Diego Franco.
