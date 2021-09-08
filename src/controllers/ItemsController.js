module.exports = class ItemsController {

  async create(req, res) {
    console.log(req.body)

    res.status(201).send({ message: 'create item' })
  }

  async delete(req, res) {
    console.log(req.body)

    res.status(204).send({ message: 'delete item' })
  }
}
