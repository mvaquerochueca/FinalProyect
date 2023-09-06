require('dotenv').config()
const { expect } = require('chai')
const updateUserAvatar = require('../updateUserAvatar')
const { User } = require('../../data/models')
const { generateUser, cleanUp } = require('../helpers/test')
const mongoose = require('mongoose')

describe('updateUserAvatar', () => {
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

    it('should update user avatar successfully', async () => {
        const newAvatarUrl = 'https://example.com/avatar.jpg'

        await updateUserAvatar(user._id.toString(), newAvatarUrl)

        const updatedUser = await User.findById(user._id.toString())

        expect(updatedUser).to.exist
        expect(updatedUser.avatar).to.equal(newAvatarUrl)
    })

    it('should fail on non-existing user', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString()
        const newAvatarUrl = 'https://example.com/avatar.jpg'

        try {
            await updateUserAvatar(fakeId, newAvatarUrl)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('User not found!')
        }
    })

    it('should fail on invalid avatar URL', async () => {
        const newAvatarUrl = 'invalid-url'

        try {
            await updateUserAvatar(user._id.toString(), newAvatarUrl)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('avatar is not a valid URL')
        }
    })

    // Agrega más casos de prueba según sea necesario para cubrir otros escenarios.
})
