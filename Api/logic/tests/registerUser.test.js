require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../data/models.js')
const registerUser = require('./registerUser.js')

// mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
//     .then(() => registerUser('Hola', 'john@doe.com', 'Cantinflas.1'))
//     .catch((error) => console.error(error))
//     .finally(() => mongoose.disconnect())
;(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        await Promise.all([User.deleteMany(), Post.deleteMany()])

        await registerUser('Henry Cavil', 'henry@cavil.com', 'Cantinflas.1')
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()
