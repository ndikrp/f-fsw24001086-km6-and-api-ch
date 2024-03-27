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

router.get('/cars/:id', (req, res) => {
    const id = req.params.id
    Car.findByPk(id)
        .then(car => {
            if (car) {
                res.status(200)
                    .json({
                        status: 'Success!',
                        message: `Car with id ${id} retrieved successfully`,
                        data: car
                    })
            } else {
                res.status(404)
                    .json({
                        status: 'Failed!',
                        message: `Car with id ${id} not found`
                    })
            }
        })
        .catch(err => {
            res.status(500)
                .json({
                    status: 'Failed!',
                    message: 'Internal server error'
                })
        })
})

router.post('/cars', (req, res) => {
    Car.create({
        name: req.body.name,
        size: req.body.size,
        rent_per_day: req.body.rentPerDay,
        image_id: req.body.image,
        image_url: req.body.imageUrl
    })
        .then(car => {
            if (car !== null) {
                res.status(201)
                    .json({
                        status: 'Success!',
                        message: 'Car created successfully',
                        data: car
                    })
            } else {
                res.status(412)
                    .json({
                        status: 'Failed!',
                        message: `Car needs name, size, rentPerDay, image, imageUrl`
                    })
            }
        })
        .catch(err => {
            res.status(500)
                .json({
                    status: 'Failed!',
                    message: `Internal server error ${err}`
                })
        })
})

router.delete('/cars/:id', (req, res) => {
    const id = req.params.id
    Car.destroy({
        where: {
            id: id
        }
    })
        .then(result => {
            if (result !== 0) {
                res.status(200)
                    .json({
                        status: 'Success!',
                        message: `Car with id ${id} deleted successfully`
                    })
            } else {
                res.status(404)
                    .json({
                        status: 'Failed!',
                        message: `Car with id ${id} not found`
                    })
            }
        })
        .catch(err => {
            res.status(500)
                .json({
                    status: 'Failed!',
                    message: 'Internal server error'
                })
        })
})

// Error handler
router.use((err, req, res, next) => {
    res.status(500)
        .json({
            status: 'Failed!',
            message: err
        })
})

module.exports = router