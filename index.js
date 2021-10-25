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
                  <a data-tooltip="Add to cart" tabindex="0" onclick="set_cart(${item.id},'${item.name}','${item.image}','${item.price}','${item.discount}',1)"> <span class="icon_cart_alt">add to cart</span></a>
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
  get_cart();
}
function render_Cart() {
  document.body.innerHTML=`<section>
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
                                  <input type="text" class="cart-input" placeholder="Promo Code">
                                </div>
                                <div class="col col-2">
                                  <span>Total cost</span>
                                  <span class="total-cost">$159,98</span>
                                </div>
                                <div class="col col-2">
                                  <button class="btn btn-warning text-uppercase">Checkout</button>
                                </div>
                              </div>
                            </div>
                          </section>`;
  get_cart();
}
function get_cart(){
  const $cartList = document.querySelector('.cart-list');
  let cart_cur = localStorage.getItem('cart') ?? [];
  if (cart_cur.length === 0) return;

  cart_cur = JSON.parse(cart_cur);
  const cartList=cart_cur.map(item => {
    return `
        <li class="row cart-item">
          <div class="col col-4 cell justify-conent-left" >
            <img src="${item.image}" alt="T-Shirt Summer Vibes">
            <p class="cart-item-name">${item.name}</p>
          </div>
          <div class="col col-2 cell">
            <p>White</p>
          </div>
          <div class="col col-1 cell">
            <p>XL</h4>
          </div>
          <div class="col col-2 cell ammount">
            <button class="decrease" onclick="decrease(${item.id})">-</button>
            <input type="text" class="cart-input" id="count${item.id}" value="${item.count}">
            <button class="increase" onclick="increase(${item.id})">+</button>
          </div>
          <div class="col col-2 cell">
            <h4 class="price">${(item.price - item.price * item.discount / 100).toFixed(2)}</h4>
          </div>
          <div class="col col-1 cell">
            <button class="btn-remove" onclick="remove_cart(${item.id})">X</button>
          </div>
        </li>
    `;
  });
  $cartList.innerHTML=cartList.join('');
}
function remove_cart(id) {
  let cart_cur = localStorage.getItem('cart') ?? [];
  if (cart_cur.length === 0) return;

  cart_cur = JSON.parse(cart_cur);
  cart_cur = cart_cur.filter(item => item.id !== id);

  localStorage.setItem('cart', JSON.stringify(cart_cur));
  get_cart();
}
function increase(id){
  let $count=document.getElementById("count"+id);
  let cart_cur = localStorage.getItem('cart') ?? [];
  
  if (cart_cur.length !== 0) cart_cur = JSON.parse(cart_cur);
  let test=cart_cur.findIndex(item=>item.id==id);
  cart_cur[test].count=cart_cur[test].count+1;
  console.log( cart_cur[test].count);
  $count.value=cart_cur[test].count;
  localStorage.setItem('cart', JSON.stringify(cart_cur));
}
function decrease(id){
  let $count=document.getElementById("count"+id);
  let cart_cur = localStorage.getItem('cart') ?? [];

  if (cart_cur.length !== 0) cart_cur = JSON.parse(cart_cur);
  let test=cart_cur.findIndex(item=>item.id==id);
  cart_cur[test].count=cart_cur[test].count-1;
  console.log( cart_cur[test].count);
  $count.value=cart_cur[test].count;
  localStorage.setItem('cart', JSON.stringify(cart_cur));
}