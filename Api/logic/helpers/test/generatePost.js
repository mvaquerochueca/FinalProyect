const { ObjectId } = require('mongodb')

module.exports = {
    post: (userId) => ({
        author: userId,
        _id: new ObjectId(),
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date(),
        location: `location-${Math.random()}`,
        likes: [],
    }),
}
