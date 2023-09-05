const { updateUserAvatar } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { avatar } = req.body

    return updateUserAvatar(userId, avatar, (error) => {
        if (error) {
            res.status(400).json({ error: error.message })

            return
        }

        res.status(204).send()
    })
})
