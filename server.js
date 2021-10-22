import express from 'express'

const app = express() // create me an API instance

app.get("/", (req, res) => {
  res.send({ message: "Hello from Sales API, D01"})
})

// ROUTE salespeople
app.get("/salespeople", (req, res) => {
  res.send({ message: "Hello, here you will have salespeople sooon" }) // send a response to browser ( => res.write + res.end )
})

app.get("/topsalesperson", (req, res) => {
  res.send({ message: "Hello, you get top person here soon, just wait, buddy" })
})

const PORT = 5000
app.listen( PORT,  () => {
  console.log(`API started on http://localhost:${PORT}`)
})

// API
// 2 routes

// Route 1: /salesperson => liest Datei sales.json
// Route 2: /topsalesperson => liest Datei topsales.json


