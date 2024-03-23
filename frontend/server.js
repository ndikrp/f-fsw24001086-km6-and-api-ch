const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(morgan('dev'))

app.use(express.static(path.join (__dirname, 'public')))

app.set('view engine', 'ejs')

app.listen(8000, () => {
    console.log('Server running on port http://localhost:8000')
})