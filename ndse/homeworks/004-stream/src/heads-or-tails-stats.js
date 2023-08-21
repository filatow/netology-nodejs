const fs = require('node:fs');
const path = require('node:path');
const { DEFAULT_LOGFILE } = require('./consts');

function printHeadsOrTailsStats(
  logFile = path.resolve(
    __dirname,
    '../logs',
    path.basename(process.argv[2] ?? DEFAULT_LOGFILE))
) {
  if (!fs.existsSync(logFile)) {
    console.log(`Отсутствует файл статистики '${path.basename(logFile)}'`);
    return;
  }

  const readerStream = fs.createReadStream(logFile);

  let statistics;
  readerStream
    .setEncoding('utf8')
    .on('data', (chank) => {
      statistics += chank;
    })
    .on('end', () => {
      const results = statistics.split('\n')
        .filter(Boolean)
        .map((game) => game.split('=').at(1));

      const totalAmount = results.length;
      const winAmount = results.filter((res) => res === 'win').length;
      const missAmount = totalAmount - winAmount;
      const winPercentage = (winAmount / totalAmount * 100).toFixed(1);

      const summary = `
        Статистика игр
        Всего: ${totalAmount}
        Побед: ${winAmount}
        Промахов: ${missAmount}
        Процент побед: ${winPercentage}%`;

      console.log(summary);
    })
    .on('error', (err) => {
      console.error(err.message);
    });
}

module.exports = { printHeadsOrTailsStats }