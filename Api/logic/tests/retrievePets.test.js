require('dotenv').config()

const mongoose = require('mongoose')
const retrievePets = require('./retrievePets')

mongoose
    .connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => retrievePets('64b7c71774c99de977d39ccc'))
    .then((pets) => console.log(pets))
    .catch(console.error)
    .finally(mongoose.disconnect)
