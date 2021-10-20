//bai1
var mang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
function sum(mang) {
  var result = 0;
  for (i = 0; i < mang.length; i++) {
    if (mang[i] % 2 === 1)
      result += mang[i];
  }
  return result;
}
console.log(sum(mang));
//bai2
var str1 = "supremetech company"
function subString(a) {
  var result;
  return result = a.substr(0, 10) + '...';
}
console.log(subString(str1))
//bai3
var string = "techmAster";
function uppercaseFirstLetter(string) {
  var result = string.toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
console.log(uppercaseFirstLetter(string))
//bai4
function min(mang) {
  var min = mang[0];
  for (i = 1; i < mang.length; i++) {
    if (min > mang[i])
      min = mang[i]
  }
  return min;
}
console.log(min(mang));
//bai5
function Person(name, age, school) {
  this.name = name;
  this.age = age;
  this.school = school;
}
var array = [new Person("John", 26, "Cambridge"), new Person("Mark", 30, "Oxford"), new Person("Bill", 28, "Havard")]
Person.prototype.coding = function () {
  if (this.age >= 28)
    console.log('coding master');
  else
    console.log('learning code');
}
//bai6
var a = [1, 2, 3, 4, 5, 5]
var b = [1, 7, 8, 5]
function filterArray(a, b) {
  return a.filter(item => b.includes(item));
}
console.log(filterArray(a, b));
//bai7
var number = 1234;
function sumDigits(number) {
  sum = 0;
  while (number) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum;
}
console.log(sumDigits(number));
