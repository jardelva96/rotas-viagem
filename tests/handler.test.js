const { loadRoutes, saveRoute } = require('../src/csv_handler');
const fs = require('fs');
const path = require('path');

describe('CSV Handler', () => {
  const testFilePath = path.join(__dirname, '../rotas.csv');

  beforeEach(() => {
    // Restaura o conteúdo do arquivo CSV para os testes
    fs.writeFileSync(
      testFilePath,
      'origin,destination,cost\nGRU,BRC,10\nBRC,SCL,5\nGRU,CDG,75\nGRU,SCL,20\nGRU,ORL,56\nORL,CDG,5\nSCL,ORL,20\n'
    );
  });

  test('Deve carregar as rotas do arquivo CSV', () => {
    const routes = loadRoutes();
    expect(routes).toBeDefined();
    expect(routes.length).toBeGreaterThan(0);
    expect(routes[0]).toMatchObject({ origin: 'GRU', destination: 'BRC', cost: 10 });
  });

  test('Deve adicionar uma nova rota ao arquivo CSV', () => {
    saveRoute('TEST', 'DEST', 50);

    const routes = loadRoutes();
    const newRoute = routes.find(
      (route) => route.origin === 'TEST' && route.destination === 'DEST' && route.cost === 50
    );

    expect(newRoute).toBeDefined();
  });

  test('Deve evitar duplicatas no arquivo CSV', () => {
    saveRoute('TEST', 'DEST', 50);
    saveRoute('TEST', 'DEST', 50); // Adiciona novamente

    const routes = loadRoutes();
    const occurrences = routes.filter(
      (route) => route.origin === 'TEST' && route.destination === 'DEST' && route.cost === 50
    ).length;

    expect(occurrences).toBe(1); // Deve haver apenas uma entrada
  });
});
