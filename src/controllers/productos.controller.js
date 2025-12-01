// productos.controller.js
import * as productosService from '../services/productos.service.js';

export const getProductos = async (req, res) => {
  try {
    const productos = await productosService.getProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo productos" });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await productosService.getProductoById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo producto" });
  }
};

export const createProducto = async (req, res) => {
  try {
    const nuevoProducto = await productosService.createProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error creando producto" });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const actualizado = await productosService.updateProducto(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando producto" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const borrado = await productosService.deleteProducto(req.params.id);
    res.json({
      message: "Producto marcado como no disponible",
      producto: borrado
    });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando producto" });
  }
};
