const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//GET ALL
app.get('/brawlers', async (req, res) => {
    const brawlers = await axios.get('https://api.brawlify.com/v1/brawlers')
    res.json(brawlers.data)
})
//Brawler por ID
app.get('/brawler/:id', async (req, res) => {
    const brawler = await axios.get(`https://api.brawlify.com/v1/brawlers/${req.params.id}`)
    res.json(brawler.data)
})


app.get('/events', async (req, res) => {
    const events = await axios.get('https://api.brawlify.com/v1/events')
    res.json(events.data)
})


app.get('/maps', async (req, res) => {
    const maps = await axios.get('https://api.brawlify.com/v1/maps')
    res.json(maps.data)
})
app.get('/map/:id', async (req, res) => {
    const map = await axios.get(`https://api.brawlify.com/v1/maps/${req.params.id}`)
    res.json(map.data)
})


app.get('/gamemodes', async (req, res) => {
    const maps = await axios.get('https://api.brawlify.com/v1/gamemodes')
    res.json(maps.data)
})
app.get('/gamemode/:id', async (req, res) => {
    const map = await axios.get(`https://api.brawlify.com/v1/gamemodes/${req.params.id}`)
    res.json(map.data)
})


app.get('/icons', async (req, res) => {
    const maps = await axios.get('https://api.brawlify.com/v1/icons')
    res.json(maps.data)
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})