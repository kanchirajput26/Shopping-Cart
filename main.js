let totalValue = 0
let deductBtn = document.getElementsByClassName('decrease');
let addBtn = document.getElementsByClassName('increase');
let totalItems = document.querySelector('.cart-t');

function decrease(e){
    totalItems.innerText = parseInt(totalItems.innerText) - 1
    if (parseInt(totalItems.innerText) === 0){
        let cartText = document.querySelector('.cart-text')
        cartText.style.display = 'block'
        let cartList = document.querySelector('.list')
        cartList.className = 'list d-flex align-items-center justify-content-center'
    }
    let currCardElement = e.target.parentElement; 
        let price = Number(currCardElement.querySelector('.price').innerText.slice(1,))
        let qty = Number(currCardElement.querySelector('.qty').innerText)
    
        const itemOne = price/qty;
        totalValue -= itemOne
        qty--;
        price = itemOne*qty;

        let priceStr = `₹ ${price}`;
        currCardElement.querySelector('.price').innerText = priceStr;
        currCardElement.querySelector('.qty').innerText = qty;
        document.querySelector('.totalval').innerText = `TOTAL CART VALUE : ₹${totalValue}`;
        
        if(qty === 0){
            removeElements(e)
        }                   
}

function removeElements(e){
        currElement = e.target.parentElement.parentElement
        currId = currElement.id 
        currElement.parentElement.remove()
        let mainElement = document.querySelector('#' + currId)
        const added = mainElement.querySelector('.added')
        const add1 = mainElement.querySelector('.add-cart')
        added.classList.add('d-none')
        add1.classList.remove('d-none')
}


function increase(e){
    totalItems.innerText = parseInt(totalItems.innerText) + 1
    let currCardElement = e.target.parentElement; 
    let price = Number(currCardElement.querySelector('.price').innerText.slice(1,))
    let qty = Number(currCardElement.querySelector('.qty').innerText)
    
 
    if(qty === 10){
        alert('Maximum purchase limit is over!');
        return;
    }

    const itemOne = price/qty;
    totalValue += itemOne
    qty++;
    price = itemOne*qty;


   
    let priceStr = `₹${price}`;
    currCardElement.querySelector('.price').innerText = priceStr;
    currCardElement.querySelector('.qty').innerText = qty;
    document.querySelector('.totalval').innerText = `TOTAL CART VALUE : ₹${totalValue}`;
    

}

function addToCart(event){
    totalItems.innerText = parseInt(totalItems.innerText) + 1
    if (parseInt(totalItems.innerText)){
        let cartText = document.querySelector('.cart-text')
        cartText.style.display = 'none'
        let cartList = document.querySelector('.list')
        cartList.className = cartList.classList[0]
    }  
    let addedDisplay = event.target.parentElement
    const added = addedDisplay.querySelector('.added')
    const add1 = event.target
    
    added.classList.remove('d-none');
    add1.classList.add('d-none');
    const itemName = event.target.parentElement.querySelector('.card-title').innerText
    const itemCost = event.target.parentElement.querySelector('.cost').innerText
    const itemId = event.target.parentElement.parentElement.id
    const cart = document.querySelector('.cart')

    totalValue += parseInt(itemCost.slice(1,itemCost.length))
    let item = document.createElement('li')
    item.className = 'list-group-item py-0'
    item.innerHTML = `<div class="card" id="${itemId}">
                        <div class="card-body">
                            <h5 class="card-title">${itemName}</h5>
                            <h6 class="card-subtitle mb-2 text-muted price">${itemCost}</h6>
                            <p class="card-text">QTY:<span class="qty">1</span></p>
                            <button type="button" class="btn btn-light decrease">-</button>
                            <button type="button" class="btn btn-dark increase">+</button>
                        </div>
                    </div>
    `
    item.getElementsByClassName('decrease')[0].addEventListener('click',decrease);
    item.getElementsByClassName('increase')[0].addEventListener('click',increase);
    document.querySelector('.totalval').innerText = `TOTAL CART VALUE : ₹${totalValue}`;
    cart.appendChild(item)
}

let addToCartBtn = document.querySelectorAll('.add-cart')
addToCartBtn.forEach(each =>{
    each.addEventListener('click', addToCart)

} )