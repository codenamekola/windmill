const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name:String,
    issueReported:String,
    issue_categoryId:String
});

module.exports = mongoose.model('Customer',CustomerSchema);