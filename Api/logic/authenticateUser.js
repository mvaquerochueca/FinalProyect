const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError },
} = require('com')
const { User } = require('../data/models')

/**
 *Authenticate a user against his/her credentials
 * @param {string} email
 * @param {string} password
 *
 * @returns {Promise<string>} the userId
 *
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty or blanck email or password
 * @throws {AuthError} On wrong credentials
 * @throws {ExistenceError} On non-existing user
 * @throws {RangeError} On password lenght not between 8 and 16 characters
 **/

module.exports = function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new ExistenceError('User not found')

        if (user.password !== password)
            throw new AuthError(
                'Password must be at least 8 characters long and contain a special character and a number'
            )

        return user.id
    })()
}
