require('dotenv').config()

const mongoose = require('mongoose')
const retrievePost = require('./retrievePost')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
        retrievePost('64b7c71774c99de977d39ccc', '64e34ccc4ef2cb57cc0e24f6')
    )
    .then((post) => console.log(post))
    .catch(console.error)
    .finally(() => {
        mongoose.disconnect()
    })
