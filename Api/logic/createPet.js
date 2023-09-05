const {
    validators: { validateId, validateText, validateUrl },
} = require('com')

const { User, Pet } = require('../data/models')

module.exports = (userId, name, size, age, breed, description, image) => {
    // validateId(userId, 'user id')
    validateText(name, 'name')
    validateText(size, 'size')
    // validateText(age, 'age')
    validateText(breed, 'breed')
    validateText(description, 'description')
    validateUrl(image, 'image')

    return User.findById(userId)
        .then((user) => {
            if (!user) throw new Error(`user with id not found`)

            return Pet.create({
                owner: userId,
                name,
                size,
                age,
                breed,
                description,
                image,
            })
        })

        .then(() => {})
}
