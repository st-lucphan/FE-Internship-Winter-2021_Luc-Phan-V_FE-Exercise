//bài 1
function sum(a, b) {
  if (a === b)
    return (a + b) * 3;
  else
    return a + b;
}
console.log(sum(5, 5))
console.log(sum(5, 10))
//bài 2
function absolute_difference(a) {
  if (a > 19)
    return (a - 19) * 3;
  else
    return 19 - a;
}
console.log(absolute_difference(12))
console.log(absolute_difference(19))
console.log(absolute_difference(22))
//bài 3 và bài 4
var a = "1*9"
var b = "1234567890*"
function maskedNumber(a,n) {
  var output = []
  for (var i = 0; i < 10; i++) {
    if (a.replace('*', i) % n === 0)
      output.push(a.replace('*', i))
  }
  return output;
}
console.log(maskedNumber(a,3));
console.log(maskedNumber(a,6));
console.log(maskedNumber(b,3));
console.log(maskedNumber(b,6));
