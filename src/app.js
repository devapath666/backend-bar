import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import mesasRoutes from './routes/mesas.routes.js';
import productosRoutes from './routes/productos.routes.js';
import comandasRoutes from './routes/comandas.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

dotenv.config();

const app = express();

// CORS PRODUCCIÓN 🔥
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

/** 🔥 Ruta raíz para Railway / Postman **/
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend funcionando en Render 🚀'
  });
});

/** 🔥 Ruta de chequeo de salud */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

/** Tus rutas reales **/
app.use('/api/mesas', mesasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/comandas', comandasRoutes);
app.use('/api/usuarios', usuariosRoutes);

export default app;
