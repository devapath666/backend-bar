import * as mesasService from '../services/mesas.service.js';

export const getMesas = async (req, res) => {
  try {
    const mesas = await mesasService.getAllMesas();
    res.json(mesas);
  } catch (error) {
    console.error('Error en getMesas:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getMesaById = async (req, res) => {
  try {
    const mesa = await mesasService.getMesaById(req.params.id);
    if (!mesa) {
      return res.status(404).json({ error: 'Mesa no encontrada' });
    }
    res.json(mesa);
  } catch (error) {
    console.error('Error en getMesaById:', error);
    res.status(500).json({ error: error.message });
  }
};

export const createMesa = async (req, res) => {
  try {
    const mesa = await mesasService.createMesa(req.body);
    res.status(201).json(mesa);
  } catch (error) {
    console.error('Error en createMesa:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateMesa = async (req, res) => {
  try {
    const mesa = await mesasService.updateMesa(req.params.id, req.body);
    res.json(mesa);
  } catch (error) {
    console.error('Error en updateMesa:', error);
    res.status(500).json({ error: error.message });
  }
};

export const toggleDisponibilidad = async (req, res) => {
  try {
    const mesa = await mesasService.toggleDisponibilidad(req.params.id);
    res.json(mesa);
  } catch (error) {
    console.error('Error en toggleDisponibilidad:', error);
    if (error.message.includes('comandas activas')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteMesa = async (req, res) => {
  try {
    await mesasService.deleteMesa(req.params.id);
    res.status(200).json({ message: 'Mesa eliminada correctamente' });
  } catch (error) {
    console.error('Error en deleteMesa:', error);
    if (error.message.includes('comandas activas')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};