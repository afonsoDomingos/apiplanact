import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// ⬇️ Importação das rotas
import atividadesRoutes from './routes/atividades.js'
import colaboradoresRoutes from './routes/colaboradores.js'

// ⬇️ Carrega variáveis de ambiente
dotenv.config()

const app = express()

// ⬇️ Middlewares globais
app.use(cors())
app.use(express.json())

// ⬇️ Conexão ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado ao MongoDB Atlas')

  // ⬇️ Inicializa servidor após conexão bem-sucedida
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
  })
})
.catch((err) => {
  console.error('❌ Erro ao conectar ao MongoDB:', err)
})

// ⬇️ Rotas da API
app.use('/api/atividades', atividadesRoutes)
app.use('/api/colaboradores', colaboradoresRoutes)
