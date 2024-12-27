const express = require('express');
const path = require('path');
const routes = require('./routes');
const readline = require('readline');
const { buildGraph, findCheapestPath } = require('./dijkstra');
const { loadRoutes } = require('./csv_handler');

const app = express();
const PORT = 3000;

// Configurar o Express
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Servir a página da pasta 'public'

// Adicionar as rotas REST
app.use(routes);

// Rota para obter as rotas existentes
app.get('/existing-routes', (req, res) => {
  const routes = loadRoutes();
  res.json(routes);
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Digite uma rota no formato "DE-PARA" ou "sair" para encerrar:');
});

// Função para console interativo
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleConsoleInput = () => {
  rl.question('> ', (input) => {
    if (input.toLowerCase() === 'sair') {
      console.log('Encerrando a aplicação...');
      rl.close();
      process.exit(0);
    }

    const [from, to] = input.split('-');
    if (!from || !to) {
      console.log('Formato inválido! Use "DE-PARA".');
      return handleConsoleInput();
    }

    // Carregar rotas do CSV e buscar o melhor caminho
    const routes = loadRoutes();
    const graph = buildGraph(routes);
    console.log('Grafo construído:', graph);

    const { path, cost } = findCheapestPath(graph, from.trim(), to.trim());
    if (path.length === 0) {
      console.log('Rota não encontrada.');
    } else {
      console.log(`Melhor Rota: ${path.join(' - ')} ao custo de $${cost}`);
    }

    handleConsoleInput();
  });
};

// Iniciar o console interativo
handleConsoleInput();
