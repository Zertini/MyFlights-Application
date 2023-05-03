function getAllCountries(connection) {
    return connection.query("SELECT * FROM country");
}

function getCountryById(connection, id) {
    return connection.execute("SELECT * FROM country WHERE id = ?", [id]);
}

function insertCountry(connection, name) {
    return connection.execute("INSERT INTO country (name) VALUES (?)", [name]);
}

function insertCountries(connection, names) {
    return names.forEach(name => insertCountry(connection, name));
}

function deleteCountries(connection) {
    return connection.execute("DELETE FROM country");
}

module.exports = { getAllCountries, getCountryById, insertCountry, insertCountries, deleteCountries }