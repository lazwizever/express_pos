const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.config')

const connection = mysql.createConnection(db.database)

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS users (id VARCHAR(25) PRIMARY KEY, name VARCHAR(25), username Varchar(25))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            // console.log(result);
            if(result.warningCount === 0){
                console.log('User table created');
            }
        })
    }
})

const router = express.Router()

router.post('/',(req, res) =>{
    const id = req.body.id
    const name = req.body.name
    const username = req.body.username

    var query = "INSERT INTO users (id, name, username) VALUES (?,?,?)"

    connection.query(query, [id, name, username], (err) =>{
        if(err){
            res.send({"message" : "duplicate entry"})
        }else{
            res.send({"message" : "user table is created!"})
        }
    })
})



router.get('/',(req, res) =>{
    var query = "SELECT * FROM users"

    connection.query(query,(err,rows) =>{
        if(err) throw err

        res.send(rows)
    })
})



router.put('/',(req, res) =>{
    const id = req.body.id
    const name = req.body.name
    const username = req.body.username

    var query = "UPDATE users SET name =?, username=? WHERE id=?"

    connection.query(query, [name, username, id], (err,rows) =>{
        if(err) console.log(err);

        if(rows.affectedRows > 0){
            res.send({'message' : 'User Updated'})
        }else{
            res.send({'message' : 'No such a user'})
        }

    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    var query = "DELETE FROM users WHERE id=?";

    connection.query(query, [id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'user deleted' })
        } else {
            res.send({ 'message': 'No such a user' })
        }
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id

    var query = "SELECT * FROM users WHERE id=?"

    connection.query(query, [id], (err, rows) => {
        if (err) console.log(err);

        res.send(rows)
    })
})

module.exports = router;