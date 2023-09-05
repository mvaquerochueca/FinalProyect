const {
    validators: { validateId },
    errors: { ExistenceError },
} = require('com')
const { User } = require('../data/models')

/**
 * Retrieves a user by id
 *
 * @param {string} userId ...
 * @returns {Promise<Object>} ...
 *
 * @throws {ExistenceError} On non-existing user
 * @throws {TypeError} On non-string userId
 * @throws {ContentError} On empty or blanck userId
 *
 */
module.exports = (userId) => {
    validateId(userId, 'User id')

    // return User.findById(userId)
    //     .lean()
    //     .then((user) => {
    //         if (!user) throw new ExistenceError('User not found!')

    //         // sanitize

    //         const { name, avatar, favs } = user

    //         delete user._id
    //         delete user.password

    //         return { name, avatar, favs }
    //     })

    //Arriba es lo mismo que abajo, pero abajo es con async await

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError('User not found!')

        // sanitize

        delete user._id
        delete user.__v

        return user
    })()
}
