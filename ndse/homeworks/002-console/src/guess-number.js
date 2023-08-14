const readline = require('node:readline');
const {
  stdin: input,
  stdout: output,
} = require('node:process');


const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const isValidSettings = (settings) => {
  const [min, max] = settings;
  return settings.every(Boolean) && max > min;
}

const guessNumber = () => {
  let min = 0;
  let max = 100;
  const userSettings = process.argv.slice(2, 4).map(Number);
  if (isValidSettings(userSettings)) {
    [min, max] = userSettings;
  }
  const clue = getRandomInteger(min, max);
  const rl = readline.createInterface({ input, output });

  console.log(`Загадано число в диапазоне от ${min} до ${max}`);
  rl.on('line', (input) => {
    const shot = Number(input);
    if (Number.isNaN(shot)) {
      console.log('Введите число');
      return;
    };

    if (shot < clue) {
      console.log('Больше');
    } else if (shot > clue) {
      console.log('Меньше');
    } else if (shot === clue) {
      console.log(`Отгадано число ${clue}`);
      rl.close();
    }
  });
}

module.exports = { guessNumber };
