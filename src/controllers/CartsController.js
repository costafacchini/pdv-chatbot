module.exports = class CartsController {

  async checkin(req, res) {
    console.log(req.body)

    res.status(201).send({ message: 'Checkin' })
  }

  async checkout(req, res) {
    console.log(req.body)

    res.status(201).send({ message: 'Checkout' })
  }
}
