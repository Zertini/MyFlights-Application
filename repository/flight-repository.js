function getAllFlights(connection) {
    return connection.query("SELECT * FROM flight");
}

function getFlightById(connection, id) {
    return connection.query("SELECT * FROM flight WHERE id = ?", [id]);
}

function getFlightsFromAirport(connection, airportCode) {
    return connection.execute("SELECT * FROM flight WHERE departure_airport_code = ?", [airportCode]);
}

function getFlightsToAirport(connection, airportCode) {
    return connection.execute("SELECT * FROM flight WHERE destination_airport_code = ?", [airportCode]);
}

function getFlightsFromCountry(connection, countryId) {
    return connection.execute("SELECT * FROM flight WHERE departure_airport_code IN (SELECT code FROM airport WHERE country_id = ?)", [countryId]);
}

function getFlightsToCountry(connection, countryId) {
    return connection.execute("SELECT * FROM flight WHERE destination_airport_code IN (SELECT code FROM airport WHERE country_id = ?)", [countryId]);
}

function insertFlight(connection, departureAirportCode, destinationAirportCode, departureTime, duration) {
    return connection.execute("INSERT INTO flight (departure_airport_code, destination_airport_code, departure_time, duration) VALUES (?, ?, ?, ?)", [departureAirportCode, destinationAirportCode, departureTime, duration]);
}

function updateFlight(connection, id, departureAirportCode, destinationAirportCode, departureTime, duration) {
    return connection.execute("UPDATE flight SET departure_airport_code = ?, destination_airport_code = ?, departure_time = ?, duration = ? WHERE id = ?", [departureAirportCode, destinationAirportCode, departureTime, duration, id]);
}

function insertFlights(connection, flights) {
    return flights.forEach(flight => insertFlight(connection, flight.departureAirportCode, flight.destinationAirportCode, flight.departureTime, flight.duration));
}

function deleteFlights(connection) {
    return connection.execute("DELETE FROM flight");
}

function deleteFlight(connection, id) {
    return connection.execute("DELETE FROM flight WHERE id = ?", [id]);
}

module.exports = { getAllFlights, getFlightById, getFlightsFromAirport, getFlightsToAirport, getFlightsFromCountry, getFlightsToCountry, insertFlight, insertFlights, updateFlight, deleteFlights, deleteFlight };