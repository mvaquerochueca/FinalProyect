const {
    DuplicityError,
    ContentError,
    RangeError,
    ExistenceError,
    AuthError,
    TypeError,
    PropertyError,
} = require('./errors')
const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/i

function validateEmail(email, explain = 'Email') {
    if (typeof email !== 'string')
        throw new TypeError(`${explain} is not a string`)
    if (!email.trim().length) throw new ContentError(`${explain} is empty`)
    // if (!EMAIL_REGEX.test(email))
    //     throw new ContentError(`${explain} is not valid`)
}

const PASSWORD_REGEX =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])[a-zA-Z\d-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{9,}$/

function validatePassword(password, explain = 'Password') {
    if (typeof password !== 'string') {
        throw new TypeError(`${explain} is not a string`)
    }
    if (!password) {
        throw new RangeError(`${explain} is empty`)
    }
    if (!PASSWORD_REGEX.test(password)) {
        throw new ContentError(
            `${explain} must be at least 8 characters long and contain a special character and a number`
        )
    }
}

// const NAME_REGEX = /^[a-z0-9._-]{3,30}$/

// function validateName(name, explain = 'Name') {
//     if (typeof name !== 'string')
//         throw new TypeError(`${explain} is not a string`)
//     if (!name.trim().length) throw new ContentError(`${explain} is empty`)
//     if (name.trim().length < 2)
//         throw new ContentError(`${explain} is too short`)
//     // if (!NAME_REGEX.test(name)) {
//     //     throw new ContentError(`${explain} cannot contain numbers`)
//     // }
// }

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('Name is not a string')
    if (!name.trim().length) throw new ContentError('Name is empty')
}

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i

function validateUrl(url, explain = 'Url') {
    if (typeof url !== 'string')
        throw new TypeError(`${explain} is not a string`)
    if (!url.trim().length) throw new ContentError(`${explain} is empty`)
    // if (!URL_REGEX.test(url)) throw new ContentError(`${explain} is not valid`)
}

const ID_REGEX = /^[0-9a-fA-F]{24}$/

function validateId(id, explain = 'Id') {
    if (typeof id !== 'string')
        throw new TypeError(`${explain} is not a string`)
    if (id.trim().length !== 24)
        throw new ContentError(`${explain} length is not 24 characters`)
    if (!ID_REGEX.test(id))
        throw new ContentError(`${explain} is not hexadecimal`)
}

function validateText(text, explain = 'Text') {
    if (typeof text !== 'string')
        throw new TypeError(`${explain} is not a string`)
    if (!text.trim().length) throw new ContentError(`${explain} is empty`)
}
function validateCallback(callback, explain = 'Callback') {
    if (typeof callback !== 'function')
        throw new Error(`${explain} is not a function`)
}

function validateToken(token, explain = 'Token') {
    if (typeof token !== 'string')
        throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3)
        throw new Error(`${explain} is not valid`)
}

module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateUrl,
    validateId,
    validateText,
    validateCallback,
    validateToken,
}
