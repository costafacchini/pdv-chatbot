const Order = require('../models/Order')

module.exports = class ItemsController {

  async create(req, res) {
    const order = await Order.findOne({ loja: req.body.loja.toString(), cliente_id: req.body.cliente_id.toString(), archived: false })

    if (order) {
      req.body.produtos?.forEach((produto) => {
        const atributos = produto.atributos?.map((atributo) => {
          return {
            nome: atributo.nome,
            quantidade: atributo.quantidade,
            valor: atributo.valor,
            valores: atributo.valores,
          }
        })

        order.produtos.push({
          nome: produto.nome,
          quantidade: produto.quantidade,
          valor: produto.valor,
          atributos
        })
      })

      await order.save()
    }

    res.status(201).send(order)
  }

  async delete(req, res) {
    const order = await Order.findOne({ loja: req.body.loja.toString(), cliente_id: req.body.cliente_id.toString(), archived: false })

    if (order) {
      const produto = order.produtos[req.body.item - 1]

      console.log(produto)

      produto.remove()

      await order.save()
    }

    res.status(204).send(order)
  }
}
