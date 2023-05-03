const countryRepository = require("../repository/country-repository");

async function getAllCountries(connection) {
    const [rows] = await countryRepository.getAllCountries(connection);

    return rows;
}

async function getCountryById(connection, id) {
    const [rows] = await countryRepository.getCountryById(connection, id);

    if (rows.length === 0) {
        return undefined;
    }

    return rows;
}

module.exports = { getAllCountries, getCountryById };