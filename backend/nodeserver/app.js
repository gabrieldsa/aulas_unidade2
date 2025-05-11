const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Servidor Node.js rodando!');
});

// ROTA QUE VOCÊ PRECISA ADICIONAR:
app.get('/produtos', (req, res) => {
  const produtos = [
    { id: 1, nome: 'The Last of Us', preco: 199.90 },
    { id: 2, nome: 'God of War', preco: 249.90 },
    { id: 3, nome: 'Spider-Man', preco: 229.90 }
  ];
  res.json(produtos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
