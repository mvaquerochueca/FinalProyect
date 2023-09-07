const { newReminder } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { text, date } = req.body

    return newReminder(userId, text, date).then(() => res.status(201).send())
})
