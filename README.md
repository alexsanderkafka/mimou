# Mimou
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/alexsanderkafka/mimou/blob/main/LICENSE) 

# Sobre o projeto
A aplicação consiste na criação de um exemplo de micro saas, o usuário escolhe entre dois planos e preenche seus dados (frases, fotos e e-mail), que são enviados para o back-end para validação. Após a confirmação das informações, o usuário é redirecionado para a etapa de pagamento. Finalizado o pagamento e a confirmação por parte da aplicação o usuário recebe via e-mail o link de acesso para o site e o QRCode.

# Integrações
- Firebase storage
- Mercado pago
- E-mail

## Layout Responsivo
![mobile-1](https://github.com/alexsanderkafka/mimou/blob/main/assets-readme/lp-mobile.gif) ![mobile-2](https://github.com/alexsanderkafka/mimou/blob/main/assets-readme/register-page-mobile.gif) ![mobile-3](https://github.com/alexsanderkafka/mimou/blob/main/assets-readme/gift-page-mobile.gif)

## Layout web
![web-1](https://github.com/alexsanderkafka/mimou/blob/main/assets-readme/lp-web.gif)

![web-2](https://github.com/alexsanderkafka/mimou/blob/main/assets-readme/register-page-web.gif)

![web-3](https://github.com/alexsanderkafka/mimou/blob/main/assets-readme/gift-page-web.png)

## DER - Diagrama de entidade relacional
![der]

# Tecnologias utilizadas
## Back end
- NodeJS
- Express
- Rounting Controllers

## Front end
- React

## Banco de dados
- MySQL

## Para deploy
- Docker

# Como executar o projeto

## Back end
Pré-requisitos: NodeJS

```bash
# clonar repositório
git clone https://github.com/alexsanderkafka/mimou.git

# configurar o .env
API_KEY=api_key
AUTH_DOMAIN=firebase_auth_domain
DATABASE_URL=optional
PROJECT_ID=firebase_project_id
STORAGE_BUCKET=firebase_storage_bucker
MESSAGING_SENDER_ID=firebase_messaging_sende_id
APP_ID=firebase_app_id
MEASUREMENT_ID=firebase

DB_HOST=host
DB_PORT=db_port
DB_USERNAME=user
DB_PASSWORD=pass
DB_NAME=db_name

SERVER_PORT=port

MERCADO_PAGO_ACCESS_TOKEN=private_token_mercado_pago
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=public_key_mercado_pago
MERCADO_PAGO_WEBHOOK_SECRET=webhook_mercado_pago

MAIL_HOST=host_email
MAIL_PORT=port
MAIL_USER=email
MAIL_PASS=pass_app

# configurar o banco de dados
- Na pasta mimou-back possui um arquivo chamado init.sql, nele possui todos os comandos sql

# entrar na pasta do projeto back end
cd mimou-back
npm install

# executar o projeto
npm run dev

# Ou você pode utilizar o docker
cd mimou-back
docker-compose up -d

```

## Front end web
Pré-requisitos: npm

```bash
# clonar repositório
git clone https://github.com/alexsanderkafka/mimou.git

# entrar na pasta do projeto front end web
cd mimou-front

# instalar dependências
npm install

# executar o projeto
npm start
```

# Autor

Alexsander Kafka

https://www.linkedin.com/in/alexsander-kafka-525a87251/
