const express = require('express')
const app = express()
const port = 3000

// url_weatherForecast: 'https://api.openweathermap.org/data/2.5/'

app.get('/', (request, response) => {
    console.log(request.query)
})

app.listen(port, () => {
    console.log('Example app...')
})