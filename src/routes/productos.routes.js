import { Router } from 'express';
import * as productosController from '../controllers/productos.controller.js';

const router = Router();

// Listar todos los productos
router.get('/', productosController.getProductos);

// Obtener 1 producto por ID
router.get('/:id', productosController.getProductoById);

// Crear producto
router.post('/', productosController.createProducto);

// Actualizar producto
router.patch('/:id', productosController.updateProducto);

// Borrado lógico
router.delete('/:id', productosController.deleteProducto);

export default router;
