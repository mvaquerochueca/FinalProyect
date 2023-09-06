const {
    validators: { validateId, validatePassword },
} = require('com')
const { User } = require('../data/models')

module.exports = (
    userId,
    previousPassword,
    newPassword,
    newPasswordConfirm
) => {
    validateId(userId)
    validatePassword(previousPassword)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirm)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new Error('User not found!')
        if (newPassword !== newPasswordConfirm)
            throw new Error('Passwords do not match!')
        if (previousPassword === newPassword)
            throw new Error(
                'New password cannot be the same as the previous one!'
            )
        if (previousPassword === newPasswordConfirm)
            throw new Error(
                'New password cannot be the same as the previous one!'
            )
        if (user.password !== previousPassword)
            throw new Error('Previous password is incorrect!')

        await user.updateOne({ password: newPassword })
    })()
}
