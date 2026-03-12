const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const brawlify = axios.create({
    baseURL: 'https://api.brawlify.com/v1',
    timeout: 10000,
})

const fetchAndRespond = async (res, path) => {
    try {
        const response = await brawlify.get(path)
        res.json(response.data)
    } catch (error) {
        const status = error.response?.status || 502
        res.status(status).json({
            error: 'Erro ao consultar a API do Brawlify',
            details: error.response?.data || error.message,
        })
    }
}

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'brawl-stars-backend' })
})

//GET ALL
app.get('/brawlers', async (req, res) => {
    await fetchAndRespond(res, '/brawlers')
})
//Brawler por ID
app.get('/brawler/:id', async (req, res) => {
    await fetchAndRespond(res, `/brawlers/${req.params.id}`)
})


app.get('/events', async (req, res) => {
    await fetchAndRespond(res, '/events')
})


app.get('/maps', async (req, res) => {
    await fetchAndRespond(res, '/maps')
})
app.get('/map/:id', async (req, res) => {
    await fetchAndRespond(res, `/maps/${req.params.id}`)
})


app.get('/gamemodes', async (req, res) => {
    await fetchAndRespond(res, '/gamemodes')
})
app.get('/gamemode/:id', async (req, res) => {
    await fetchAndRespond(res, `/gamemodes/${req.params.id}`)
})


app.get('/icons', async (req, res) => {
    await fetchAndRespond(res, '/icons')
})

app.use((req, res) => {
    res.status(404).json({ error: 'Rota nao encontrada' })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})