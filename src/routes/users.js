const express = require("express")
const router = express.Router()

const mysqlConnection = require("../database")

router.get("/", (req, res) => {
    mysqlConnection.query("SELECT * FROM USERS;", (err, rows, fields) => {
        if(!err) {
            res.json(rows)
        }else {
            console.log(err)
        }
    })
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    const query = "SELECT * FROM USERS WHERE ID = ?"

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows)
        }else {
            console.log(err)
        }
    })
})

router.get("/n/:name", (req, res) => {
    const {name} = req.params
    const query = "SELECT * FROM USERS WHERE NAME = ?"
    console.log(name)

    mysqlConnection.query(query, [name], (err, rows, fields) => {
        if(!err) {
            res.json(rows)
        }else {
            console.log(err)
        }
    })
})

/*router.get("/e", (req, res) => {
    const {email} = req.query.email
    const query = "SELECT * FROM USERS WHERE EMAIL = `?`"

    mysqlConnection.query(query, [email], (err, rows, fields) => {
        if(!err) {
            res.json(rows)
        }else {
            console.log(err)
        }
    })
})

router.get("/p", (req, res) => {
    const {priority} = req.query.priority
    const query = "SELECT * FROM USERS WHERE PRIORITY = `?`"

    mysqlConnection.query(query, [priority], (err, rows, fields) => {
        if(!err) {
            res.json(rows)
        }else {
            console.log(err)
        }
    })
})*/

router.post("/", (req, res) => {
    const {name, email, priority} = req.body
    const query = "CALL ADD_USERS(?, ?, ?);"

    mysqlConnection.query(query, [name, email, priority], (err, rows, fields) => {
        if(!err) {
            res.json({Status: "User Added"})
        }else {
            console.log(err)
        }
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {name, email, priority} = req.body
    const query = "CALL UPDATE_USERS(?, ?, ?, ?);"

    mysqlConnection.query(query, [id, name, email, priority], (err, rows, fields) => {
        if(!err) {
            res.json({Status: "User Updated"})
        }else {
            console.log(err)
        }
    })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params
    const query = "DELETE FROM USERS WHERE ID = ?;"

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err) {
            res.json({Status: "User Deleted"})
        }else {
            console.log(err)
        }
    })
})

module.exports = router