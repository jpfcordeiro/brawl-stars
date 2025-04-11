const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')

app.get('/brawler', async (req, res) => {
    const brawlers = await axios.get('https://api.brawlify.com/v1/brawlers')
    res.json(brawlers.data)
})


app.get('/events', async (req, res) => {
    const events = await axios.get('https://api.brawlify.com/v1/events')
    res.json(events.data)
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})