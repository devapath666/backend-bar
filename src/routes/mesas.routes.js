import { Router } from 'express';
import * as mesasController from '../controllers/mesas.controller.js';

const router = Router();

router.get('/', mesasController.getMesas);
router.get('/:id', mesasController.getMesaById);
router.post('/', mesasController.createMesa);
router.patch('/:id', mesasController.updateMesa);
router.patch('/:id/disponibilidad', mesasController.toggleDisponibilidad);
router.delete('/:id', mesasController.deleteMesa);

export default router;