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
    updateCartTotal()
}