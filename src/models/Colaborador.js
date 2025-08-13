import mongoose from 'mongoose';

const colaboradorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cargo: String,
  email: { type: String, required: true, unique: true },
  telefone: String,
  departamento: String
});

export default (conexao) => conexao.model('Colaborador', colaboradorSchema);
