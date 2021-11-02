const expressEjsLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 5000
const express = require('express')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressEjsLayouts)
app.use('/api', require('./routes'))

app.get('/', (req,res) => {
    res.render('home', {
        layout: 'layouts/main.ejs',
        title: 'Home'
    })
})


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))