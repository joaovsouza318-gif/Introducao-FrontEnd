// carrinho.js

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();
});

// Renderiza os itens na tela puxando do localStorage
function renderizarCarrinho() {
    const containerCarrinho = document.getElementById('itens-carrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Mantém o título "Seu Carrinho" e limpa o resto do HTML estático anterior
    containerCarrinho.innerHTML = '<h2>Seu Carrinho</h2>';

    if (carrinho.length === 0) {
        containerCarrinho.innerHTML += '<p style="padding: 20px; font-style: italic;">Seu carrinho está vazio.</p>';
        atualizarResumo(0, 0);
        return;
    }

    carrinho.forEach((produto, index) => {
        const itemHTML = `
            <div class="item-carrinho-horizontal" data-index="${index}">
                <img src="${produto.imagemSrc}" alt="${produto.titulo}" class="img-pequena-carrinho">
                
                <div class="info-carrinho-horizontal">
                    <h2 class="title-card">${produto.titulo}</h2>
                    <h3 class="value-card">R$ ${produto.preco.toFixed(2).replace('.', ',')}</h3>
                    
                    <div class="quantidade-container">
                        <button class="btn-qtd" onclick="alterarQuantidade(${index}, -1)">-</button>
                        <input type="number" value="${produto.quantidade}" min="1" class="input-qtd" readonly>
                        <button class="btn-qtd" onclick="alterarQuantidade(${index}, 1)">+</button>
                    </div>
                </div>
                
                <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
            </div>
        `;
        containerCarrinho.innerHTML += itemHTML;
    });

    calcularTotais(carrinho);
}

// Altera a quantidade de um item (+ ou -)
window.alterarQuantidade = function(index, alteracao) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho[index]) {
        carrinho[index].quantidade += alteracao;

        // Se a quantidade for menor que 1, remove o item ou mantém em 1 (aqui optamos por manter em 1)
        if (carrinho[index].quantidade < 1) {
            carrinho[index].quantidade = 1;
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
    }
};

// Remove um item completamente do carrinho
window.removerItem = function(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    carrinho.splice(index, 1); // Remove o elemento do array pelo índice
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
};

// Realiza as contas matemáticas de subtotal, frete e total
function calcularTotais(carrinho) {
    let totalItens = 0;
    let subtotal = 0;

    carrinho.forEach(produto => {
        totalItens += produto.quantidade;
        subtotal += produto.preco * produto.quantidade;
    });

    // Definindo uma regra simples de frete de R$ 15,00 caso tenha itens, e grátis acima de R$ 300,00
    let frete = 0;
    if (subtotal > 0 && subtotal < 300) {
        frete = 15.00;
    }

    const totalFinal = subtotal + frete;

    atualizarResumo(totalItens, subtotal, frete, totalFinal);
}

// Atualiza o painel lateral de resumo do pedido
function atualizarResumo(totalItens, subtotal, frete = 0, totalFinal = 0) {
    const resumoContainer = document.getElementById('resumo-carrinho');
    
    if (resumoContainer) {
        resumoContainer.innerHTML = `
            <h2>Resumo do Pedido</h2>
            
            <div class="resumo-linha">
                <span>Digite seu CEP:</span>
                <input type="text" id="cep" name="cep" placeholder="00000-000">
            </div>

            <div class="resumo-linha">
                <span>Subtotal (${totalItens} ${totalItens === 1 ? 'item' : 'itens'}):</span>
                <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <div class="resumo-linha">
                <span>Frete:</span>
                <span>${frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}</span>
            </div>
            
            <hr class="divisor-resumo">
            
            <div class="resumo-linha total">
                <span>Total:</span>
                <span>R$ ${totalFinal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <button class="btn-pagamento" onclick="finalizarCompra()">Ir para o Pagamento</button>
        `;
    }
}

// Função simulando a finalização da compra
window.finalizarCompra = function() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    alert('Pedido processado com sucesso! Obrigado por comprar na The Goat Games.');
    localStorage.removeItem('carrinho'); // Limpa o carrinho
    window.location.href = '../index.html'; // Retorna para a Home
};