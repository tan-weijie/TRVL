const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
    {
        _id: {type: String, required:true},
        country: {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        interests: [
            {
                name: String,
                startTime: Date,
                endTime: Date,
                transport: String
            }
        ]

    },
    {
        collection: 'trips'
    }
)

const tripModel = mongoose.model('tripModel', tripSchema);

module.exports = tripModel;