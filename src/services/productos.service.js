// productos.service.js
import prisma from '../config/database.js';


// Obtener todos los productos
export const getProductos = async () => {
  return await prisma.producto.findMany();
};

// Obtener producto por ID
export const getProductoById = async (id) => {
  return await prisma.producto.findUnique({
    where: { id: parseInt(id) }
  });
};

// Crear producto
export const createProducto = async (data) => {
  const { nombre, categoria, precio, disponible } = data;

  return await prisma.producto.create({
    data: {
      nombre,
      categoria,
      precio: parseFloat(precio),
      disponible: disponible !== undefined ? Boolean(disponible) : true
    }
  });
};

// Actualizar producto (solo campos enviados, con validaciones)
export const updateProducto = async (id, data) => {
  const validData = {};

  if (data.nombre !== undefined) validData.nombre = data.nombre;
  if (data.categoria !== undefined) validData.categoria = data.categoria;

  if (data.precio !== undefined)
    validData.precio = parseFloat(data.precio);

  if (data.disponible !== undefined)
    validData.disponible = Boolean(data.disponible);

  return await prisma.producto.update({
    where: { id: parseInt(id) },
    data: validData
  });
};

// BORRADO LÓGICO (no se elimina el registro)
export const deleteProducto = async (id) => {
  return await prisma.producto.update({
    where: { id: parseInt(id) },
    data: {
      disponible: false
    }
  });
};
