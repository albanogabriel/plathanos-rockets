# 🚀 Plathanos Rockets - API de Gerenciamento

> Um sistema simples para gerenciamento de dados de foguetes

[![Docker](https://img.shields.io/badge/Docker-✓-blue?logo=docker)](https://docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-✓-green?logo=node.js)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue?logo=postgresql)](https://postgresql.org)

## 🛠️ Tecnologias utilizadas

- **Containers**: Docker
- **ORM**: Prisma
- **Database**: PostgreSQL
- **API Language**: NODE.JS e Typescript

## 📋 Pré-requisitos

Antes de começar, verifique se você tem instalado:

- [Docker](https://www.docker.com/) (versão 20.10.0 ou superior)
- [Docker Compose](https://docs.docker.com/compose/) (versão 2.0.0 ou superior)

## 🛠️ Configuração e Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/albanogabriel/plathanos-rockets.git
cd plathanos-rockets
```

### 2. Crie o arquivo .env e Configure as variáveis de ambiente

NODE_ENV=development
DATABASE_URL="postgresql://user:rocket123@rocket-db:5432/apirocket"

### 3. Crie a conexão entre os containers

```bash
docker network create app-network
```

### 4. Inicie o container da aplicação:

```bash
docker compose up -d
```

### 5. Caso queira verificar os containers:

```bash
docker ps
```

## Verifique O Swagger/Docs

> http://localhost:3333/docs
