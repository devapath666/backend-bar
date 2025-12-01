import { Router } from 'express';
import * as comandasController from '../controllers/comandas.controller.js';

const router = Router();

// ORDEN CORRECTO
router.get('/', comandasController.getComandas);
router.get('/activas', comandasController.getComandasActivas);
router.get('/mesa/:mesaId', comandasController.getComandasByMesa);

// 👉 Historial debe ir ANTES de /:id
router.get('/historial', comandasController.getHistorial);

router.get('/:id', comandasController.getComandaById);
router.post('/', comandasController.createComanda);
router.patch('/:id/estado', comandasController.updateEstado);

export default router;
