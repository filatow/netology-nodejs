const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const {
  stdin: input,
  stdout: output,
} = require('node:process');

const DEFAULT_LOGFILE = 'results.txt';

function playHeadsOrTails(
  logFile = path.resolve(
    __dirname,
    '../logs',
    path.basename(process.argv[2]) ?? DEFAULT_LOGFILE)
) {
  const target = Math.random() < 0.5 ? 1 : 2;
  const rl = readline.createInterface({ input, output });

  console.log(`Угадайте загаданное число: 1 или 2?`);
  rl.on('line', (input) => {
    const shot = Number(input);
    if (![1, 2].includes(shot)) {
      console.log('Введите число 1 или 2');
      return;
    };

    if (!fs.existsSync(path.dirname(logFile))) {
      fs.mkdirSync(path.dirname(logFile));
    }

    let result;
    if (shot === target) {
      result = 'win';
      console.log('Вы угадали!');
    } else {
      result = 'miss';
      console.log('Вы не угадали!');
    }
    const summary = `${new Date().toISOString()}=${result}\n`;

    fs.appendFile(logFile, summary, (err) => {
      if (err) throw err;

      console.log(`Результаты игры сохранены по пути:\n${logFile}`);
      rl.close();
    });
  });
}

module.exports = { playHeadsOrTails }