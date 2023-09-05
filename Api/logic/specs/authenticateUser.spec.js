require('dotenv').config()
const { expect } = require('chai')
const authenticateUser = require('../authenticateUser')
const { mongoose } = require('mongoose')
const { generate, cleanUp } = require('../helpers/test')
const { User } = require('../../data/models')

describe('authenticateUser', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        user = generate.user()

        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it(' succeed on authenticate user', async () => {
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: null,
            favs: [],
        })

        const userId = await authenticateUser(user.email, user.password)

        expect(userId).to.exist
        expect(userId).to.be.a('string')
    })

    it('should fails on non-existing user', async () => {
        try {
            await authenticateUser(user.email, user.password)
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('User not found')
        }
    })

    it('should fail on existing user but wrong password', async () => {
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: null,
            favs: [],
        })

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
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: null,
            favs: [],
        })

        try {
            await authenticateUser(`wrongEmail-${Math.random()}`, user.password)
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('User not found')
        }
    })

    it('should fails on empty email', async () => {
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: null,
            favs: [],
        })

        try {
            await authenticateUser('', user.password)
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('Email is empty')
        }
    })

    it('should fails on empty password', async () => {
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: null,
            favs: [],
        })

        try {
            await authenticateUser(user.email, '')
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('Password is empty')
        }
    })
})
