const { loadRoutes } = require('./csv_handler');
const { buildGraph, findCheapestPath } = require('./dijkstra');

const readline = require('readline');

const routes = loadRoutes();
const graph = buildGraph(routes);

console.log('Grafo construído:', graph);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askRoute() {
  rl.question('Digite uma rota no formato "DE-PARA" ou "sair" para encerrar:\n', (input) => {
    if (input.toLowerCase() === 'sair') {
      rl.close();
      return;
    }

    const [start, end] = input.split('-');
    if (!start || !end) {
      console.log('Formato inválido. Tente novamente.');
      return askRoute();
    }

    const { path, cost } = findCheapestPath(graph, start.trim(), end.trim());

    if (path.length === 0) {
      console.log('Rota não encontrada.');
    } else {
      console.log(`Melhor Rota: ${path.join(' - ')} ao custo de $${cost}`);
    }

    askRoute();
  });
}

askRoute();
