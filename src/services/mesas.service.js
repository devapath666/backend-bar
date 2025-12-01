import prisma from '../config/database.js';

export const getAllMesas = async () => {
  return await prisma.mesa.findMany({
    orderBy: { id: 'asc' }
  });
};

export const getMesaById = async (id) => {
  return await prisma.mesa.findUnique({
    where: { id: parseInt(id) }
  });
};

export const createMesa = async (data) => {
  const { numero, capacidad } = data;
  return await prisma.mesa.create({
    data: {
      numero,
      capacidad: capacidad || 4
    }
  });
};

export const updateMesa = async (id, data) => {
  return await prisma.mesa.update({
    where: { id: parseInt(id) },
    data
  });
};

export const toggleDisponibilidad = async (id) => {
  const mesa = await prisma.mesa.findUnique({
    where: { id: parseInt(id) }
  });

  if (!mesa) {
    throw new Error('Mesa no encontrada');
  }

  // Verificar si tiene comandas activas
  if (mesa.estado === 'OCUPADA') {
    const comandasActivas = await prisma.comanda.findFirst({
      where: {
        mesaId: parseInt(id),
        estado: {
          in: ['PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO']
        }
      }
    });

    if (comandasActivas) {
      throw new Error('No se puede desactivar una mesa con comandas activas');
    }
  }

  // Toggle entre DISPONIBLE y ESPERANDO_PAGO (usamos este como "desactivado")
  const nuevoEstado = mesa.estado === 'DISPONIBLE' ? 'ESPERANDO_PAGO' : 'DISPONIBLE';

  return await prisma.mesa.update({
    where: { id: parseInt(id) },
    data: { estado: nuevoEstado }
  });
};

export const deleteMesa = async (id) => {
  const comandasActivas = await prisma.comanda.findFirst({
    where: {
      mesaId: parseInt(id),
      estado: {
        in: ['PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO']
      }
    }
  });

  if (comandasActivas) {
    throw new Error('No se puede eliminar una mesa con comandas activas. Espere a que se finalicen los pedidos.');
  }

  return await prisma.mesa.delete({
    where: { id: parseInt(id) }
  });
};