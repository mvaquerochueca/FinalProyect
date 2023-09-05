const { ObjectId } = require('mongodb')

module.exports = {
    user: () => ({
        _id: ObjectId(),
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}`,
        password: `password-${Math.random()}`,
        avatar: null,
        favs: [],
    }),
}
