import prisma from '../config/database.js';

export const getAllComandas = async () => {
  return await prisma.comanda.findMany({
    include: {
      mesa: true,
      usuario: {
        select: { id: true, nombre: true, rol: true, email: true }
      },
      items: {
        include: {
          producto: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getComandasActivas = async () => {
  return await prisma.comanda.findMany({
    where: {
      estado: {
        in: ['PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO'] // ← Agregar ENTREGADO
      }
    },
    include: {
      mesa: true,
      usuario: {
        select: { id: true, nombre: true, rol: true, email: true }
      },
      items: {
        include: {
          producto: true
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  });
};

export const getComandaById = async (id) => {
  return await prisma.comanda.findUnique({
    where: { id },
    include: {
      mesa: true,
      usuario: true,
      items: {
        include: {
          producto: true
        }
      }
    }
  });
};

export const getComandasByMesa = async (mesaId) => {
  return await prisma.comanda.findMany({
    where: { mesaId: parseInt(mesaId) },
    include: {
      items: {
        include: {
          producto: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const createComanda = async (data) => {
  const { mesaId, usuarioId, usuarioEmail, items } = data;

  // Obtener productos reales (para precio y validación)
  const productosIds = items.map(item => item.productoId);
  const productos = await prisma.producto.findMany({
    where: { id: { in: productosIds } }
  });

  // Calcular total y preparar items
  let total = 0;
  const itemsData = items.map(item => {
    const producto = productos.find(p => p.id === item.productoId);
    if (!producto) {
      throw new Error(`Producto ${item.productoId} no encontrado`);
    }

    const subtotal = producto.precio * item.cantidad;
    total += subtotal;

    return {
      productoId: item.productoId,
      cantidad: item.cantidad,
      precio: producto.precio,
      observaciones: item.observaciones || null
    };
  });

  // Crear comanda + items
  const comanda = await prisma.comanda.create({
    data: {
      mesaId: parseInt(mesaId),
      usuarioId: parseInt(usuarioId),
      usuarioEmail,  // ✔ GUARDAR EMAIL DEL USUARIO
      total,
      items: {
        create: itemsData
      }
    },
    include: {
      mesa: true,
      usuario: {
        select: { id: true, nombre: true, rol: true, email: true }
      },
      items: {
        include: { producto: true }
      }
    }
  });

  // Cambiar mesa a OCUPADA
  await prisma.mesa.update({
    where: { id: parseInt(mesaId) },
    data: { estado: 'OCUPADA' }
  });

  return comanda;
};


export const updateEstado = async (id, nuevoEstado) => {
  const comanda = await prisma.comanda.update({
    where: { id },
    data: { estado: nuevoEstado },
    include: {
      mesa: true,
      items: {
        include: {
          producto: true
        }
      }
    }
  });
  
  // Si el estado es PAGADO, liberar la mesa
  if (nuevoEstado === 'PAGADO') {
    await prisma.mesa.update({
      where: { id: comanda.mesaId },
      data: { estado: 'DISPONIBLE' }
    });
  }
  
  return comanda;
};

export const getHistorial = async () => {
  return await prisma.comanda.findMany({
    where: {
      estado: "PAGADO"
    },
    include: {
      mesa: true,
      usuario: {
        select: { id: true, nombre: true, email: true }
      },
      items: {
        include: { producto: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};


