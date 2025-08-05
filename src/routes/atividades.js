import express from 'express';
import Atividade from '../models/Atividade.js';

const router = express.Router();

// GET todas as atividades
router.get('/', async (req, res) => {
  try {
    const atividades = await Atividade.find();
    res.json(atividades);
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    res.status(500).json({ error: 'Erro ao buscar atividades' });
  }
});

// POST criar nova atividade
router.post('/', async (req, res) => {
  try {
    const novaAtividade = new Atividade(req.body);s
    const salva = await novaAtividade.save();
    res.status(201).json(salva);
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    res.status(400).json({ error: 'Erro ao criar atividade' });
  }
});

// PUT atualizar atividade existente
router.put('/:id', async (req, res) => {
  try {
    const atualizada = await Atividade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!atualizada) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }

    res.json(atualizada);
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    res.status(400).json({ error: 'Erro ao atualizar atividade' });
  }
});

// DELETE atividade
router.delete('/:id', async (req, res) => {
  try {
    const deletada = await Atividade.findByIdAndDelete(req.params.id);

    if (!deletada) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar atividade:', error);
    res.status(400).json({ error: 'Erro ao deletar atividade' });
  }
});

export default router;
