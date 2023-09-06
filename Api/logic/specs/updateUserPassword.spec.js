require('dotenv').config()
const { expect } = require('chai')
const updateUserPassword = require('../updateUserPassword')
const { User } = require('../../data/models')
const { generateUser, cleanUp } = require('../helpers/test')
const mongoose = require('mongoose')
const {
    errors: { ExistenceError, AuthError },
} = require('com')
describe('updateUserPassword', () => {
    let user

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        await cleanUp()

        user = generateUser.user()
        await User.create(user)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should update user password successfully', async () => {
        const newPassword = 'new-password1.'

        await updateUserPassword(
            user._id.toString(),
            user.password,
            newPassword,
            newPassword
        )

        const updatedUser = await User.findById(user._id.toString())

        expect(updatedUser).to.exist
        expect(updatedUser.password).to.equal(newPassword)
    })

    it('should fail on non-existing user', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString()
        const newPassword = 'new-password1.'

        try {
            await updateUserPassword(
                fakeId,
                user.password,
                newPassword,
                newPassword
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('User not found!')
        }
    })

    it('should fail on incorrect previous password', async () => {
        const newPassword = 'new-password1.'

        try {
            await updateUserPassword(
                user._id.toString(),
                'incorrect-password',
                newPassword,
                newPassword
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                'Password must be at least 8 characters long and contain a special character and a number'
            )
        }
    })

    it('should fail when new password does not match new password confirmation', async () => {
        try {
            await updateUserPassword(
                user._id.toString(),
                user.password,
                'new-password',
                'different-password'
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                'Password must be at least 8 characters long and contain a special character and a number'
            )
        }
    })

    it('should fail when new password is the same as the previous one', async () => {
        try {
            await updateUserPassword(
                user._id.toString(),
                user.password,
                user.password,
                user.password
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                'New password cannot be the same as the previous one!'
            )
        }
    })

    // Agrega más casos de prueba según sea necesario para cubrir otros escenarios.
})
