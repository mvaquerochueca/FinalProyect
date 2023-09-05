require('dotenv').config()

const mongoose = require('mongoose')
const removeCommentFromPost = require('./removeCommentFromPost.js')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
        removeCommentFromPost(
            '64b3cc960bb4286b3db03b96',
            '64b3cd07ebd2236834d348db',
            '64b3d1206585a5e60953538c'
        )
    )
    .then(() => console.log('remove'))
    .catch(console.error)
    .finally(() => mongoose.disconnect())
