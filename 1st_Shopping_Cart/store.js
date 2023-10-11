if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartITemBtn = document.getElementsByClassName('btn-danger');

    for (var i = 0; i < removeCartITemBtn.length; i++) {
        var button = removeCartITemBtn[i];

        button.addEventListener('click', (e) => {
            removeCartItem(e);
        })
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }

    var addToCartBtns = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartBtns.length; i++) {
        var button = addToCartBtns[i];
        button.addEventListener('click', addToCartClicked)
    }

}


function removeCartItem(e){
    var btnClicked = e.target;
    btnClicked.parentElement.parentElement.remove();
    updateCartTotal()
}


function updateCartTotal() {
    var cartItemContainer = document.querySelector('.cart-items');
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.querySelector('.cart-price')
        var quantityElement = cartRow.querySelector('.cart-quantity-input')

        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = parseFloat(quantityElement.value);

        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100;
    document.querySelector('.cart-total-price').innerText = '$' + total;
}

function quantityChanged(e) {
    var input = e.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}

function addToCartClicked(e) {
    var button = e.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.querySelector('.shop-item-title').innerText;
    var price = shopItem.querySelector('.shop-item-price').innerText;
    var imgSrc = shopItem.querySelector('.shop-item-image').src;
    
    addItemToCart(title, price, imgSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div'); 
    cartRow.className = 'cart-row';
    var cartItems = document.querySelector('.cart-items');

    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('items exists in the cart')
            return;
        }
    }
    var cartRowContent = `
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
    `
    
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
}