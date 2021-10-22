import fetch from 'node-fetch'
import fs from 'fs'

// CLI: API Data fetcher & Updater

// X Northwind API aufrufen
// X Random Sales an jede SalesPerson hinzufügen

// X Daten in JSON Datei abspeichern (wenn Datei schon existiert => überschreiben)

// TOP Sales Person bekommt BONUS und eigene Datei
// bonus: 10-25 (random)

const getRandomNumInRange = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum-minimum)) + minimum
}

// get API data and convert to the format we want
const getApiData = async () => {

  const API_URL = "https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/json/employees.json"

  const res = await fetch(API_URL) // mache FETCH call zur API
  const data = await res.json() // parse JSON Daten in JS Object 
  
  // convert all sales people to the format we want
  const result = data.map( person => {
  
    const personFormatNew = {
        id: person.employeeID,
        firstName: person.firstName,
        lastName: person.lastName,
        salesInEuro: getRandomNumInRange(100, 900)
    }
    return personFormatNew
  }) 

  // write all sales people to FILE
  // => we write binary or string data to file
  const jsonResult = JSON.stringify( result )

  try {
    fs.writeFileSync('./data/salespeople.json', jsonResult)
  }
  catch(err) {
    console.log(err)
  }
  
}

getApiData()


// map um alle Einträge in ein NEUES Format zu machen

/* INPUT
    "employeeID": 2,
    "lastName": "Fuller",
    "firstName": "Andrew",
*/

// Expected OUTPUT in file
// [{
//   "id": 8,
//   "lastName": "Callahan",
//   "firstName": "Laura",
//   "salesInEuro": 365 => [100-900]
// }]