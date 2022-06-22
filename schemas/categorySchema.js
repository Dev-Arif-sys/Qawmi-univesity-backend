const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = mongoose.Schema({
    category: String,
});

module.exports = categorySchema;