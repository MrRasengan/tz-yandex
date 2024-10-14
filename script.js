const products = document.querySelectorAll('.product');
const cart = document.getElementById('cart');
const cartItemsContainer = document.querySelector('.cart-items');
const checkoutButton = document.getElementById('checkout');
let itemsInCart = 0;

products.forEach(product => {
    product.addEventListener('dragstart', dragStart);
});

cart.addEventListener('dragover', dragOver);
cart.addEventListener('drop', drop);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.outerHTML); // Сохраняем HTML продукта
}

function dragOver(event) {
    event.preventDefault(); // Позволяем сбросить элемент
}

function drop(event) {
    event.preventDefault();
    const productHTML = event.dataTransfer.getData('text/plain');
    // Создаем новый элемент из HTML
    const newItem = document.createElement('prod');
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
