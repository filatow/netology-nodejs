const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { printDateInfo } = require('./print-date-info');

function runDateUtil() {
  const argv = yargs(hideBin(process.argv))
    .option('year', {
      alias: 'y',
      type: 'boolean',
      describe: 'Show year',
      default: false,
    })
    .option('month', {
      alias: 'm',
      type: 'boolean',
      describe: 'Show month',
      default: false,
    })
    .option('date', {
      alias: 'd',
      type: 'boolean',
      describe: 'Show day',
      default: false,
    })
    .help()
    .argv;

  const mode = argv._[0];

  printDateInfo(mode, argv);
}

module.exports = { runDateUtil };