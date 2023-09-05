const {
    validators: { validateId },
    errors: { ExistenceError },
} = require('com')
const { User, Pet } = require('../data/models')

module.exports = (userId, petId) => {
    validateId(userId, 'User id')
    validateId(petId, 'Pet id')

    //return pet an user owner of pet

    return (async () => {
        const pet = await Pet.findById(petId).lean()
        const user = await User.findById(userId, 'name').lean()

        if (!pet) throw new ExistenceError(`Pet with ${petId} not found!`)
        if (!user) throw new ExistenceError(`User with ${userId} not found!`)

        if (pet.owner.toString() !== userId)
            throw new Error(
                `User with ${userId} is not the owner of pet with ${petId}`
            )

        // sanitize

        delete pet._id
        delete pet.__v

        return { pet }
    })()
}
