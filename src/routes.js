const express = require('express');
const { loadRoutes, saveRoute } = require('./csv_handler');
const { buildGraph, findCheapestPath } = require('./dijkstra');

const router = express.Router();

// Endpoint para encontrar a melhor rota
router.get('/best-route', (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Os parâmetros "from" e "to" são obrigatórios.' });
  }

  const routes = loadRoutes();
  const graph = buildGraph(routes);
  const { path, cost } = findCheapestPath(graph, from, to);

  if (path.length === 0) {
    return res.status(404).json({ error: 'Rota não encontrada.' });
  }

  res.json({ route: path.join(' - '), cost });
});

// Endpoint para adicionar uma nova rota
router.post('/add-route', (req, res) => {
  const { origin, destination, cost } = req.body;

  if (!origin || !destination || !cost) {
    return res.status(400).json({ error: 'Os campos "origin", "destination" e "cost" são obrigatórios.' });
  }

  saveRoute(origin, destination, parseInt(cost, 10));
  res.status(201).json({ message: 'Rota adicionada com sucesso!' });
});

module.exports = router;
