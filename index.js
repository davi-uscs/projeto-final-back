require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(express.json(), cors());

const banco = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    port: process.env.BD_PORT
});

app.route('/funcionarios').get((req, res) => {
    banco.query('SELECT * from funcionario', (err, result) => {
        if (err) {
           return res.status(500).send(err);
        }
        
        return res.status(200).send(result);
    });
}).post((req, res) => {
    const {nome, cpf, email, comissao} = req.body;

    banco.query('SELECT * FROM funcionario WHERE cpf = ?', [cpf], (err, result) => {
        if (result.length > 0) {
            return res.status(500).send({errno: true, mensagem: "Já existe um funcionário cadastrado com este CPF!"});
        }

        banco.query('SELECT * FROM funcionario WHERE email = ?', [email], (err, result) => {
            if (result.length > 0) {
                return res.status(500).send({errno: true, mensagem: "Já existe um funcionário cadastrado com este e-mail!"});
            }

            banco.query('INSERT INTO funcionario (nome, cpf, email, comissao) VALUES (?, ?, ?, ?)', [nome, cpf, email, comissao], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                    
                return res.status(200).send({mensagem: 'Funcionário adicionado com sucesso!'});
            });
        })
    })
}).put((req, res) => {
    const {idFuncionario, nome, cpf, email, comissao} = req.body;

    banco.query('SELECT * FROM funcionario WHERE idFuncionario != ? and cpf = ?', [idFuncionario, cpf], (err, result) => {
        if (result.length > 0) {
            return res.status(500).send({errno: true, mensagem: "Já existe um funcionário cadastrado com este CPF!"});
        }

        banco.query('SELECT * FROM funcionario WHERE idFuncionario != ? and email = ?', [idFuncionario, email], (err, result) => {
            if (result.length > 0) {
                return res.status(500).send({errno: true, mensagem: "Já existe um funcionário cadastrado com este e-mail!"});
            }

            banco.query('UPDATE funcionario SET nome = ?, cpf = ?, email = ?, comissao = ? WHERE idFuncionario = ?', [nome, cpf, email, comissao, idFuncionario], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                 }
                 
                 return res.status(200).send({mensagem: "Funcionário atualizado com sucesso!"});
            })
        })
    })
});

app.route('/funcionario/:idFuncionario').delete((req, res) => {
    const { idFuncionario } = req.params;

    banco.query('DELETE FROM funcionario WHERE idFuncionario = ?', [idFuncionario], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
            
        return res.status(200).send({mensagem: 'Funcionário deletado com sucesso!'});
    });
}).get((req, res) => {
    const { idFuncionario } = req.params;

    banco.query('SELECT * from funcionario WHERE idFuncionario = ?', [idFuncionario], (err, result) => {
        if (err) {
           return res.status(500).send(err);
        }
        
        return res.status(200).send(result[0]);
    });
});

app.listen(process.env.APP_PORT, () => {});