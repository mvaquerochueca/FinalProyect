require('dotenv').config()

const mongoose = require('mongoose')
const deletePet = require('../deletePet.js')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
        deletePet('64e6f35ce0e3c04c865fb74b', '64eb0f8e975b7be75ee41d66')
    )
    .then(() => console.log('remove'))
    .catch(console.error)
    .finally(() => mongoose.disconnect())
