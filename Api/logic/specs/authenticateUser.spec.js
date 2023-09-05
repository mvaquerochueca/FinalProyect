require('dotenv').config()
const { expect } = require('chai')
const { describe } = require('mocha')
const { mongoose } = require('mongoose')

const authenticateUser = require('../authenticateUser')
const { generateUser, cleanUp } = require('../helpers/test')

const { User } = require('../../data/models')

describe('authenticateUser', () => {
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

    it('Should succeed on authenticate user', async () => {
        const userId = await authenticateUser(user.email, user.password)
        expect(userId).to.exist
    })

    it('should fails on non-existing user', async () => {
        try {
            await authenticateUser('wrong@email.com', user.password)
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('User not found')
        }
    })

    it('should fail on existing user but wrong password', async () => {
        try {
            await authenticateUser(user.email, `wrongPassword-${Math.random()}`)
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal(
                'Password must be at least 8 characters long and contain a special character and a number'
            )
        }
    })
    it('should fail on wrong email', async () => {
        try {
            await authenticateUser(`wrongEmail-${Math.random()}`, user.password)
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('User not found')
        }
    })

    it('should fails on empty email', async () => {
        try {
            await authenticateUser('', user.password)
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('Email is empty')
        }
    })

    it('should fails on empty password', async () => {
        try {
            await authenticateUser(user.email, '')
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('Password is empty')
        }
    })
})
