const { readCsvFile } = require("./csv-reader");
const { insertCountries, deleteCountries } = require("../repository/country-repository");
const { insertAirports, deleteAirports } = require("../repository/airport-repository");
const { insertFlights, deleteFlights } = require("../repository/flight-repository");
const { unique } = require("./unique");

async function importData(connection) {
    const airportData = await readCsvFile("./data/airports.csv");
    const flightData = await readCsvFile("./data/flights.csv");

    deleteFlights(connection);
    deleteAirports(connection);
    deleteCountries(connection);

    const countries = getCountries(airportData.data);
    const airports = getAirports(airportData.data);
    const flights = getFlights(flightData.data);

    insertCountries(connection, countries);
    insertAirports(connection, airports);
    insertFlights(connection, flights);
}

function getCountries(airports) {
    return airports.map(airport => airport[1]).filter(unique);
}

function getAirports(airports) {
    return airports.map(airport => ({ code: airport[2], name: airport[0], annualPassengers: airport[3], countryName: airport[1] }));
}

function getFlights(flights) {
    return flights.map(flight => ({ departureAirportCode: flight[0], destinationAirportCode: flight[1], departureTime: flight[2], duration: flight[3] }));
}

module.exports = { importData };