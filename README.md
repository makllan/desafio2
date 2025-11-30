# Desafio 2 – Marketplace de Produtos Simples

Um sistema simples de marketplace com backend em Spring Boot e frontend em React.

## 🛠️ Tecnologias Utilizadas

### **Back-end**
*   ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) **Java 17**
*   ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) **Spring Boot**
*   ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) **PostgreSQL**
*   ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) **SpringDoc OpenAPI**

### **Front-end**
*   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) **React**
*   ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) **Vite**
*   ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) **Docker & Docker Compose**

## Pré-requisitos

- Docker e Docker Compose instalados.
- Java 17 (para desenvolvimento local).
- Node.js 18+ (para desenvolvimento local).

## Como Executar (Docker)

1. Clone o repositório.
2. Na raiz do projeto, execute:

```bash
docker-compose up --build
```

3. Acesse:
    - **Frontend**: http://localhost:3000
    - **Backend API**: http://localhost:8080
    - **Swagger UI**: http://localhost:8080/swagger-ui/index.html

## Estrutura do Projeto

- `back-end/`: Código fonte da API Spring Boot.
- `front-end/`: Código fonte da aplicação React.
- `docker-compose.yml`: Orquestração dos containers.

## Funcionalidades

- Listagem de produtos.
- Cadastro e edição de produtos.
- Adição de produtos ao carrinho.
- Checkout com validação de estoque.
- Persistência em banco de dados PostgreSQL.

## Endpoints Principais

- `GET /products`: Lista produtos.
- `POST /products`: Cria produto.
- `POST /cart/checkout`: Realiza a compra.

## Testes

### Backend
Para rodar os testes unitários do backend:

```bash
cd back-end
mvn test
```

### Frontend
(Testes unitários frontend pendentes de configuração Jest/Vitest completa)
