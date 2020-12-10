const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CareerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    // stored as key: value pair eg. year: [hex colors]
    colors: {
        type: Object,
        required: true
    },

    metrics: {
        type: Object,
        required: true
    }
});

// const CareerModel = mongoose.model('career', CareerSchema)

module.exports = Career = mongoose.model('Career', CareerSchema);