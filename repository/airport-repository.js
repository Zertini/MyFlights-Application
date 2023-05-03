function getAllAirports(connection) {
    return connection.query("SELECT code, airport.name as airport_name, annual_passengers, country.name as country_name FROM airport INNER JOIN country ON airport.country_id = country.id");
}

function getAirportByCode(connection, code) {
    return connection.execute("SELECT * FROM airport WHERE code = ?", [code]);
}

function getAirportsByCountry(connection, countryId) {
    return connection.execute("SELECT * FROM airport WHERE country_id = ?", [countryId]);
}

function insertAirport(connection, code, name, annualPassengers, countryName) {
    return connection.execute("INSERT INTO airport (code, name, annual_passengers, country_id) VALUES (?, ?, ?, (SELECT id from country WHERE name = ?))", [code, name, annualPassengers, countryName]);
}

function insertAirports(connection, airports) {
    return airports.forEach(airport => insertAirport(connection, airport.code, airport.name, airport.annualPassengers, airport.countryName));
}

function insertAirportByCountryId(connection, code, name, annualPassengers, countryId) {
    return connection.execute("INSERT INTO airport (code, name, annual_passengers, country_id) VALUES (?, ?, ?, ?)", [code, name, annualPassengers, countryId]);
}

async function deleteAirport(connection, code) {
    await connection.execute("DELETE FROM flight WHERE departure_airport_code = ? OR destination_airport_code = ?", [code, code]);
    return connection.execute("DELETE FROM airport WHERE code = ?", [code]);
}

function deleteAirports(connection) {
    return connection.execute("DELETE FROM airport");
}

module.exports = { getAllAirports, getAirportByCode, getAirportsByCountry, insertAirport, insertAirports, insertAirportByCountryId, deleteAirport, deleteAirports };