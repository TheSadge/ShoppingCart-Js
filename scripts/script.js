// console.log(products);

let productsContainer = document.querySelector('.pc-products');
let cartToggle = document.querySelector('.cart-header');

let totalCost = document.querySelector('.total-price');
let totalItem = document.querySelector('.total-item');

function showAllproducts () {
    for (let i = 0; i < products.length; i++) {

        productsContainer.innerHTML += `<div class="item1">
        <div class="img">
            <img src="` + products[i].imgSrc + `" alt="product-pic">
        </div>
        <div class="title">
           ` + products[i].name +`
        </div>
        <div class="price">
        ` + commafy(products[i].price) + " USD" +`
        </div>

        <div class="instock-number">
            ` + products[i].inStock + " left " + `
        </div>

        <div class="add-icon" onclick='addToCart(${products[i].id})'>
            <i class='bx bx-cart-add' style="font-size: 30px;" ></i>
        </div>
    </div>`
}
 }

showAllproducts();


// toggle cart header 

let toggler = false;
let arrowIcon = document.querySelector (' .arrow-key '); 


cartToggle.addEventListener('click', function() {
    
    let cartBody = document.querySelector('.cart-item');
    let cart = document.querySelector('.cart');

        if (toggler == false) {
            cartBody.style.display = 'none';
            cart.style.height =  '100px'
            arrowIcon.innerHTML = `<i class='bx bxs-up-arrow' ></i>`;
            
        }else {
           
            cartBody.style.display = 'block';
            cart.style.height =  '500px'
            arrowIcon.innerHTML = `<i class='bx bxs-down-arrow'></i>`;
          
        }

        toggler = !toggler
        // switch between true and false 

})



// cart array 
        let cartItems = [];




        function addToCart(id) {

            let itemId = cartItems.some(function(item) {
                        return item.id == id;   
            })

                if (itemId) { 
                        changeNumberOfUnits('plus', id)
                      }  

                 else {

            

            // p strands for products items
            let item = products.find( function(p){
                    return p.id == id;
            });
      
            item.numberOfUnits = 1;
            cartItems.push(item);
            // console.log(cartItems);
            renderCartItems ()
            renderTotal ()
         
    }}


    let cartAddedProducts = document.querySelector('.cart-item');


    function renderCartItems () {
        cartAddedProducts.innerHTML = " ";

        for (let i = 0; i < cartItems.length; i++) {
            console.log(cartItems[i].name);
            cartAddedProducts.innerHTML += `<li class="product">
            <div class="p-name" onclick="deleteFromCart(${cartItems[i].id})">`+cartItems[i].name+`</div>
            <div class="p-price">`+commafy(cartItems[i].price)+`</div>
            <span class="add-more" onclick="changeNumberOfUnits('plus', `+cartItems[i].id+`)">
                <i class='bx bxs-message-square-add' style="color: green;"></i>
            </span>
            <span class="unit">`+cartItems[i].numberOfUnits+`</span>
            <span class="remove-product" onclick="changeNumberOfUnits('minus', `+cartItems[i].id+`)">
                <i class='bx bxs-message-square-minus' style="color: brown;" ></i>
            </span>
        </li>`
        }
    }

    // chnage number of units 

    function changeNumberOfUnits (action, id) {

        cartItems = cartItems.map(function(item){

            let oldNumberOfUnits = item.numberOfUnits;
            
                if ( item.id == id) {
                    if(action == 'plus' && oldNumberOfUnits < item.inStock) {
                        oldNumberOfUnits++;
                    }
                        else if (action == 'minus' && oldNumberOfUnits > 1) {
                        oldNumberOfUnits--;
                    }

                }

                item.numberOfUnits = oldNumberOfUnits;
                return item;
        });
        // console.log(cartItems);
        renderCartItems ();
        renderTotal ();
    }           


    //  render total recpite

    function renderTotal () {

        let totalPrice = 0;
        let totalItems = 0; 

        for (let i = 0; i < cartItems.length; i++) {
                totalItems += cartItems[i].numberOfUnits;
                totalPrice += commafy(cartItems[i].price) * cartItems[i].numberOfUnits;
        }

        totalItem.innerHTML = "Total Product :" + totalItems;
        totalCost.innerHTML = "Total Cost : " + totalPrice;
    };

    function deleteFromCart (id) {
        cartItems = cartItems.filter(function (item) {
                return item.id != id;   
        });
       renderCartItems();
        renderTotal();
    }


    // to divide 1000

    function commafy (num) {

        let str = num.toString().split(".");
            if (str[0].lenght >= 5) {
                srt[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1, ');
            
            }

            if (str[1] && str[1].lenght >= 5 ) {
                str[1] = str[1].replace(/(\d{3})/g, '1$ ');
            }

            return str.join('.');
    }



    // done