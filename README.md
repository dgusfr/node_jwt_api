# GameVerse

O GameVerse é uma aplicação Fullstack com autenticação em uma API REST permitindo consultar e editar jogos em um banco de dados fictício.

<br>

### Interface do usuário

<div align="center">
  <img src="img/logo.png" alt="Imagem do Projeto" width="600">
</div>

<br>

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Status](#status)
- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Documnetação da API](#documentação-da-api)
- [Autor](#autor)

<br>

## Tecnologias Utilizadas

<div style="display: flex; flex-direction: row;">
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/node.png" alt="Logo Linguagem" width="150"/>
  </div>
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/js.png" alt="Logo Linguagem" width="150"/>
  </div>
</div>

<br>

## Status

![Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)

<br>

## Descrição

Esse projeto consiste em uma API de games responsável por realizar o login com autenticação do usuário, este que pode adicionar novos jogos a lista, pode excluir ou editar os jogos.

<br>

## Funcionalidades

- Autenticação de usuario.
- Login de usuario.
- Adição de jogos no banco de dados.
- Edição de jogos no banco de dados.
- Exclusão jogos no banco de dados.

<br>


## Documentação
<br>
<br>

### Endpoints
<br>
<br>

#### POST /auth
<br>

Este endpoint autentica um usuário e retorna um token de acesso JWT válido para uso em endpoints protegidos.
<br>

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

<br>
<br>

#### GET /games
<br>


Este endpoint retorna a lista de jogos disponíveis.
<br>

##### Parâmetros:

Nenhum.

##### Retorno:

- Status Code: 200 OK
- Corpo da resposta: Uma lista de objetos JSON, cada um representando um jogo com os seguintes atributos:
  - `id` (number): O identificador único do jogo.
  - `title` (string): O título do jogo.
  - `year` (number): O ano de lançamento do jogo.
  - `price` (number): O preço do jogo.
 
<br>
<br>


#### GET /game/:id
<br>


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

<br>
<br>


#### POST /game
<br>


Este endpoint adiciona um novo jogo à lista de jogos.

##### Parâmetros:

Corpo da requisição deve conter os seguintes campos:

- `title` (string): O título do novo jogo.
- `price` (number): O preço do novo jogo.
- `year` (number): O ano de lançamento do novo jogo.

##### Retorno:

- Status Code: 200 OK se o jogo for adicionado com sucesso.

<br>

#### DELETE /game/:id

Este endpoint exclui um jogo com base no seu ID.

##### Parâmetros:

1. `id` (number): O ID do jogo a ser excluído.

##### Retorno:

- Status Code: 200 OK se o jogo for excluído com sucesso.
- Status Code: 404 Not Found se o jogo não for encontrado.

<br>

#### PUT /game/:id
<br>


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

<br>

# Autor

Desenvolvido por Diego Franco.
