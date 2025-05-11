document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get("id");

  const detalheContainer = document.getElementById("produto-detalhe");

  if (!produtoId) {
      detalheContainer.innerHTML = "<p>Produto não especificado.</p>";
      return;
  }

  fetch(`http://localhost:3000/produtos/${produtoId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Produto não encontrado");
          }
          return response.json();
      })
      .then(produto => {
          detalheContainer.innerHTML = `
              <div class="produto-detalhe-card">
                  <img src="${produto.imagem}" alt="${produto.nome}">
                  <h2>${produto.nome}</h2>
                  <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                  <p><strong>Descrição:</strong> ${produto.descricao}</p>
              </div>
          `;
      })
      .catch(error => {
          console.error("Erro ao buscar produto:", error);
          detalheContainer.innerHTML = "<p>Produto não encontrado.</p>";
      });
});
