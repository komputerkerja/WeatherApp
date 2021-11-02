const express = require('express')
const needle = require('needle')
const router = express.Router()
const url = require('url')

const API_BASE_URL=process.env.API_BASE_URL
const API_KEY_NAME=process.env.API_KEY_NAME
const API_KEY_VALUE=process.env.API_KEY_VALUE

router.get('/', async (req,res) => {
    const params = new URLSearchParams({
        [API_KEY_NAME]:API_KEY_VALUE,
        ...url.parse(req.url, true).query
    })
    const reqApi = await needle('get',`${API_BASE_URL}current.json?${params}`)
    const resApi = reqApi.body
    res.status(200).json(resApi)
})

router.get('/search', async (req,res) => {
    const params = new URLSearchParams({
        [API_KEY_NAME]: API_KEY_VALUE,
        ...url.parse(req.url,true).query
    })
    const reqApi = await needle('get', `${API_BASE_URL}search.json?${params}`)
    const resApi = reqApi.body
    res.status(200).json(resApi)
})

module.exports = router
