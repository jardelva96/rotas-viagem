function buildGraph(routes) {
  const graph = {};

  routes.forEach(({ origin, destination, cost }) => {
    if (!graph[origin]) graph[origin] = [];
    graph[origin].push({ destination, cost });
  });

  console.log('Grafo construído:', graph);
  return graph;
}

function findCheapestPath(graph, start, end) {
  console.log('Grafo recebido para busca:', graph);

  if (!graph[start]) {
    console.log(`Nó de origem "${start}" não encontrado.`);
    return { path: [], cost: Infinity };
  }

  const costs = {};
  const parents = {};
  const visited = new Set();

  // Inicializar os custos e pais
  for (const node in graph) {
    costs[node] = Infinity;
    parents[node] = null;
  }
  costs[start] = 0;

  let currentNode = findLowestCostNode(costs, visited);

  while (currentNode) {
    const cost = costs[currentNode];
    const neighbors = graph[currentNode] || [];

    for (const neighbor of neighbors) {
      const newCost = cost + neighbor.cost;
      if (newCost < costs[neighbor.destination]) {
        costs[neighbor.destination] = newCost;
        parents[neighbor.destination] = currentNode;
      }
    }

    visited.add(currentNode);
    currentNode = findLowestCostNode(costs, visited);
  }

  // Reconstruir o caminho
  const path = [];
  let node = end;

  while (node) {
    path.unshift(node);
    node = parents[node];
  }

  if (path[0] !== start) {
    console.log('Caminho não encontrado.');
    return { path: [], cost: Infinity };
  }

  console.log('Caminho encontrado:', path, 'Custo:', costs[end]);
  return { path, cost: costs[end] };
}

function findLowestCostNode(costs, visited) {
  return Object.keys(costs).reduce((lowest, node) => {
    if ((lowest === null || costs[node] < costs[lowest]) && !visited.has(node)) {
      return node;
    }
    return lowest;
  }, null);
}

module.exports = { buildGraph, findCheapestPath };
