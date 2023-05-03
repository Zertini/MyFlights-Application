const airportRepository = require("../repository/airport-repository");

async function getAllAirports(connection) {
    const [rows] = await airportRepository.getAllAirports(connection);

    return rows;
}

async function getAirportByCode(connection, code) {
    const [rows] = await airportRepository.getAirportByCode(connection, code);

    if (rows.length === 0) {
        return undefined;
    }

    return rows;
}

async function insertAirport(connection, code, name, annualPassengers, countryId) {
    await airportRepository.insertAirportByCountryId(connection, code, name, annualPassengers, countryId);
}

async function deleteAirport(connection, code) {
    await airportRepository.deleteAirport(connection, code);
}

module.exports = { getAllAirports, getAirportByCode, insertAirport, deleteAirport };