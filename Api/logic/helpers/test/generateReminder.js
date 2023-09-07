const { ObjectId } = require('mongodb')

module.exports = {
    reminder: (userId) => ({
        user: userId,
        text: `text-${Math.random()}`,
    }),
}
