const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
    {
        _id: {type: String, required:true},
        country: {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        userId: {type: String},
        days: [ 
            {
                date: String,
                activities: [
                    {
                        name: {type: String,},
                        startTime: String,
                        endTime: String,
                        transport: String
                    },
                ]
            }
        ]
    },
    {
        collection: 'trips'
    }
)

const tripModel = mongoose.model('tripModel', tripSchema);

module.exports = tripModel;

