const Order = require('../models/Order')

module.exports = class ItemsController {

  async create(req, res) {
    const order = await Order.findOne({ loja: req.body.loja.toString(), cliente: req.body.cliente, archived: false })

    if (order) {
      req.body.produtos?.forEach((produto) => {
        const adicionais = produto.adicionais?.map((adicional, indexAdicional) => {
          return {
            index: indexAdicional,
            nome: adicional.nome,
            quantidade: adicional.quantidade,
            valor: adicional.valor,
            atributos: adicional.atributos,
          }
        })

        order.produtos.push({
          index: order.produtos.length,
          nome: produto.nome,
          quantidade: produto.quantidade,
          valor: produto.valor,
          adicionais
        })
      })

      await order.save()
    }

    res.status(201).send(order)
  }

  async delete(req, res) {
    const order = await Order.findOne({ loja: req.body.loja.toString(), cliente: req.body.cliente, archived: false })

    if (order) {
      const produto = order.produtos.filter((produto) => {
        return produto.index === req.body.item
      })

      console.log(produto)

      produto[0].remove()

      await order.save()
    }

    res.status(204).send(order)
  }
}
