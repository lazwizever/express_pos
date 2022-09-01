const express = require('express')


const customer = require('./Routes/customer')
const user = require ('./routes/user')
const item = require('./routes/item')
const order = require ('./routes/Order')
const orderDetail = require ('./routes/OrderDetails')

const app = express()
const port = 4000

app.use(express.json())
app.use('/customer', customer)
app.use('/orders',order)
app.use('/items',  item)
app.use('/orderDetail',orderDetail)
app.use('/users',user)


app.listen(port, () => {
    console.log(`app starting on ${port}`);
})