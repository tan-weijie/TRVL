// dependencies
const express = require('express');
const app = express();

// db
const connectDB = require('./models/db');
const tripModel = require('./models/Trip');
connectDB()

// Body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Get all trips
app.get('/', async (req, res) => {
    try {
        const data = await tripModel.find();
        res.send(data);
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// Get 1 trip 
app.get('/trip', async (req, res) => {
    try {
        const data = await tripModel.find({_id: req.body});
        res.send(data);
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// Create 1 trip
app.post('/', async (req, res) => {
    try {
        const data = await tripModel.create(req.body);
        res.send('added new trip')
        console.log({status: 'ok', msg: 'added new trip'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})

// Delete 1 trip
app.delete('/:id', async (req, res) => {
    try {
        await tripModel.deleteOne({_id: req.params.id}, req.body)
        res.send('deleted')
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})

// Update 1 trip
app.put('/:id', async (req, res) => {
    try {
        const data = await tripModel.findOneAndUpdate({_id: req.params.id}, req.body)
        res.send(data)
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})

// add interest
app.put('/:id/interest', async (req, res) => {
    try {
        const data = await tripModel.findOneAndUpdate({_id: req.params.id}, {$set: {}})
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server connect on port ${PORT}`);
})