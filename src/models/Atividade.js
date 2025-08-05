import mongoose from 'mongoose'

const atividadeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  colaboradorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Colaborador', required: true },
  status: { 
    type: String, 
    enum: ['pendente', 'em-andamento', 'concluida', 'cancelada'], 
    default: 'pendente' 
  },
  prioridade: { 
    type: String, 
    enum: ['baixa', 'media', 'alta'], 
    default: 'media' 
  },
  duracao: { type: Number, default: 0 }, // em horas
  prazo: Date,
}, { timestamps: true })
export default mongoose.model('Atividade', atividadeSchema)
