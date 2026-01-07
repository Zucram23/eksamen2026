const mongoose = require ("mongoose")

async function connectDB () {
    const uri = "mongodb://localhost:27017/FitnessDB";
    await mongoose.connect(uri, {
            autoIndex: true,
        })
    console.log("MongoDB Connected!")
}
module.exports = {connectDB};