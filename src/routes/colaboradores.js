import express from 'express'
import Colaborador from '../models/Colaborador.js'

const router = express.Router()

// ✅ GET todos os colaboradores
router.get('/', async (req, res) => {
  try {
    const colaboradores = await Colaborador.find()
    res.json(colaboradores)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar colaboradores', detalhe: err.message })
  }
})

// ✅ GET colaborador por ID
router.get('/:id', async (req, res) => {
  try {
    const colaborador = await Colaborador.findById(req.params.id)
    if (!colaborador) {
      return res.status(404).json({ erro: 'Colaborador não encontrado' })
    }
    res.json(colaborador)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar colaborador', detalhe: err.message })
  }
})

// ✅ POST novo colaborador
router.post('/', async (req, res) => {
  try {
    const novo = new Colaborador(req.body)
    const salvo = await novo.save()
    res.status(201).json(salvo)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar colaborador', detalhe: err.message })
  }
})

// ✅ PUT atualizar colaborador
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Colaborador.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!atualizado) {
      return res.status(404).json({ erro: 'Colaborador não encontrado para atualização' })
    }
    res.json(atualizado)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar colaborador', detalhe: err.message })
  }
})

// ✅ DELETE colaborador
router.delete('/:id', async (req, res) => {
  try {
    const deletado = await Colaborador.findByIdAndDelete(req.params.id)
    if (!deletado) {
      return res.status(404).json({ erro: 'Colaborador não encontrado para exclusão' })
    }
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir colaborador', detalhe: err.message })
  }
})

export default router
