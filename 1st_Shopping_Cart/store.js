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
    document.querySelector('.cart-total-price').innerText = '$' + total;
}