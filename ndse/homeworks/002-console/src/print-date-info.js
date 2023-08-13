const { DateTime } = require('luxon');

const mapping = {
  current: (argv, dt) => {
    const { year, month, date } = argv;
    let output = '';

    output += year ? `year: ${dt.year}\n` : '';
    output += month ? `month: ${dt.month}\n` : '';
    output += date ? `day: ${dt.day}\n` : '';

    return output.length ? output : dt.toISO();
  },
  add: (argv, dt) => {
    const { month, date } = argv;
    const delta = argv._[1] ?? 0;

    if (month) return `${dt.plus({ months: delta }).toISO()}`;
    if (date) return `${dt.plus({ days: delta }).toISO()}`;

    return dt.toISO();
  },
  sub: (argv, dt) => {
    const { month, date } = argv;
    const delta = argv._[1] ?? 0;

    if (month) return `${dt.minus({ months: delta }).toISO()}`;
    if (date) return `${dt.minus({ days: delta }).toISO()}`;

    return dt.toISO();
  },
}

function printDateInfo(mode, argv) {
  const now = DateTime.now();
  const dateInfo = mapping[mode](argv, now);

  console.log(dateInfo);
}

module.exports = { printDateInfo };