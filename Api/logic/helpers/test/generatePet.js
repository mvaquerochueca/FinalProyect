const { ObjectId } = require('mongodb')

module.exports = {
    pet: (userId) => ({
        owner: userId,
        _id: ObjectId(),
        name: `name-${Math.random()}`,
        size: `size-${Math.random()}`,
        age: Math.random(),
        breed: `breed-${Math.random()}`,
        description: `description`,
        image: `image-${Math.random()}`,
    }),
}
