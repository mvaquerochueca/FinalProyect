require('dotenv').config()

const mongoose = require('mongoose')
const createPet = require('../createPet.js')

mongoose
    .connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() =>
        createPet(
            '64e6f35ce0e3c04c865fb74b',
            'Sally',
            'Small',
            '3',
            'Bichon maltes',
            'Very cute',
            'https://i.imgur.com/IlMXGoI.jpg'
        )
    )
    .then((result) => console.log('created'))
    .catch(console.error)
    .finally(mongoose.disconnect)
