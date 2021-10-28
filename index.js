function Product(id, name, image, price, discount = 0, count = 0) {
  this.id = id;
  this.name = name;
  this.image = image;
  this.price = price;
  this.discount = discount;
  this.count = count;
}
function fetchData() {
  const data = [ new Product(1, 'T-Shirt Summer Vibes', 'images/image.png', 119.99, 50),
              new Product(2, 'Loose Knit 3/4 Sleeve', 'images/image-2.png', 119.99),
              new Product(3, 'Basic Slim Fit T-Shirt', 'images/image-3.png', 79.99),
              new Product(4, 'Loose Textured T-Shirt', 'images/image-4.png', 119.99)];
  localStorage.setItem('data', JSON.stringify(data));
  return data;
}
function renderProduct(data) {
  const $productList = document.querySelector('.card-list');
  const products = data.map(function (item) {
    return `<li class="col col-3 col-sm-6">
                <div class="card">
                  <a href="#"><img src="${item.image}" alt="product" class="card-img"></a>
                  ${item.discount > 0 ? `<span class="badge card-discount">-${item.discount}%</span>` : ''}               
                  <div class="card-content">
                    <h4 class="card-title"><a href="#" class="card-title-link">${item.name}</a></h4>
                    <span class="card-price ${item.discount > 0 ? 'card-discount-price' : ''}">$${(item.price - (item.price * item.discount / 100)).toFixed(2)}</span>
                    ${item.discount > 0 ? `<span class="card-original-price">$${item.price}</span>` : ''}
                  </div>
                  <div class="card-hover-icons">
                    <button class="btn btn-warning" onclick="addToCart(${item.id},'${item.name}','${item.image}','${item.price}','${item.discount}',1)"> Add to cart</button>
                  </div>
                </div>
              </li>`;
  });
  $productList.innerHTML = products.join('');
}
function addToCart(id, name, image, price, discount, count) {
  let cart_cur = localStorage.getItem('cart') ? localStorage.getItem('cart') : [];
  if (cart_cur.length !== 0) cart_cur = JSON.parse(cart_cur);
  let test = cart_cur.findIndex(item => item.id == id);
  if (test > -1) {
    cart_cur[test].count = cart_cur[test].count+1 } 
  else{
    const product = {
      id:id,
      name: name,
      image:image,
      price: price,
      discount: discount,
      count: count
    }	
    cart_cur.push(product);
  };
  localStorage.setItem('cart', JSON.stringify(cart_cur));
}
//Render cart layout
function renderCart() {
  document.body.innerHTML = `
                            <header class="header cart-header">
                            <div class="container">
                              <div class="header-content header-desktop ">
                                <div class="logo">
                                  <a class="logo-link" href="#">
                                    <img src="images/logo_black.svg" alt="E-shop">
                                  </a>
                                </div>
                                <nav class="nav">
                                  <ul class="nav-list">
                                    <li class="nav-item">
                                      <a href="#" class="cart-nav-link text-black">Men</a>
                                    </li>
                                    <li class="nav-item">
                                      <a href="#" class="cart-nav-link">Women</a>
                                    </li>
                                    <li class="nav-item">
                                      <a href="#" class="cart-nav-link">Kids</a>
                                    </li>
                                  </ul>
                                </nav>
                                <div class="option">
                                  <ul class="option-list">
                                    <li class="option-item">
                                      <a href="#" class="option-link"><img src="images/search_black.svg" alt="search"></a>
                                    </li>
                                    <li class="option-item">
                                      <a href="#" class="option-link"><img src="images/cart_black.svg" alt="cart" onclick="renderCart()"></a>
                                    </li>
                                    <li class="option-item">
                                      <a href="#" class="option-link"><img src="images/avatar_black.svg" alt="avatar"></a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </header>
                          <section class="section section-cart">
                            <div class="container section-cart-header">
                              <h3 class="cart-title">Shopping Cart</h3>
                              <div class="status">
                                <img src="images/noun_cart_2102832.png" alt="E-shop" class="bg-warning">
                                <hr class="line">
                                <img src="images/delivery.svg" alt="Delivery">
                              </div>
                            </div>
                            <div class="container table">
                              <div class="row table-header">
                                <div class="col col-4">
                                  <h4>Product</h4>
                                </div>
                                <div class="col col-2">
                                  <h4 class="text-center">Color</h4>
                                </div>
                                <div class="col col-1">
                                  <h4 class="text-center">Size</h4>
                                </div>
                                <div class="col col-2">
                                  <h4 class="text-center">Ammount</h4>
                                </div>
                                <div class="col col-2">
                                  <h4 class="text-center">Price</h4>
                                </div>
                                <div class="col col-1">
                                </div>
                              </div>
                            </div>
                            <div class="container">
                              <ul class="cart-list">
                                
                              </ul>
                            </div>
                            <div class="container">
                              <div class="row checkout">
                                <div class="col col-4">
                                  <a href="index.html" class="back">
                                    <img src="images/back.svg" alt="go"  class="banner-action-img">
                                    Continue Shopping
                                  </a>
                                </div>
                                <div class="col col-4">
                                  <div class="promote-code">
                                    <input type="text" class="promote-input" placeholder="Promo Code">
                                    <img src="images/send.svg" class="send-img" alt="Send">
                                  </div>
                                </div>
                                <div class="col col-2">
                                  <span>Total cost</span>
                                  <span class="total-cost">$0,00</span>
                                </div>
                                <div class="col col-2">
                                  <button class="btn btn-warning text-uppercase">Checkout</button>
                                </div>
                              </div>
                            </div>
                          </section>`; 
  const $totalPrice = document.querySelector('.total-cost');
  let currentCart = localStorage.getItem('cart') ?? [];
  if (currentCart.length === 0) return;
  currentCart = JSON.parse(currentCart);
  let total = calculateTotalPrice(currentCart);
  $totalPrice.innerHTML = `$${total}`;                       
  getCart();
}
//render cart-list
function getCart(){
  const $cartList = document.querySelector('.cart-list');
  let currentCart = localStorage.getItem('cart') ?? [];
  if (currentCart.length === 0) return;
  currentCart = JSON.parse(currentCart);
  const List = currentCart.map(item => {
    return `
        <li class="row cart-item">
          <div class="col col-4 cell justify-content-left" >
            <img src="${item.image}" alt="T-Shirt Summer Vibes">
            <p class="cart-item-name">${item.name}</p>
          </div>
          <div class="col col-2 cell">
            <p class="text-bold">White</p>
          </div>
          <div class="col col-1 cell">
            <p class="text-bold">XL</h4>
          </div>
          <div class="col col-2 cell ammount">
            <button class="decrease" onclick="decrease(${item.id})">-</button>
            <input type="text" class="ammount-input" id="count${item.id}" value="${item.count}">
            <button class="increase text-bold" onclick="increase(${item.id})">+</button>
          </div>
          <div class="col col-2 cell">
            <h4 class="price">${(item.price - item.price * item.discount / 100).toFixed(2)}</h4>
          </div>
          <div class="col col-1 cell">
            <button class="btn-remove text-bold" onclick="removeCart(${item.id})">X</button>
          </div>
        </li>
    `;
  });
  $cartList.innerHTML = List.join('');
}
//Delete cart-item
function removeCart(id) {
  let currentCart = localStorage.getItem('cart') ?? [];
  let $totalPrice = document.querySelector('.total-cost');
  
  if (currentCart.length === 0) return;
  currentCart = JSON.parse(currentCart);
  currentCart = currentCart.filter(item => item.id !== id);
  let total = calculateTotalPrice(currentCart);
  $totalPrice.innerHTML = `$${total}`;
  localStorage.setItem('cart', JSON.stringify(currentCart));
  getCart();
}
// increase ammount of product
function increase(id){
  let $count=document.getElementById("count" + id);
  let currentCart = localStorage.getItem('cart') ?? [];
  let $totalPrice = document.querySelector(".total-cost");
  
  if (currentCart.length !== 0) currentCart = JSON.parse(currentCart);
  let test = currentCart.findIndex(item => item.id == id);
  currentCart[test].count = currentCart[test].count + 1;
  console.log(currentCart[test].count);
  $count.value = currentCart[test].count;
  let total = calculateTotalPrice(currentCart);
  $totalPrice.innerHTML = `$${total}`;
  localStorage.setItem('cart', JSON.stringify(currentCart));
}
// decrease ammount of product
function decrease(id){
  let $count = document.getElementById("count"+id);
  let currentCart = localStorage.getItem('cart') ?? [];
  let $totalPrice = document.querySelector(".total-cost");

  if (currentCart.length !== 0) currentCart = JSON.parse(currentCart);
  let itemId = currentCart.findIndex(item => item.id == id);
  currentCart[itemId].count = currentCart[itemId].count - 1;
  console.log( currentCart[itemId].count);
  $count.value = currentCart[itemId].count;
  let total = calculateTotalPrice(currentCart);
  $totalPrice.innerHTML = `$${total}`;
  localStorage.setItem('cart', JSON.stringify(currentCart));
}
// calcalate total price
function calculateTotalPrice(currentCart) {
  const total = currentCart.reduce((total, item) => item.count * (item.price-item.price * item.discount / 100) + total, 0);
  return total.toFixed(2);
}
const arr = fetchData();
renderProduct(arr);
