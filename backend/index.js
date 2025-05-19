const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota GET para todos os produtos
app.get('/produtos', (req, res) => {
  const data = fs.readFileSync('./data/produtos.json');
  const produtos = JSON.parse(data);
  res.json(produtos);
});

// Rota GET para um produto por ID
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = fs.readFileSync('./data/produtos.json');
  const produtos = JSON.parse(data);
  const produto = produtos.find(p => p.id === id);

  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
});

// Rota POST para adicionar novo produto
app.post('/produtos', (req, res) => {
  const novoProduto = req.body;

  fs.readFile('./data/produtos.json', 'utf8', (err, data) => {
    const produtos = data ? JSON.parse(data) : [];

    produtos.push(novoProduto);

    fs.writeFile('./data/produtos.json', JSON.stringify(produtos, null, 2), err => {
      if (err) return res.status(500).json({ erro: 'Erro ao salvar' });

      res.status(201).json({ mensagem: 'Produto salvo com sucesso!' });
    });
  });
});

// Rota DELETE para remover produto por ID
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile('./data/produtos.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });

    let produtos = JSON.parse(data);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    produtos.splice(index, 1);

    fs.writeFile('./data/produtos.json', JSON.stringify(produtos, null, 2), err => {
      if (err) return res.status(500).json({ erro: 'Erro ao salvar alterações' });

      res.json({ mensagem: 'Produto excluído com sucesso' });
    });
  });
});

// Rota PUT para atualizar produto por ID
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dadosAtualizados = req.body;

  fs.readFile('./data/produtos.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler o arquivo' });

    let produtos = JSON.parse(data);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    produtos[index] = { id, ...dadosAtualizados };

    fs.writeFile('./data/produtos.json', JSON.stringify(produtos, null, 2), err => {
      if (err) return res.status(500).json({ erro: 'Erro ao salvar alterações' });

      res.json({ mensagem: 'Produto atualizado com sucesso' });
    });
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
