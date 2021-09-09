require('dotenv').config()

const CartsController = require('./controllers/CartsController')
const ItemsController = require('./controllers/ItemsController')
const connect = require('./database')

const cartsController = new CartsController()
const itemsController = new ItemsController()

connect()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))

app.post('/checkin', cartsController.checkin)
app.post('/checkout', cartsController.checkout)
app.post('/item', itemsController.create)
app.delete('/item', itemsController.delete)

const PORT = process.env.PORT || '5000'
app.set('port', PORT)
app.listen(PORT)
