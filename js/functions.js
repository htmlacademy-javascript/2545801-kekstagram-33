// Файл допзаданий с функциями

// Функция для проверки длины строки
const checkStringLength = (string, stringMaxLength) => {
  const normalizeString = string.toString();
  return normalizeString.length <= stringMaxLength;
};

checkStringLength('проверяемая строка', 20); // true

// Функция для проверки, является ли строка палиндромом
const isPalindrom = (string) => {
  const normalizeString = string.toString().replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    reverseString += normalizeString[i];
  }

  return normalizeString === reverseString;
};

isPalindrom('Лёша на полке клопа нашёл '); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
const getNumbers = (string) => {
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

getNumbers('ECMAScript 2022'); // 2022

/*
Функцию принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
const isMeetingPossible = (
  startWorkTime,
  endWorkTime,
  startMeetingTime,
  durationMeetingTime,
) => {
  const startWorkTimeArray = startWorkTime.split(':');
  const endWorkTimeArray = endWorkTime.split(':');
  const startMeetingTimeArray = startMeetingTime.split(':');

  const durationMeetingTimeMinutes = durationMeetingTime % 60;
  const durationMeetingTimeHours = (durationMeetingTime - durationMeetingTimeMinutes) / 60;
  const durationMeetingTimeString = `${durationMeetingTimeHours}:${durationMeetingTimeMinutes}`;
  const durationMeetingTimeArray = durationMeetingTimeString.split(':');

  const endMeetingTimeArray = [
    parseInt(startMeetingTimeArray[0], 10) + parseInt(durationMeetingTimeArray[0], 10),
    parseInt(startMeetingTimeArray[1], 10) + parseInt(durationMeetingTimeArray[1], 10),
  ];

  // решение 'в лоб' через условие сравнивания чисел
  if (
    (
      endMeetingTimeArray[0] > parseInt(endWorkTimeArray[0], 10)
    )
    ||
    (
      endMeetingTimeArray[0] === parseInt(endWorkTimeArray[0], 10) &&
      endMeetingTimeArray[1] > parseInt(endWorkTimeArray[1], 10)
    )
    ||
    (
      parseInt(startWorkTimeArray[0], 10) > parseInt(startMeetingTimeArray[0], 10)
    )
    ||
    (
      parseInt(startWorkTimeArray[0], 10) === parseInt(startMeetingTimeArray[0], 10) &&
      parseInt(startWorkTimeArray[1], 10) > parseInt(startMeetingTimeArray[1], 10)
    )
  ) {
    return false;
  }
  return true;
};

isMeetingPossible('08:00', '17:30', '14:00', 90); // true
isMeetingPossible('8:0', '10:0', '8:0', 120); // true
isMeetingPossible('08:00', '14:30', '14:00', 90); // false
isMeetingPossible('14:00', '17:30', '08:0', 90); // false
isMeetingPossible('8:00', '17:30', '08:00', 900); // false
