const express = require('express')
const mysql = require('mysql')
const db = require('../Config/db.configs')

const connection = mysql.createConnection(db.database)

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orderDetail (orderId VARCHAR(25) PRIMARY KEY, itemCode VARCHAR(25), orderQty int(10), price double)"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.warningCount === 0){
                console.log('Order Detail table created');
            }
        })
    }
})

const router = express.Router()

router.post('/',(req, res) =>{
    const orderId = req.body.orderId
    const itemCode = req.body.itemCode
    const orderQty = req.body.orderQty
    const price = req.body.price

    var query = "INSERT INTO orderDetail (orderId, itemCode, orderQty, price) VALUES (?,?,?)"

    connection.query(query, [orderId, itemCode, orderQty, price], (err) =>{
        if(err){
            res.send({"message" : "Duplicate entry"})
        }else{
            res.send({"message" : "Order Detail successfully added!"})
        }
    })
})




router.get('/',(req, res) =>{
    var query = "SELECT * FROM orderDetail"

    connection.query(query,(err,rows) =>{
        if(err) throw err

        res.send(rows)
    })
})



router.put('/',(req, res) =>{
    const orderId = req.body.orderId
    const itemCode = req.body.itemCode
    const orderQty = req.body.orderQty
    const price = req.body.price

    var query = "UPDATE orderDetail SET itemCode=?, orderQty=?, price=? WHERE orderId=?"

    connection.query(query, [itemCode, orderQty, price, orderId], (err,rows) =>{
        if(err) console.log(err);

        if(rows.affectedRows > 0){
            res.send({'message' : 'Order Detail Updated'})
        }else{
            res.send({'message' : 'No such a OrderDetail'})
        }
    })
})

router.delete('/:orderId', (req, res) => {
    const orderId = req.params.orderId

    var query = "DELETE FROM orderDetail WHERE orderId=?";

    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'Order Detail deleted' })
        } else {
            res.send({ 'message': 'No such a OrderDetail' })
        }
    })
})

//get order by id
router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId

    var query = "SELECT * FROM orderDetail WHERE orderId=?"

    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);

        res.send(rows)
    })
})

module.exports = router