const express = require('express')
const mysql = require('mysql')
const db = require('../Config/db.configs')

const connection = mysql.createConnection(db.database)

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS items (code VARCHAR(25) PRIMARY KEY, name VARCHAR(25), discription Varchar(25), price double, qtyOnHand int(10))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.warningCount === 0){
                console.log('Item is table created');
            }
        })
    }
})

const router = express.Router()

router.post('/',(req, res) =>{
    const code = req.body.code
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const qtyOnHand = req.body.qtyOnHand

    var query = "INSERT INTO items (code, name, description, price, qtyOnHand) VALUES (?,?,?,?,?)"

    connection.query(query, [code, name, description, price, qtyOnHand], (err) =>{
        if(err){
            res.send({"message" : "Duplicate entry"})
        }else{
            res.send({"message" : "Item successfully added!"})
        }
    })
})


router.get('/',(req, res) =>{
    var query = "SELECT * FROM items"

    connection.query(query,(err,rows) =>{
        if(err) throw err

        res.send(rows)
    })
})



router.put('/',(req, res) =>{
    const code = req.body.code
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const qtyOnHand = req.body.qtyOnHand

    var query = "UPDATE items SET name=?, description=?, price=?, qtyOnHand=? WHERE code=?"

    connection.query(query, [name, description, price, qtyOnHand, code], (err,rows) =>{
        if(err) console.log(err);

        if(rows.affectedRows > 0){
            res.send({'message' : 'Item Updated'})
        }else{
            res.send({'message' : 'No such a Item'})
        }
    })
})

router.delete('/:code', (req, res) => {
    const code = req.params.code

    var query = "DELETE FROM items WHERE code=?";

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'Item deleted' })
        } else {
            res.send({ 'message': 'No such a Item' })
        }
    })
})

router.get('/:code', (req, res) => {
    const code = req.params.code

    var query = "SELECT * FROM items WHERE code=?"

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        res.send(rows)
    })
})

module.exports = router