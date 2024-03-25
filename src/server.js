const express = require('express')
const morgan = require('morgan')
const path = require('path')
const PORT = 8000

const app = express()

app.use(morgan('dev'))

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log('Server running on port http://localhost:8000')
})