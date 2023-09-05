require('dotenv').config()

const mongoose = require('mongoose')
const retrievePet = require('./retrievePet')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
        retrievePet('64e6f35ce0e3c04c865fb74b', '64e7b1af2a6f9fbfa9f29009')
    )
    .then((pet) => console.log(pet))
    .catch(console.error)
    .finally(() => {
        mongoose.disconnect()
    })
