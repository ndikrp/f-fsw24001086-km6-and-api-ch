const express = require('express')
const { Car } = require('../db/models')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        status: 'Success!',
        message: 'Server is running!'
    })
})

router.get('/cars', (req, res) => {
    Car.findAll()
        .then(cars => {
            res.status(200)
                .json({
                    status: 'Success!',
                    message: 'Cars retrieved successfully',
                    data: cars
                })
        })
        .catch(err => {
            res.status(500)
                .json({
                    status: 'Failed!',
                    message: 'Internal server error'
                })
        })
})

module.exports = router