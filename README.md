
## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Docker
- EJS (Template Engine)
- Tailwind CSS

## Requisitos

- Docker
- Docker Compose

## Como Executar

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Inicie os containers com Docker Compose:
```bash
docker compose up -d
```

3. Acesse a aplicação:
- Frontend: http://localhost:3000
- pgAdmin: http://localhost:8081
  - Email: admin@admin.com
  - Senha: P@ssw0rd

## Estrutura do Projeto

```
.
├── app/                    # Aplicação Node.js
│   ├── controllers/       # Controladores
│   ├── models/           # Modelos
│   ├── routes/           # Rotas
│   ├── views/            # Templates EJS
│   ├── db.js             # Configuração do banco de dados
│   └── server.js         # Arquivo principal
├── db/                    # Configuração do PostgreSQL
├── docker-compose.yml     # Configuração do Docker Compose
└── README.md             # Este arquivo
```

## Licença

Este projeto está sob a licença MIT. 