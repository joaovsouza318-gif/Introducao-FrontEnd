// cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-produto');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que a página recarregue ao enviar o formulário

        const titulo = document.getElementById('titulo').value.trim();
        const preco = parseFloat(document.getElementById('preco').value);
        const imagemSrc = document.getElementById('imagem').value.trim();

        // Cria o objeto do novo produto
        const novoJogo = {
            titulo,
            preco,
            imagemSrc
        };

        // Recupera os jogos já cadastrados pelo usuário ou cria uma lista vazia
        let jogosCadastrados = JSON.parse(localStorage.getItem('jogosCadastrados')) || [];

        // Adiciona o novo jogo à lista
        jogosCadastrados.push(novoJogo);

        // Salva a lista atualizada de volta no localStorage
        localStorage.setItem('jogosCadastrados', JSON.stringify(jogosCadastrados));

        alert('Jogo cadastrado com sucesso!');
        form.reset();

        // Redireciona de volta para a Home para ver o produto cadastrado
        window.location.href = 'index.html';
    });
});