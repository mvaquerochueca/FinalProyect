const { ObjectId } = require('mongodb')

module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}`,
        password: `password-${Math.random()}`,
        avatar: null,
        favs: [],
    }),

    post: (userId) => ({
        author: userId,
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date(),
        location: `location-${Math.random()}`,
    }),
}
