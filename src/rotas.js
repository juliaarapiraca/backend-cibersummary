const express = require('express');
const { listarTermos, adicionarTermo, excluirTermo, editarTermo } = require('./controladores/glossario');

const rotas = express.Router();

rotas.get('/glossario', listarTermos);
rotas.post('/novotermo', adicionarTermo);
rotas.put('/editartermo/:id', editarTermo);
rotas.delete('/excluirtermo/:id', excluirTermo);

module.exports = rotas;