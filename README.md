
# Welcome to MyFlights application

## Technologies used
https://nodejs.dev/en/
https://expressjs.com/
https://ejs.co/
https://www.mysql.com/

## https://drive.google.com/file/d/1-CXflYYBbFwzLNImfJABT0PVAVeknX7M/view

## How to setup a local database
 1. Create a connection in MySQL Workbench.
 2. Create a schema.
 3. Import the files in the project SQL folder.
 4. Edit the `server.js` file with the correct user/password/database values.

## How to start the application
 1. Install Node
 2. Go to the project root
 3. Execute `npm install`
 4. Execute `node server`

## How to read the .csv files
 1. Start the application
 2. Execute `HTTP POST localhost:3000/api/data`

## Functionalities
### Adding a new airport in a corresponding country
In the Add Airport tab you will get a fillout form for a Country Code, Airport Name, Annual passengers and a selector for Airport Country. If the form is filled out properly you will have added the data into the database.
https://drive.google.com/file/d/1wJWqqxzJ0grWbwlyATF6V_BdmDutEkq3/view?usp=share_link

### Editing and Deleting existing flights
The Add Flights tab allows the user to add new flights with a form with selectors for Departure Airport and Destination Airport and a fillout form for Departure time and Duration. If the form is filled out properly you will have added the data into the database.
https://drive.google.com/file/d/1z3JWeJee_SBkQlklGtpqxXr7_CAFFzfH/view?usp=share_link

### Editing and Deleting existing flights and airports.
The Airports and Flights tabs have Delete functionalities. And Flights has an Edit functionality.
https://drive.google.com/file/d/1o6hJ7KmK9IFiZFQZwhfkf85jBr-f0DKg/view?usp=share_link

## Future improvements
### Adding validation in create/edit forms.