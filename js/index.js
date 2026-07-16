// index.js
document.addEventListener('DOMContentLoaded', () => {
    carregarERenderizarJogos();
    configurarBotoesAdicionar();
});

async function carregarERenderizarJogos() {
    const containerCards = document.getElementById('cards');
    
    // 1. Busca os jogos do localStorage (cadastrados pelo form)
    const jogosCadastrados = JSON.parse(localStorage.getItem('jogosCadastrados')) || [];
    
    // 2. Busca os jogos padrão do arquivo jogos.json
    let jogosPadrao = [];
    try {
        const response = await fetch('data/jogos.json'); // caminho para onde você salvou o JSON
        jogosPadrao = await response.json();
    } catch (error) {
        console.error("Erro ao carregar jogos padrão:", error);
    }

    // 3. Junta as duas listas (exibindo os cadastrados primeiro)
    const todosOsJogos = [...jogosCadastrados, ...jogosPadrao];

    // 4. Renderiza na tela
    todosOsJogos.forEach(jogo => {
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

    console.log(itemExistente)

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push(novoProduto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${novoProduto.titulo} foi adicionado ao seu carrinho!`);
}

