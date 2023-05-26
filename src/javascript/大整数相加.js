function add(number1, number2) {
  let result = '';
  let carry = false;
  number1 = number1.split('');
  number2 = number2.split('');
  while (number1.length || number2.length || carry) {
    carry += ~~number1.pop() + ~~number2.pop();

    result = carry % 10 + result;

    carry = carry > 9;

  }
  return result;
}

console.log(add('123', '123'))
// console.log(~~[].pop() + 1)