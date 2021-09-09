const Order = require('../models/Order')

module.exports = class CartsController {

  async checkin(req, res) {
    const produtos = req.body.produtos?.map((produto, index) => {
      const adicionais = produto.adicionais?.map((adicional, indexAdicional) => {
        return {
          index: indexAdicional,
          nome: adicional.nome,
          quantidade: adicional.quantidade,
          valor: adicional.valor,
          atributos: adicional.atributos,
        }
      })

      return {
        index,
        nome: produto.nome,
        quantidade: produto.quantidade,
        valor: produto.valor,
        adicionais
      }
    })

    console.log({ loja: req.body.loja, cliente: req.body.cliente, entrega: req.body.entrega, produtos })

    const order = new Order({ loja: req.body.loja, cliente: req.body.cliente, entrega: req.body.entrega, produtos })
    await order.save()

    res.sendStatus(201)
  }

  async checkout(req, res) {
    const order = await Order.findOne({ loja: req.body.loja.toString(), cliente: req.body.cliente })
    let total = 0

    if (order) {
      total = order.entrega
      order.produtos.forEach(produto => {
        total += produto.quantidade * produto.valor

        produto.adicionais?.forEach(adicional => {
          total += (adicional.quantidade * adicional.valor) + (adicional.atributos.quantidade * adicional.atributos.valor)
        })
      })

      order.total = total
      order.archived = true
      await order.save()
    }

    res.status(201).send(order)
  }
}
