const express = require('express');
const router = express.Router();
const Cars = require('./carDb');

router.get('/', (req, res) => {
    Cars.getCars()
    .then(cars => {
        res.status(201).json(cars);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', validateId, (req, res) => {
    Cars.getById(req.params.id)
    .then(car => {
        res.status(201).json(car);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', validateCar, validateExistingId, (req, res) => {
    Cars.insert({
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage
    })
    .then(newCar => {
        res.status(201).json(newCar);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

function validateCar(req, res, next){
    if(req.body.vin && req.body.make && req.body.model && req.body.mileage){
        next();
    }else{
        res.status(400).json({ message: 'Missing fields' });
    }
}

function validateId(req, res, next){
    Cars.getById(req.params.id)
    .then(car => {
        if(car){
            next();
        }else{
            res.status(404).json({ message: 'Does not exist' });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

function validateExistingId(req, res, next){
    Cars.getByVin(req.body.vin)
    .then(car => {
        if(car.length > 0){
            res.status(400).json({ message: 'VIN already exists', car: car })
        }else{
            next();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

module.exports = router;