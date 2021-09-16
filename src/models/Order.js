const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const valoresSchema = new Schema({
  nome: String,
  quantidade: Number,
  valor: Number,
})

const atributosSchema = new Schema({
  nome: String,
  quantidade: Number,
  valor: Number,
  valores: valoresSchema,
})

const produtosSchema = new Schema({
  nome: String,
  quantidade: Number,
  valor: Number,
  atributos: [atributosSchema],
})

const orderSchema = new Schema(
  {
    _id: ObjectId,
    loja: String,
    cliente_id: String,
    entrega: Number,
    produtos: [produtosSchema],
    total: Number,
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
)

orderSchema.pre('save', function (next) {
  const order = this

  if (!order._id) {
    order._id = new mongoose.Types.ObjectId()
  }

  next()
})

orderSchema.set('toJSON', {
  virtuals: true,
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order