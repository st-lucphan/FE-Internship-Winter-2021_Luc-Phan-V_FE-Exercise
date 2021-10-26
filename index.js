function Product(id, name, image, price, discount = 0, count = 0) {
  this.id = id;
  this.name = name;
  this.image = image;
  this.price = price;
  this.discount = discount;
  this.count = count;
}
let arr = [ new Product(1, "T-Shirt Summer Vibes", "images/image.png", 119.99, 50),
              new Product(2, "Loose Knit 3/4 Sleeve", "images/image-2.png", 119.99),
              new Product(3, "Basic Slim Fit T-Shirt", "images/image-3.png", 79.99),
              new Product(4, "Loose Textured T-Shirt", "images/image-4.png", 119.99)];
const $productList = document.querySelector('.card-list');
const products = arr.map(function (item) {
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
                  <button class="btn btn-warning" onclick="set_cart(${item.id},'${item.name}','${item.image}','${item.price}','${item.discount}',1)"> Add to cart</button>
                </div>
              </div>
            </li>`;
});
$productList.innerHTML = products.join('');
function set_cart(id, name,image, price, discount, count) {
  let cart_cur = localStorage.getItem('cart')?localStorage.getItem('cart'):[];
  if (cart_cur.length !== 0) cart_cur = JSON.parse(cart_cur);
  let test=cart_cur.findIndex(item=>item.id==id);
	if (test>-1) 
    {cart_cur[test].count=cart_cur[test].count+1} 
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
function render_Cart() {
  document.body.innerHTML=`
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
                                      <a href="#" class="option-link"><img src="images/cart_black.svg" alt="cart" onclick="render_Cart()"></a>
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
                            <div class="container">
                              <h3 class="cart-title">Shopping Cart</h3>
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
  const $totalPrice = document.querySelector(".total-cost");
  let cart_cur = localStorage.getItem('cart') ?? [];
  if (cart_cur.length === 0) return;
  cart_cur = JSON.parse(cart_cur);
  let total = calculateTotalPrice(cart_cur);
  $totalPrice.innerHTML=`$${total}`;                       
  get_cart();
}
//render cart-list
function get_cart(){
  const $cartList = document.querySelector('.cart-list');
  let cart_cur = localStorage.getItem('cart') ?? [];
  
  if (cart_cur.length === 0) return;
  cart_cur = JSON.parse(cart_cur);
  const List=cart_cur.map(item => {
    return `
        <li class="row cart-item">
          <div class="col col-4 cell justify-conent-left" >
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
            <button class="btn-remove text-bold" onclick="remove_cart(${item.id})">X</button>
          </div>
        </li>
    `;
  });
  $cartList.innerHTML=List.join('');
}
//Delete cart-item
function remove_cart(id) {
  let cart_cur = localStorage.getItem('cart') ?? [];
  let $totalPrice = document.querySelector(".total-cost");
  
  if (cart_cur.length === 0) return;
  cart_cur = JSON.parse(cart_cur);
  cart_cur = cart_cur.filter(item => item.id !== id);
  let total = calculateTotalPrice(cart_cur);
  $totalPrice.innerHTML=`$${total}`;
  localStorage.setItem('cart', JSON.stringify(cart_cur));
  get_cart();
}
// increase ammount of product
function increase(id){
  let $count=document.getElementById("count"+id);
  let cart_cur = localStorage.getItem('cart') ?? [];
  let $totalPrice = document.querySelector(".total-cost");
  
  if (cart_cur.length !== 0) cart_cur = JSON.parse(cart_cur);
  let test=cart_cur.findIndex(item=>item.id==id);
  cart_cur[test].count=cart_cur[test].count+1;
  console.log( cart_cur[test].count);
  $count.value=cart_cur[test].count;
  let total = calculateTotalPrice(cart_cur);
  $totalPrice.innerHTML=`$${total}`;
  localStorage.setItem('cart', JSON.stringify(cart_cur));
}
// decrease ammount of product
function decrease(id){
  let $count=document.getElementById("count"+id);
  let cart_cur = localStorage.getItem('cart') ?? [];
  let $totalPrice = document.querySelector(".total-cost");

  if (cart_cur.length !== 0) cart_cur = JSON.parse(cart_cur);
  let test=cart_cur.findIndex(item=>item.id==id);
  cart_cur[test].count=cart_cur[test].count-1;
  console.log( cart_cur[test].count);
  $count.value=cart_cur[test].count;
  let total = calculateTotalPrice(cart_cur);
  $totalPrice.innerHTML=`$${total}`;
  localStorage.setItem('cart', JSON.stringify(cart_cur));
}
// calcalate total price
function calculateTotalPrice(cart_cur){
  const total=cart_cur.reduce((total, item) => item.count*(item.price-item.price*item.discount/100) + total, 0);
  return total.toFixed(2);
}
