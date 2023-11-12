let iconCard = document.querySelector('.icon-basket');
let closeCard = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCardHTML = document.querySelector('.listCard');

let listProducts = [];
let cards = [];

iconCard.addEventListener('click', () => {
    body.classList.toggle('showCard');
});

closeCard.addEventListener('click', () => {
    body.classList.toggle('showCard');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    listProducts.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
            <div class="image-container">
                <img class="product__image" src="${product.image}">
            </div>
            <h4 class="product__title">${product.name}</h4>
            
            <p>${product.title}</p>
            <div class="price">
                <div class="itemPrice p-0">
                    <span class="origPrice">$199</span><br>
                    <span class="newPrice">${product.price}</span>
                </div>
                <button class="addItem">Add to basket</button>
            </div>`;
        listProductHTML.appendChild(newProduct);
    });
};

listProductHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('addItem')) {
        let productId = event.target.closest('.item').dataset.id;
        addToCard(productId);
        alert("PRODUCT ADDED SUCCESSFULLY");
    }
});

listCardHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        let cardItem = event.target.closest('.items');
        let productId = cardItem.dataset.productId;
        removeFromCard(productId);
    }
});

const removeFromCard = (productId) => {
    cards = cards.filter(card => card.product_id !== productId);
    addCardToHTML();
    addToMemory();
};

const addToCard = (product_id) => {
    cards.push({
        product_id: product_id
    });
    addCardToHTML();
    addToMemory();
};

const addToMemory = () => {
    localStorage.setItem('card', JSON.stringify(cards));
};

const addCardToHTML = () => {
    listCardHTML.innerHTML = '';
    cards.forEach(card => {
        let newCard = document.createElement('div');
        newCard.classList.add('items');
        newCard.dataset.productId = card.product_id;
        let positionProduct = listProducts.findIndex(value => value.id == card.product_id);
        let info = listProducts[positionProduct];
        newCard.innerHTML = `
            <div class="image"><img src="${info.image}" alt=""></div>
            <div class="name">${info.name}</div>
            <div class="totalPrice">${info.price}</div>
            <div><i class="bi bi-x-circle remove"></i></div>`;
        listCardHTML.appendChild(newCard);
    });
};

const initApp = () => {
    fetch('../products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        if (localStorage.getItem('card')) {
            cards = JSON.parse(localStorage.getItem('card'));
            addCardToHTML();
        }
    });
};

initApp();
