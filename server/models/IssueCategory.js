const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueCategorySchema = new Schema({
    name: String,
    department: String
});

module.exports = mongoose.model('IssueCategory', IssueCategorySchema);