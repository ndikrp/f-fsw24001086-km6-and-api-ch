const express = require('express')
const cloudinary = require('./handler/cloudinary')
const { Car } = require('../db/models')
const uploadOnMemory = require('./handler/multer')

const router = express.Router()
const CLOUDINARY_DIR = "bcr-management-dashboard"

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
        rent_per_day: req.body.rent_per_day,
        image_id: req.body.image_id,
        image_url: req.body.image_url
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

router.post('/cars/img/cloudinary',
    uploadOnMemory.single('picture'),
    (req, res) => {
        const public_id = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const fileBase64 = req.file.buffer.toString('base64')
        const file = `data:${req.file.mimetype};base64,${fileBase64}`

        cloudinary.uploader
            .upload(file, {
                height: 160, width: 270, crop: 'fit',
                folder: 'bcr-management-dashboard', public_id: public_id
            })
            .then(result => {
                res.status(201).json({
                    status: 'Success!',
                    message: 'Image uploaded successfully',
                    url: result.url,
                    public_id: public_id
                })
            })
            .catch(err => {
                res.status(500)
                    .json({
                        status: 'Failed!',
                        message: (err, 'Internal server error')
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

router.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    Car.findOne({
        where: { id: id }
    }).then(car => {
        cloudinary.uploader.destroy(`${CLOUDINARY_DIR}/${car.image_id}`)
    }).then(result => {
        Car.destroy({
            where: { id: id }
        })
            .then(car => {
                if (car) {
                    res.status(200)
                        .json({
                            status: "success",
                            message: `Delete data with id=${carId} successfully`
                        })
                } else {
                    res.status(404)
                        .json({
                            status: "failed",
                            message: `Delete data with id=${carId} failed: data not found`
                        })
                }
            })
            .catch(err => {
                res.status(422)
                    .json({
                        status: "failed",
                        message: `Delete data with id=${carId} failed: ${err.message}`
                    })
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