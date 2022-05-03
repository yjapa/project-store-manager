# Project Store Manager
# Contexto
Este projeto foi desenvolvido na @Trybe(curso de programação). O projeto consiste na construção de uma API RESTful utilizando a arquitetura MSC, tratando-se de um sistema de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar(CRUD) produtos e vendas.

Foi utilizado o banco de dados MySQL para a gestão dados

## Técnologias usadas

Back-end:
> Desenvolvido usando: Node.js, Express , MySQL!

## Instalando Dependências

Após clonar o projeto, utilize na pasta raiz o comando:

```bash
npm install
```

## Variáveis de Ambiente

Na raiz do projeto, crie um arquivo .env para configurar as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e senha `1234` seu arquivo ficará desta forma:

```bash
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

## Executando aplicação

Para rodar o projeto, utilize na pasta raiz o comando:

```bash
npm start
```

* Os endpoints estão no padrão REST, ou seja, utilize os verbos HTTP para realizar as requisições.

## Requisições

### Cadastro de Produtos

* Para cadastrar um produto, devemos acessar o endpoint `POST /products`
* O endpoint deve receber a seguinte estrutura:
```bash
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

### Listar os Produtos

* Para listar os produtos, devemos acessar o endpoint `GET /products`

### Atualizar um produto

* Para atualizar um produto, devemos acessar o endpoint `PUT /products/:id` passando na URL o ID do produto que desejamos atualizar.
* O corpo da requisição deve receber a seguinte estrutura:
```bash
{
  "name": "new_product_name",
  "quantity": "new_product_quantity"
}
```

### Deletar um produto

* Para deletar um produto, devemos acessar o endpoint `DELETE /products/:id` passando na URL o ID do produto que desejamos deletar.

### Cadastro de Vendas

* Para cadastrar uma venda, devemos acessar o endpoint `POST /sales`
* O endpoint deve receber a seguinte estrutura:
```bash
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

### Cadastro de Vendas

* Para cadastrar uma venda, devemos acessar o endpoint `POST /sales`
* O endpoint deve receber a seguinte estrutura:
```bash
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

### Listar as Vendas

* Para listar os produtos, devemos acessar o endpoint `GET /sales`

### Atualizar uma venda

* Para atualizar uma venda, devemos acessar o endpoint `PUT /sales/:id` passando na URL o ID do produto que desejamos atualizar.
* O corpo da requisição deve receber a seguinte estrutura:
```bash
[
  {
    "product_id": "id_change",
    "quantity": "new_quantity"
  }
]
```
