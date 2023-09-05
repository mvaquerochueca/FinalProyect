const {
    validators: { validateId },
    errors: { ExistenceError },
} = require('com')

const { User, Pet } = require('../data/models.js')

module.exports = (userId) => {
    validateId(userId, 'user id')

    return Promise.all([
        User.findById(userId).lean(),
        Pet.find({ owner: userId }).lean(),
    ]).then(([user, pets]) => {
        if (!user) throw new Error(`User with id ${userId} not found`)
        pets.forEach((pet) => {
            pet.id = pet._id.toString()
            delete pet._id
            delete pet.__v

            // You can add any additional transformations or checks specific to pets here
        })

        return pets
    })
}
