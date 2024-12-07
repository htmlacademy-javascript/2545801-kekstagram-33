// Модуль содержит утилитарные функции

// Функция возвращает случайное число из диапазона от min до max включительно
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция возвращает случайное число из диапазона от min до max включительно так, что число не повторяется, пока не будут перебраны все числа из диапазона
const createRandomIntegerFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Функция проверяет нажата ли клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, createRandomIntegerFromRangeGenerator, isEscapeKey};
