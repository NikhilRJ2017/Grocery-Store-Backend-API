const mongoose = require('mongoose');
const connectdb = (dbURL)=>{
    return mongoose.connect(dbURL)
}
module.exports = connectdb;