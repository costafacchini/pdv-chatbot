const Order = require('../models/Order')

module.exports = class CartsController {

  async checkin(req, res) {
    const produtos = req.body.produtos?.map((produto) => {
      const atributos = produto.atributos?.map((atributo) => {
        return {
          nome: atributo.nome,
          quantidade: atributo.quantidade,
          valor: atributo.valor,
          valores: atributo.valores,
        }
      })

      return {
        nome: produto.nome,
        quantidade: produto.quantidade,
        valor: produto.valor,
        atributos
      }
    })

    console.log({ loja: req.body.loja, cliente_id: req.body.cliente_id.toString(), entrega: req.body.entrega, produtos })

    const order = new Order({ loja: req.body.loja, cliente_id: req.body.cliente_id.toString(), entrega: req.body.entrega, produtos })
    await order.save()

    res.sendStatus(201)
  }

  async checkout(req, res) {
    const order = await Order.findOne({ loja: req.body.loja.toString(), cliente_id: req.body.cliente_id.toString(), archived: false })
    let total = 0

    if (order) {
      total = order.entrega
      order.produtos.forEach(produto => {
        total += produto.quantidade * produto.valor

        produto.atributos?.forEach(atributo => {
          total += (atributo.quantidade * atributo.valor) + (atributo.valores.quantidade * atributo.valores.valor)
        })
      })

      order.total = total
      order.archived = true
      await order.save()
    }

    res.status(201).send(order)
  }

  async summary(req, res) {
    const order = await Order.findOne({ loja: req.body.loja.toString(), cliente_id: req.body.cliente_id.toString(), archived: false })
    let total = 0

    if (order) {
      total = order.entrega
      order.produtos.forEach(produto => {
        total += produto.quantidade * produto.valor

        produto.atributos?.forEach(atributo => {
          total += (atributo.quantidade * atributo.valor) + (atributo.valores.quantidade * atributo.valores.valor)
        })
      })

      order.total = total
    }

    res.status(201).send(order)
  }
}
