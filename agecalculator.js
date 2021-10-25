const newInput = document.createElement('input');
const newButton = document.createElement('button');
const newP = document.createElement('p');
const attr = document.createAttribute('value');
const newContent = document.createTextNode('abcd');

newButton.innerHTML = 'Tính tuổi';
newInput.placeholder = 'nhập năm sinh';

document.body.appendChild(newInput);
document.body.appendChild(newButton);
document.body.appendChild(newP);

newButton.onclick = function changeContent() {
  var currentTime = new Date();
  var year = currentTime.getFullYear();
  var age = year - newInput.value;
  newP.innerHTML = 'Tuổi của bạn là: ' + age;
}
