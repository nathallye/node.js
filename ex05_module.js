const { global } = require("styled-jsx/css");

console.log(this === global); // this é igual a global?, ou seja, this aponta para global?
// retorno =>
// false
console.log(this === module); // this é igual a module?, ou seja, this aponta para module?
// retorno =>
// false
console.log(this === module.exports); // this é igual a module.exports?, ou seja, this aponta para module.exports?
// retorno =>
// true

this.talkHello = function() {
  console.log("Hello!!!!!")
}