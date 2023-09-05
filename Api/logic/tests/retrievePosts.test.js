require('dotenv').config()

const mongoose = require('mongoose')
const retrievePosts = require('./retrievePosts')

mongoose
    .connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => retrievePosts('64b7c71774c99de977d39ccc'))
    .then((posts) => console.log(posts))
    .catch(console.error)
    .finally(mongoose.disconnect)
