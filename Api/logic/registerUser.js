const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError },
} = require('com')
const { User } = require('../data/models')

//Registro de usuario con promesas y usando mongo

/**
 * Register a user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 *
 * @returns {Promise<string>} the userId
 *
 * @throws {DuplicityError} On already existing email
 *
 *
 * */

module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            await User.create({ name, email, password, avatar: null, favs: [] })
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError('Email is not valid')

            throw error
        }
    })()
}
