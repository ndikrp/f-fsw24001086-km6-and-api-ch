require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const path = require('path')
const router = require('./routes/router')
const PORT = process.env.PORT

const app = express()
app.use(cors({
    origin: '*'
}));

app.use(morgan('dev'))
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/add', (req, res) => {
    res.render('add')
})
app.get('/edit', (req, res) => {
    res.render('edit')
})
// app.get('/edit', (req, res) => {
//     res.status(404)
//     res.send('<h1>404 Not Found</h1>')
// })

app.use('/api/v1/', router)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})