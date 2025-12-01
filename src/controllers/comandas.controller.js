import * as comandasService from '../services/comandas.service.js';

export const getComandas = async (req, res) => {
  try {
    const comandas = await comandasService.getAllComandas();
    res.json(comandas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComandasActivas = async (req, res) => {
  try {
    const comandas = await comandasService.getComandasActivas();
    res.json(comandas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComandaById = async (req, res) => {
  try {
    const comanda = await comandasService.getComandaById(req.params.id);
    if (!comanda) {
      return res.status(404).json({ error: 'Comanda no encontrada' });
    }
    res.json(comanda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComandasByMesa = async (req, res) => {
  try {
    const comandas = await comandasService.getComandasByMesa(req.params.mesaId);
    res.json(comandas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createComanda = async (req, res) => {
  try {
    const comanda = await comandasService.createComanda(req.body);
    
    // Emitir evento WebSocket
    const io = req.app.get('io');
    io.emit('comanda_creada', comanda);
    
    res.status(201).json(comanda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const comanda = await comandasService.updateEstado(req.params.id, estado);
    
    // Emitir evento WebSocket
    const io = req.app.get('io');
    io.emit('comanda_actualizada', comanda);
    
    res.json(comanda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistorial = async (req, res) => {
  try {
    const historial = await comandasService.getHistorial();
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


