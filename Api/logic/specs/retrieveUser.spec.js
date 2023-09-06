require('dotenv').config()
const { expect } = require('chai')
const retrieveUser = require('../retrieveUser')
const { User } = require('../../data/models')
const { generateUser, cleanUp } = require('../helpers/test')
const { mongoose } = require('mongoose')

describe('retrieveUser', () => {
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

    it('should retrieve a user by ID', async () => {
        const retrievedUser = await retrieveUser(user._id.toString())

        // Realizar las expectativas
        expect(retrievedUser).to.exist
        expect(retrievedUser.name).to.equal(user.name)
        expect(retrievedUser.email).to.equal(user.email)
        // Agrega más expectativas según tus necesidades.
    })

    it('should fail on non-existing user', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString()

        try {
            await retrieveUser(fakeId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('User not found!')
        }
    })
})
