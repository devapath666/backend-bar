import prisma from '../config/database.js';
import bcrypt from 'bcrypt';

export const getAllUsuarios = async () => {
  return await prisma.usuario.findMany({
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      createdAt: true
      // NO devolvemos password
    },
    orderBy: { nombre: 'asc' }
  });
};

export const getUsuarioById = async (id) => {
  return await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      createdAt: true
    }
  });
};

export const createUsuario = async (data) => {
  const { nombre, email, password, rol } = data;
  
  // Hashear password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return await prisma.usuario.create({
    data: {
      nombre,
      email,
      password: hashedPassword,
      rol: rol || 'MOZO'
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      createdAt: true
    }
  });
};

export const updateUsuario = async (id, data) => {
  const updateData = { ...data };
  
  // Si viene password, hashearlo
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  
  return await prisma.usuario.update({
    where: { id: parseInt(id) },
    data: updateData,
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      createdAt: true
    }
  });
};

export const deleteUsuario = async (id) => {
  return await prisma.usuario.delete({
    where: { id: parseInt(id) }
  });
};