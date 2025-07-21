import mongoose from 'mongoose'

const colaboradorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cargo: String,
  criadoEm: { type: Date, default: Date.now }
})

export default mongoose.model('Colaborador', colaboradorSchema)
