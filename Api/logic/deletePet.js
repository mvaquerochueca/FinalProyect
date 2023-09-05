const { User, Pet } = require('../data/models')
const {
    errors: { ExistenceError, PropertyError },
    validators: { validateId },
} = require('com')

module.exports = async (userId, petId) => {
    try {
        validateId(userId, 'User id')
        validateId(petId, 'Pet id')

        const user = await User.findById(userId)
        const pet = await Pet.findById(petId)

        if (!user) {
            throw new ExistenceError(`User with id ${userId} does not exist!`)
        }
        if (!pet) {
            throw new ExistenceError(`Pet with id ${petId} does not exist!`)
        }
        if (pet.owner.toString() !== userId) {
            throw new PropertyError(
                `User with id ${userId} is not the owner of pet with id ${petId}`
            )
        }

        // Ensure user.pets exists and is an array
        user.pets = user.pets || []

        // Remove the pet from the user's pets array
        user.pets = user.pets.filter(
            (userPetId) => userPetId.toString() !== petId
        )
        await user.save()

        // Delete the pet from the database
        await Pet.findByIdAndDelete(petId)

        return true // Indicate success
    } catch (error) {
        throw error // Rethrow the error for handling upstream
    }
}
