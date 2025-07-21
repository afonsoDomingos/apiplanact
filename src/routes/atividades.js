import express from 'express';
import Atividade from '../models/Atividade.js';

const router = express.Router();

// GET todas as atividades
router.get('/', async (req, res) => {
  const atividades = await Atividade.find();
  res.json(atividades);
});

// POST criar atividade
router.post('/', async (req, res) => {
  const novaAtividade = new Atividade(req.body);
  const salva = await novaAtividade.save();
  res.status(201).json(salva);
});

// PUT atualizar atividade
router.put('/:id', async (req, res) => {
  const atualizada = await Atividade.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizada);
});

// DELETE atividade
router.delete('/:id', async (req, res) => {
  await Atividade.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
