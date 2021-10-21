function Plan(name, price, user, storage, support, help) {
  this.name = name;
  this.price = price;
  this.user = user;
  this.storage = storage;
  this.support = support;
  this.help = help;
}
var array = [new Plan("Basic", 10, 10, 2, "Email support", "Help center access"), new Plan("Pro", 30, 100, 20, "Priority email support", "Help center access")]
var planList = document.querySelector('.plan-list');
var htmls = array.map(function (item) {
  return `<div class="col-6">
            <div class="card text-center">
              <h5 class="card-header">${item.name}</h5>
              <div class="card-body">
                <h5 class="card-title">${item.price}$ / month</h5>
                <ul class="info-list list-unstyled">
                  <li class="info-item">${item.user} users included</li>
                  <li class="info-item">${item.storage} GB of storage</li>
                  <li class="info-item">${item.support}</li>
                  <li class="info-item">${item.help}</li>
                </ul>
                <a href="#" class="w-100 btn btn-lg btn-primary ${item.name === 'Basic' ? 'btn-outline-primary' : 'btn-primary'}">${item.name === 'Basic' ? 'Get Started' : 'Buy Now'}</a>
              </div>
            </div>
          </div>`;
});
planList.innerHTML = htmls.join('');
