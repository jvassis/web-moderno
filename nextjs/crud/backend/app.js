const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('./mysql').pool

const app = express()
app.use(bodyParser.json())


app.get('/clientes', (req, res) => {
    mysql.query(
        'SELECT * FROM clientes',
        (err, result, fields) => {
            if(err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }
            res.status(200).send(result)
        }
    )
})

app.get('/clientes/:id', (req, res) => {
    mysql.query(
        'SELECT * FROM clientes WHERE id = ?', [req.params.id],
        (err, result) => {
            if(err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }
            res.status(200).send(result)
        }
    )
})

app.post('/clientes', (req, res) => {
    mysql.query(
        'INSERT INTO clientes (nome, idade) VALUES (?, ?)',
        [req.body.nome, req.body.idade],
        (err, result) => {
            if (err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }
            res.status(201).send({
                mensagem: 'cliente inserido com sucesso!',
                id: result.insertId
            })
        }
    )
})

app.put('/clientes/:id', (req, res) => {
    mysql.query(
        'UPDATE clientes SET nome = ?, idade = ? WHERE id = ?',
        [req.body.nome, req.body.idade, req.params.id],
        (err) => {
            if (err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }
            res.status(201).send({
                mensagem: 'cliente alterado com sucesso!'
            })
        }
    )
})

app.delete('/clientes/:id', (req, res) => {
    mysql.query(
        'DELETE FROM clientes WHERE id = ?', [req.params.id],
        (err) => {
            if (err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }
            res.status(200).send()
        }
    )
})

module.exports = app