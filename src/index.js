import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// ⬇️ Importa rotas
import atividadesRoutes from './routes/atividades.js'
import colaboradoresRoutes from './routes/colaboradores.js'

// Configura .env
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas')
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT || 5000}`)
    )
  })
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err))

// Rotas da API
app.use('/api/atividades', atividadesRoutes)
app.use('/api/colaboradores', colaboradoresRoutes)
