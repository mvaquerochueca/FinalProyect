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

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError('User not found!')

        delete user._id
        delete user.__v

        return user
    })()
}
