const {
    validators: { validateId, validateText },
} = require('com')

const { User, Reminder } = require('../data/models')

module.exports = (userId, text, date) => {
    // validateId(userId, 'user id')
    validateText(text, 'text')
    // validateText(date, 'date')

    return User.findById(userId)
        .then((user) => {
            if (!user) throw new Error(`user with id not found`)

            return Reminder.create({
                user: userId,
                text,
                date: new Date(),
            })
        })

        .then(() => {})
}
