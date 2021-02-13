const fsPromises = require('fs').promises;

const getDataFromFile = (pathToFile) => fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(`Ошибка: ${err}`));

module.exports = getDataFromFile;
