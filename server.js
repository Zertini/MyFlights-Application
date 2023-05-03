const express = require("express");
const mysql = require("mysql2/promise");
const { importData } = require("./util/data-importer");
const { getAllCountries, getCountryById } = require("./service/country-service");
const { getAllAirports, getAirportByCode, insertAirport, deleteAirport } = require("./service/airport-service");
const { getAllFlights, getFlightById, getFlightsFromCountry, getFlightsToCountry, getFlightsFromAirport, getFlightsToAirport, insertFlight, updateFlight, deleteFlight } = require("./service/flight-service");

const app = express();
let connection;

async function createDatabaseConnection() {
    connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Design123Pricks456Chiko",
        database: "assignment"
    });
}
createDatabaseConnection();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get("", (req, res) => {
    res.render('index', {});
});

app.get("/airports", async (req, res) => {
    const airports = await getAllAirports(connection);

    res.render('airports', { airports });
});

app.get("/add-airport", async (req, res) => {
    const countries = await getAllCountries(connection);

    res.render('add-airport', { countries });
});

app.get("/flights", async (req, res) => {
    const flights = await getAllFlights(connection);

    res.render('flights', { flights });
});

app.get("/add-flight", async (req, res) => {
    const airports = await getAllAirports(connection);

    res.render('add-flight', { airports });
});

app.get("/edit-flight/:id", async (req, res) => {
    const { id } = req.params;
    const flight = await getFlightById(connection, id);
    const airports = await getAllAirports(connection);

    res.render('edit-flight', { flight, airports });
});

app.post("/api/data", async (req, res) => {
    importData(connection);

    res.sendStatus(200);
});

app.get("/api/countries", async (req, res) => {
    const countries = await getAllCountries(connection);

    res.send(countries);
});

app.get("/api/countries/:id", async (req, res) => {
    const { id } = req.params;
    const country = await getCountryById(connection, id);

    if (country) {
        res.send(country);
    } else {
        res.sendStatus(404);
    }
});

app.get("/api/airports", async (req, res) => {
    const airports = await getAllAirports(connection);

    res.send(airports);
});

app.post("/api/airports", async (req, res) => {
    const airport = req.body;

    await insertAirport(connection, airport.code, airport.name, airport.annualPassengers, airport.countryId);

    res.sendStatus(201);
});

app.get("/api/airports/:code", async (req, res) => {
    const { code } = req.params;
    const airport = await getAirportByCode(connection, code);

    if (airport) {
        res.send(airport);
    } else {
        res.sendStatus(404);
    }
});

app.delete("/api/airports/:code", async (req, res) => {
    const { code } = req.params;

    await deleteAirport(connection, code);

    res.sendStatus(204);
});

app.get("/api/flights", async (req, res) => {
    const flights = await getAllFlights(connection);

    res.send(flights);
});

app.get("/api/flights/departure/country/:id", async (req, res) => {
    const { id } = req.params;
    const flights = await getFlightsFromCountry(connection, id);

    res.send(flights);
});

app.get("/api/flights/destination/country/:id", async (req, res) => {
    const { id } = req.params;
    const flights = await getFlightsToCountry(connection, id);

    res.send(flights);
});

app.get("/api/flights/departure/airport/:code", async (req, res) => {
    const { code } = req.params;
    const flights = await getFlightsFromAirport(connection, code);

    res.send(flights);
});

app.get("/api/flights/destination/airport/:code", async (req, res) => {
    const { code } = req.params;
    const flights = await getFlightsToAirport(connection, code);

    res.send(flights);
});

app.post("/api/flights", async (req, res) => {
    const flight = req.body;

    await insertFlight(connection, flight.departureAirportCode, flight.destinationAirportCode, flight.departureTime, flight.duration);

    res.sendStatus(201);
});

app.put("/api/flights/:id", async (req, res) => {
    const { id } = req.params;
    const flight = req.body;

    await updateFlight(connection, id, flight.departureAirportCode, flight.destinationAirportCode, flight.departureTime, flight.duration);

    res.sendStatus(200);
});

app.delete("/api/flights/:id", async (req, res) => {
    const { id } = req.params;

    await deleteFlight(connection, id);

    res.sendStatus(204);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});