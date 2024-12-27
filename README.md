# Rota de Viagem

Este projeto foi desenvolvido para encontrar a rota de viagem mais barata entre dois pontos, considerando todas as conexões possíveis. Ele utiliza um algoritmo de Dijkstra para determinar o menor custo e permite a interação via terminal, API REST e uma interface gráfica simples.

---

## 🚀 Funcionalidades

1. **Consulta de Melhor Rota**
   - Permite consultar a melhor rota entre dois pontos, considerando o menor custo.
   - Disponível via terminal, API REST e interface gráfica.

2. **Adição de Novas Rotas**
   - Adicione novas rotas ao sistema usando a API REST.

3. **Interface de Usuário**
   - Consulte rotas existentes e os menores caminhos diretamente em uma página web.

4. **Persistência com CSV**
   - As rotas são armazenadas em um arquivo CSV para facilidade de manutenção.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de execução.
- **Express.js**: Criação de rotas RESTful.
- **HTML/CSS/JavaScript**: Construção da interface gráfica.
- **CSV**: Persistência de dados.
- **Jest**: Testes unitários.
- **Algoritmo de Dijkstra**: Para calcular o menor caminho entre os pontos.

---

## 📂 Estrutura do Projeto

```plaintext
rotas_viagem/
├── src/
│   ├── app.js              # Configuração e inicialização do servidor
│   ├── console.js          # Interface de terminal para consulta
│   ├── routes.js           # Rotas da API REST
│   ├── csv_handler.js      # Manipulação do arquivo CSV
│   ├── dijkstra.js         # Algoritmo de menor caminho
│   ├── public/             # Arquivos da interface gráfica
│   │   ├── index.html      # Página principal da interface gráfica
├── tests/                  # Testes unitários
│   ├── csv_handler.test.js # Testes do manipulador de CSV
│   ├── dijkstra.test.js    # Testes do algoritmo de Dijkstra
├── rotas.csv               # Arquivo com as rotas armazenadas
├── package.json            # Configuração do Node.js
├── README.md               # Documentação do projeto
└── postman/
    └── Rotas_Viagem.postman_collection.json # Coleção do Postman
```
---
##🔧 Configuração e Execução
- Pré-requisitos
- Certifique-se de que as seguintes ferramentas estão instaladas:

###Node.js
- npm
- Passo a Passo
- Clone o Repositório

```plaintext
git clone https://github.com/seu-usuario/rotas-viagem.git
cd rotas-viagem
```
- Instale as Dependências
```plaintext
npm install
```

- Inicie o Servidor
```plaintext
npm start
```
- O servidor será executado em http://localhost:3000.

- Execute o Console
```plaintext
node src/console.js
```
- Digite as rotas no formato ORIGEM-DESTINO para consultar.

### Acesse a Interface Gráfica

- Abra o navegador e vá para http://localhost:3000.

---

## 📊 Testes
- Os testes foram implementados com o framework Jest.
- Executando os Testes
```plaintext
npm test
```
---

## 📄 API REST
- Endpoints Disponíveis
- Consultar Melhor Rota
- GET /best-route
- Parâmetros Query:
- from: Origem (Ex.: GRU)
- to: Destino (Ex.: CDG)
- Exemplo de Requisição:
```plaintext
GET http://localhost:3000/best-route?from=GRU&to=CDG
```
Exemplo de Resposta:
```
{
  "route": "GRU - BRC - SCL - ORL - CDG",
  "cost": 40
}
```
- Adicionar Nova Rota
- POST /add-route
- Body (JSON):
```plaintext

{
  "origin": "TES",
  "destination": "DES",
  "cost": 5
}
```
- Exemplo de Resposta:
```plaintext
{
  "message": "Rota adicionada com sucesso!"
}
```
---

## 🧩 Interface Gráfica
- Recursos
- Consulta de melhor rota.
- Exibição das rotas existentes.
- Acessando
- Abra o navegador e acesse http://localhost:3000.
