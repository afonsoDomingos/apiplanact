import mongoose from 'mongoose';

const atividadeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  status: {
    type: String,
    enum: ['pendente', 'em-andamento', 'concluida', 'cancelada'],
    default: 'pendente'
  },
  prazo: Date
}, { timestamps: true });

export default mongoose.model('Atividade', atividadeSchema);
