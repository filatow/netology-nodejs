const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { printDateInfo } = require('./print-date-info');

function runDateUtil() {
  const argv = yargs(hideBin(process.argv))
    .option('year', {
      alias: 'y',
      type: 'boolean',
      default: false,
    })
    .option('month', {
      alias: 'm',
      type: 'boolean',
      default: false,
    })
    .option('date', {
      alias: 'd',
      type: 'boolean',
      default: false,
    })
    .help()
    .argv;

  const mode = argv._[0];

  printDateInfo(mode, argv);
}

module.exports = { runDateUtil };