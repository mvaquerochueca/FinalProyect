const { ObjectId } = require('mongodb')

module.exports = {
    comment: (userId) => ({
        author: userId,
        text: `text-${Math.random()}`,
    }),
}
