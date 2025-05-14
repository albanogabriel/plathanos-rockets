# INSTRUÇÕES

# Pré-requisitos:

- Docker
- Docker Compose

# 1. Clone o repositório

git clone https://github.com/albanogabriel/plathanos-rockets.git

# 2. Crie o arquivo .env e Configure as variáveis de ambiente

      NODE_ENV=development
      DATABASE_URL="postgresql://user:rocket123@rocket-db:5432/apirocket"

# 3. Inicie o container do PostgreSQL/Prisma com o comando:

> docker network create app-network  
> docker compose up -d

# SWAGGER/DOCUMENTAÇÃO

> http://localhost:3333/docs
