import express from 'express'
import Colaborador from '../models/Colaborador.js'

const router = express.Router()

// GET todos
router.get('/', async (req, res) => {
  const colaboradores = await Colaborador.find()
  res.json(colaboradores)
})

// POST novo
router.post('/', async (req, res) => {
  try {
    const novo = new Colaborador(req.body)
    const salvo = await novo.save()
    res.status(201).json(salvo)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

export default router
