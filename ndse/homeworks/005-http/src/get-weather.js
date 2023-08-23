const http = require('http');

const APIKey = process.env.weatherAPIKey;
const city = process.argv[2] || process.env.defaultCity;
const url = `http://api.weatherstack.com/current?access_key=${APIKey}&query=${city}`;


const getWeather = () => {
  http.get(url, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.log(`statusCode: ${statusCode}`);
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      let parseData = JSON.parse(rawData);
      console.log(parseData);
    })
  }).on('error', (err) => {
    console.error(err);
  });
}

module.exports = {
  getWeather
}