const express = require('express');
const fs = require('fs');
const cors = require('cors');
const calcularCaminhoMaisBarato = require('./dijkstra');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/capitais', (req, res) => {
  const capitais = JSON.parse(fs.readFileSync('capitais.json', 'utf-8'));
  const nomes = capitais.map(obj => Object.keys(obj)[0]);
  res.json(nomes);
});

app.post('/rota', (req, res) => {
  const { origem, destino, precoCombustivel, autonomia } = req.body;
  try {
    const capitais = JSON.parse(fs.readFileSync('capitais.json', 'utf-8'));
    const resultado = calcularCaminhoMaisBarato(capitais, origem, destino, precoCombustivel, autonomia);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
