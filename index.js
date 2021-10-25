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
              new Product(4, "Loose Textured T-Shirt", "images/image-4.png", 119.99)]
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
}
