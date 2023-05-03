const flightRepository = require("../repository/flight-repository");

async function getAllFlights(connection) {
    const [rows] = await flightRepository.getAllFlights(connection);

    return rows;
}

async function getFlightById(connection, id) {
    const [rows] = await flightRepository.getFlightById(connection, id);

    if (rows.length === 0) {
        return undefined;
    }

    return rows[0];
}

async function getFlightsFromCountry(connection, code) {
    const [rows] = await flightRepository.getFlightsFromCountry(connection, code);

    return rows;
}

async function getFlightsToCountry(connection, code) {
    const [rows] = await flightRepository.getFlightsToCountry(connection, code);

    return rows;
}

async function getFlightsFromAirport(connection, code) {
    const [rows] = await flightRepository.getFlightsFromAirport(connection, code);

    return rows;
}

async function getFlightsToAirport(connection, code) {
    const [rows] = await flightRepository.getFlightsToAirport(connection, code);

    return rows;
}

async function insertFlight(connection, departureAirportCode, destinationAirportCode, departureTime, duration) {
    await flightRepository.insertFlight(connection, departureAirportCode, destinationAirportCode, departureTime, duration);
}

async function updateFlight(connection, id, departureAirportCode, destinationAirportCode, departureTime, duration) {
    await flightRepository.updateFlight(connection, id, departureAirportCode, destinationAirportCode, departureTime, duration);
}

async function deleteFlight(connection, id) {
    await flightRepository.deleteFlight(connection, id);
}

module.exports = { getAllFlights, getFlightById, getFlightsFromCountry, getFlightsToCountry, getFlightsFromAirport, getFlightsToAirport, insertFlight, updateFlight, deleteFlight };