import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  
import mesasRoutes from './routes/mesas.routes.js';
import productosRoutes from './routes/productos.routes.js';
import comandasRoutes from './routes/comandas.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

app.use('/api/mesas', mesasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/comandas', comandasRoutes);
app.use('/api/usuarios', usuariosRoutes);

export default app;