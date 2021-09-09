const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const atributosSchema = new Schema({
  index: Number,
  nome: String,
  quantidade: Number,
  valor: Number,
})

const adicionaisSchema = new Schema({
  index: Number,
  nome: String,
  quantidade: Number,
  valor: Number,
  atributos: atributosSchema,
})

const produtosSchema = new Schema({
  index: Number,
  nome: String,
  quantidade: Number,
  valor: Number,
  adicionais: [adicionaisSchema],
  archived: { type: Boolean, default: false },
})

const orderSchema = new Schema(
  {
    _id: ObjectId,
    loja: String,
    cliente: String,
    entrega: Number,
    produtos: [produtosSchema],
    total: Number,
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
