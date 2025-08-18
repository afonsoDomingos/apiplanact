import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// Rotas
import atividadesRoutes from './routes/atividades.js'
import colaboradoresRoutes from './routes/colaboradores.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Criar conexões separadas
const conexoes = {
  projetoA: mongoose.createConnection(process.env.MONGO_URI_PROJETO_A),
  projetoB: mongoose.createConnection(process.env.MONGO_URI_PROJETO_B),
  projetoB: mongoose.createConnection(process.env.MONGO_URI_PROJETO_C),
}

// Middleware para selecionar a conexão
app.use((req, res, next) => {
  const chaveProjeto = req.headers['x-projeto'] // "projetoA" ou "projetoB"
  if (!conexoes[chaveProjeto]) {
    return res.status(400).json({ erro: 'Projeto inválido ou não informado' })
  }
  req.db = conexoes[chaveProjeto]
  next()
})

// Rotas
app.use('/api/atividades', atividadesRoutes)
app.use('/api/colaboradores', colaboradoresRoutes)

// Inicializa servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})
