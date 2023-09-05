require('dotenv').config()

const mongoose = require('mongoose')
const addCommentToPost = require('../addCommentToPost.js')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
        addCommentToPost(
            '64b7c71774c99de977d39ccc',
            '64ede639834f1bb8282cdca4',
            'smile again'
        )
    )
    .then(() => console.log('created'))
    .catch(console.error)
    .finally(() => mongoose.disconnect())
