// Функция для проверки длины строки
const checkStringLength = function (string, stringMaxLength) {
  const normalizeString = string.toString();
  return normalizeString.length <= stringMaxLength;
};

// Функция для проверки, является ли строка палиндромом
const isPalindrom = function (string) {
  const normalizeString = string.toString().replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    reverseString += normalizeString[i];
  }

  return normalizeString === reverseString;
};

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
const getNumbers = function (string) {
  const normalizeString = string.toString();
  let result = '';

  for (let i = 0; i <= normalizeString.length - 1; i++) {
    if (Number.isNaN(parseInt(normalizeString[i], 10))) {
      continue;
    }

    result += parseInt(normalizeString[i], 10);
  }

  if (result === '') {
    return NaN;
  }

  return result;
};

// examples
checkStringLength('проверяемая строка', 20);
isPalindrom('Лёша на полке клопа нашёл ');
getNumbers('ECMAScript 2022');
