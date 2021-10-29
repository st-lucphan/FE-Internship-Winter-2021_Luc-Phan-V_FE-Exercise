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
                    <span class="card-price ${item.discount > 0 ? 'card-discount-price' : ''}">&dollar;${(item.price - (item.price * item.discount / 100)).toFixed(2)}</span>
                    ${item.discount > 0 ? `<span class="card-original-price">&dollar;${item.price}</span>` : ''}
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
  let currentCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  let itemId = currentCart.findIndex(item => item.id == id);
  if (itemId > -1) {
    currentCart[itemId].count = currentCart[itemId].count+1 } 
  else {
    const product = new Product(id, name, image, price, discount, count);	
    currentCart.push(product);
  };
  localStorage.setItem('cart', JSON.stringify(currentCart));
}

//Render cart layout
function renderCart() {
  const $cartLayout = document.querySelector('.cart-layout');
  const $homeLayout = document.querySelector('.home-layout');
  $homeLayout.style.display = 'none';
  $cartLayout.style.display = 'block';
  getCart();
}

//render cart-list
function getCart() {
  const $cartList = document.querySelector('.cart-list');
  const $totalPrice = document.querySelector('.total-cost');
  let currentCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  if (currentCart.length === 0 ) {
    const list = `<h3 class="text-center">Không có sản phẩm nào trong giỏ hàng!</h3>`;
    $cartList.innerHTML = list;
    return;
  }
  else {
    //currentCart = JSON.parse(currentCart);
    const list = currentCart.map(item => {
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
              <button class="decrease" onclick="update(${item.id}, '-')">-</button>
              <input type="text" class="ammount-input" id="count${item.id}" value="${item.count}">
              <button class="increase text-bold" onclick="update(${item.id}, '+')">+</button>
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
    $cartList.innerHTML = list.join('');
    const total = calculateTotalPrice(currentCart);
    $totalPrice.innerHTML = `&dollar;${total}`;
  }
}

//Delete cart-item
function removeCart(id) {
  const cart =  localStorage.getItem('cart');
  let currentCart = cart ? JSON.parse(cart) : [];
  let $totalPrice = document.querySelector('.total-cost');
  
  if (currentCart.length === 0) return;
  currentCart = currentCart.filter(item => item.id !== id);
  let total = calculateTotalPrice(currentCart);
  $totalPrice.innerHTML = `&dollar;${total}`;
  localStorage.setItem('cart', JSON.stringify(currentCart));
  getCart();
}

//update ammount of product
function update(id, sign) {
  let $count = document.getElementById("count"+id);
  let currentCart = localStorage.getItem('cart') ?? [];
  let $totalPrice = document.querySelector(".total-cost");

  if (currentCart.length !== 0) currentCart = JSON.parse(currentCart);
  let itemId = currentCart.findIndex(item => item.id == id);
  if (sign === '-') {
    if (currentCart[itemId].count === 0) return;
    currentCart[itemId].count = currentCart[itemId].count - 1;
  }
  else {
    currentCart[itemId].count = currentCart[itemId].count + 1;
  }
  console.log( currentCart[itemId].count);
  $count.value = currentCart[itemId].count;
  let total = calculateTotalPrice(currentCart);
  $totalPrice.innerHTML = `&dollar;${total}`;
  localStorage.setItem('cart', JSON.stringify(currentCart));
}

// calcalate total price
function calculateTotalPrice(currentCart) {
  const total = currentCart.reduce((total, item) => item.count * (item.price-item.price * item.discount / 100) + total, 0);
  return total.toFixed(2);
}
const data = fetchData();
renderProduct(data);
