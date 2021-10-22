import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express() // create me an API instance

// GRANT ACCESS TO MY API FROM EVERYWHERE !
app.use( cors() ) // middleware => register some plugin

// res.write() // send piece of body
// res.write()
// res.write()
// res.end() => terminates request and sends ALL data to Browser!
// res.send => res.write + res.end()

app.get("/", (req, res) => {
  res.send({ message: "Hello from Sales API, D01"}) // sends DATA back to BROWSER
})

// ROUTE salespeople
app.get("/salespeople", (req, res) => {

  const strFileContent = fs.readFileSync('./data/salespeople.json', 'utf-8')
  const arrSalesPeople = JSON.parse( strFileContent ) // convert str to array of objects

  // res.send stringifies all JS data to JSON string for us => sendet JSON an Browser
  res.send({ 
    message: "Hello, here you will have salespeople sooon",
    data: arrSalesPeople
  }) // send a response to browser ( => res.write + res.end )
})

app.get("/topsalesperson", (req, res) => {

  const strFileContent = fs.readFileSync('./data/topsalesperson.json', 'utf-8')
  const objTopSalesPerson = JSON.parse( strFileContent )

  res.send({
    message: "Hello, you get top person here soon, just wait, buddy" ,
    data: objTopSalesPerson 
  })
})

const PORT = 5000
app.listen( PORT,  () => {
  console.log(`API started on http://localhost:${PORT}`)
})


