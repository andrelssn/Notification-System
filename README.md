# Notifications System

### Mensagem do Desenvolvedor
```bash
Por ter pouco tempo de desafio, não desenvolvi uma interface estilizada,
foquei 100% na funcionalidade do front-end e backend, peço que ignore este fator se possível.

Muito obrigado e espero que gostem! Para mim foi uma experiência desafiadora.
```

## Requirements
- Node 18+
- Angular CLI (to run locally without Docker)
- Docker/Docker Compose (optional)


## Run without Docker


### Backend
cd backend
npm install
npm run start


### Frontend
cd frontend
npm install
ng serve --host 0.0.0.0 --port 4200


Open http://localhost:4200 to send notifications. Backend: http://localhost:8000


## Run with Docker Compose


docker-compose up --build


Access frontend at http://localhost:4200


## Notes
- Input queue: queue.notification.input.ander-sants
- Status queue: queue.notification.status.ander-sants
