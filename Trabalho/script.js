// Dados simulados de produtos
const products = [
    { id: 1, name: 'Conjuntos', price: 329.80 },
    { id: 2, name: 'Shorts', price: 49.80 },
    { id: 3, name: 'Tênis', price: 150.00 },
    { id: 4, name: 'Boné', price: 79.90},
    { id: 5, name: 'Camisas', price: 120.49},
    { id: 6, name: 'Esportes', price: 80.90}
];

let cart = []; // Array para armazenar os itens do carrinho

// Função para redirecionar para a página de detalhes do produto
function redirectToProductPage(productId) {
    // Use window.location.href para redirecionar
    window.location.href = `detalhes-produto.html?id=${productId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    const toggleCartBtn = document.getElementById('toggle-cart-btn');
    const cartElement = document.getElementById('cart');

    // Funções internas que dependem dos elementos do DOM
    function renderProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>R$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Ver mais</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            renderCart();
        }
    }

    function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                ${item.name} - R$${item.price.toFixed(2)}
                <button class="remove-from-cart" data-id="${item.id}">Remover</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });
        totalPriceSpan.textContent = total.toFixed(2);
    }
    
    // Inicia a renderização dos produtos
    renderProducts();

    // Evento para mostrar/esconder o carrinho
    toggleCartBtn.addEventListener('click', () => {
        cartElement.classList.toggle('hidden');
    });

    // Evento para "Ver mais" (agora redireciona)
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            // Chama a nova função de redirecionamento
            redirectToProductPage(productId);
        }
    });

    // Evento para remover produtos
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(event.target.dataset.id);
            const itemIndex = cart.findIndex(item => item.id === productId);
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
                renderCart();
            }
        }
    });
});