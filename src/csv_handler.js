const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, '../rotas.csv');

// Carregar rotas do CSV
function loadRoutes() {
  if (!fs.existsSync(csvFilePath)) {
    fs.writeFileSync(csvFilePath, 'origin,destination,cost\n');
  }

  const data = fs.readFileSync(csvFilePath, 'utf8').trim();
  const lines = data.split('\n').slice(1); // Ignorar cabeçalho

  const routes = lines.map((line) => {
    const [origin, destination, cost] = line.split(',').map((val) => val.trim());
    return { origin, destination, cost: parseInt(cost, 10) };
  });

  console.log('Rotas carregadas:', routes);
  return routes;
}

// Salvar uma nova rota no CSV
function saveRoute(origin, destination, cost) {
  const routes = loadRoutes();

  const exists = routes.some(
    (route) => route.origin === origin && route.destination === destination && route.cost === cost
  );

  if (!exists) {
    fs.appendFileSync(csvFilePath, `${origin},${destination},${cost}\n`);
    console.log(`Rota adicionada: ${origin} -> ${destination}, custo: ${cost}`);
  } else {
    console.log(`Rota já existe: ${origin} -> ${destination}, custo: ${cost}`);
  }
}

module.exports = { loadRoutes, saveRoute };
