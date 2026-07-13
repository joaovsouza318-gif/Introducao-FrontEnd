// index.js

document.addEventListener('DOMContentLoaded', () => {
    renderizarJogosCadastrados();
    configurarBotoesAdicionar();
});

// Renderiza na tela os jogos que foram cadastrados pelo formulário
function renderizarJogosCadastrados() {
    const containerCards = document.getElementById('cards');
    const jogosCadastrados = JSON.parse(localStorage.getItem('jogosCadastrados')) || [];

    // Para cada jogo cadastrado no localStorage, cria um novo Card no index.html
    jogosCadastrados.forEach(jogo => {
        const cardHTML = `
            <div class="card">
                <img src="${jogo.imagemSrc}" alt="${jogo.titulo}" class="img-card">
                <h2 class="title-card"> ${jogo.titulo} </h2>
                <h3 class="value-card">R$ ${jogo.preco.toFixed(2).replace('.', ',')}</h3>
                <button class="btn-card">Adicionar ao Carrinho</button>
            </div>
        `;
        containerCards.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function configurarBotoesAdicionar() {
    const containerCards = document.getElementById('cards');

    containerCards.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-card')) {
            const card = e.target.closest('.card');
            const titulo = card.querySelector('.title-card').textContent.trim();
            const precoTexto = card.querySelector('.value-card').textContent.trim();
            const imagemSrc = card.querySelector('.img-card').getAttribute('src');
            
            const preco = parseFloat(precoTexto.replace('R$', '').replace('.', '').replace(',', '.').trim());

            const produto = {
                titulo,
                preco,
                imagemSrc,
                quantidade: 1
            };

            adicionarAoCarrinho(produto);
        }
    });
}

function adicionarAoCarrinho(novoProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const itemExistente = carrinho.find(item => item.titulo === novoProduto.titulo);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push(novoProduto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${novoProduto.titulo} foi adicionado ao seu carrinho!`);
}