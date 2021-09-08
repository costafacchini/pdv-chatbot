const CartsController = require('./controllers/CartsController')
const ItemsController = require('./controllers/ItemsController')

const cartsController = new CartsController()
const itemsController = new ItemsController()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))

app.get('/checkin', cartsController.checkin)
app.get('/checkout', cartsController.checkout)
app.post('/item', itemsController.create)
app.delete('/item', itemsController.delete)

app.use(function (req, res, next) {
  next(createError(404))
})

const PORT = process.env.PORT || '5000'
app.set('port', PORT)
app.listen(PORT)
