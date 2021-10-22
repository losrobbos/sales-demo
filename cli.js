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

// get top sales people as array
const getTopSalesPerson = (arrSalesPeople = []) => {

  if(!arrSalesPeople.length) return

  // sort all people by sales top to bottom
  // afterwards merge sales person with new bonus field to new object
  return {
    ...arrSalesPeople.sort((a, b) => b.salesInEuro - a.salesInEuro)[0],
    bonusInEuro: getRandomNumInRange( 10, 25 ),
  };

  // const topSalesPerson = arrSalesPeople.sort((a, b) => b.salesInEuro - a.salesInEuro)[0]
  // return {
  //   ...topSalesPerson, 
  //   bonusInEuro: getRandomNumInRange( 10, 25 )
  // }


}

// get API data and convert to the format we want
const getApiDataAndSaveFormatted = async () => {

  const API_URL = "https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/json/employees.json"

  const res = await fetch(API_URL) // mache FETCH call zur API
  const data = await res.json() // parse JSON Daten in JS Object 
  
  // convert all sales people to the format we want
  const arrSalesPeople = data.map( person => {
  
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
  const jsonResult = JSON.stringify( arrSalesPeople )

  try {
    fs.writeFileSync('./data/salespeople.json', jsonResult)
  }
  catch(err) {
    console.log(err)
  }


  // write TOP sales person to file
  // im Array suche die SalesPerson mit dem höchsten "salesInEuro" wert

  const topSalesPerson = getTopSalesPerson( arrSalesPeople )

  console.log( topSalesPerson )

  const jsonTopSalesPerson = JSON.stringify( topSalesPerson ) // convert object into JSON String

  try {
    fs.writeFileSync('./data/topsalesperson.json', jsonTopSalesPerson)
  }
  catch(err) {
    console.log(err)
  }

}

getApiDataAndSaveFormatted()


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