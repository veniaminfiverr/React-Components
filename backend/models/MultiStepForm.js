const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MultiStepFormSchema = new Schema({
    firstName:{ type: String},
    lastName:{ type: String},
    nickName: { type: String},
    emailAddress: { type: String},
    phoneNumber: { type: String},
    alternatePhone: { type: String},
    address: { type: String},
    country: { type: String },
    city: { type: String},
});

module.exports = mongoose.model('MultiStepForm', MultiStepFormSchema);
