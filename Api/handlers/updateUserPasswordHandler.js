const { updateUserPassword } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { password, newPassword, newPasswordConfirm } = req.body

    return updateUserPassword(
        userId,
        password,
        newPassword,
        newPasswordConfirm,
        (error) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(201).send()
        }
    )
})
