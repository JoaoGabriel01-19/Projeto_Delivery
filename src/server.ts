import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

// Carrega as variáveis declaradas no arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware obrigatório para permitir a leitura de payloads em formato JSON
app.use(express.json());

// Registro de rotas mapeadas na API
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});

