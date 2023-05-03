const fs = require("fs/promises");

const newLineRegex = /\r?\n/;

async function readCsvFile(path, delimiter = ";", encoding = "utf8") {
  const data = await fs
    .readFile(path, { encoding });
  const fileData = getRows(data).map(row => getColumns(row, delimiter));
  const columns = fileData.shift();

  return {
    columns,
    data: fileData
  };
}

function getRows(data) {
  return data.split(newLineRegex).filter(row => row.length !== 0);
}

function getColumns(data, delimiter = ";") {
  return data.split(delimiter);
}

module.exports = { readCsvFile };