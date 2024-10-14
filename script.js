const products = document.querySelectorAll('.product');
const cart = document.getElementById('cart');
const cartItemsContainer = document.querySelector('.cart-items');
const checkoutButton = document.getElementById('checkout');
let itemsInCart = 0;

products.forEach(product => {
    product.addEventListener('dragstart', dragStart);
    product.addEventListener('touchstart', touchStart);
});

// События для корзины
cart.addEventListener('dragover', dragOver);
cart.addEventListener('drop', drop);
cart.addEventListener('touchmove', touchMove);
cart.addEventListener('touchend', touchEnd);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.outerHTML); // Сохраняем HTML продукта
}

function touchStart(event) {
    const productHTML = event.target.outerHTML;
    event.dataTransfer = event.dataTransfer || {}; // Создаем объект dataTransfer для поддержки touch
    event.dataTransfer.setData('text/plain', productHTML);
}

function dragOver(event) {
    event.preventDefault(); // Позволяем сбросить элемент
}

function drop(event) {
    event.preventDefault();
    const productHTML = event.dataTransfer.getData('text/plain');
    addToCart(productHTML);
}

function touchMove(event) {
    event.preventDefault(); // Предотвращаем прокрутку
}

function touchEnd(event) {
    const productHTML = event.dataTransfer.getData('text/plain');
    addToCart(productHTML);
}

function addToCart(productHTML) {
    // Создаем новый элемент из HTML
    const newItem = document.createElement('div'); // Измените на 'div' вместо 'prod'
    newItem.innerHTML = productHTML;
    // Добавляем новый элемент в контейнер корзины
    cartItemsContainer.appendChild(newItem.firstChild);
    itemsInCart++;
    if (itemsInCart >= 3) {
        checkoutButton.classList.remove('hidden');
        animateButton(checkoutButton);
    }
}

function animateButton(button) {
    button.classList.add('animate');
    setInterval(() => {
        button.classList.toggle('highlight');
    }, 500);
}

// Обработчик клика для кнопки "Оплатить корзину"
checkoutButton.addEventListener('click', () => {
    window.location.href = 'https://lavka.yandex.ru/';
});
