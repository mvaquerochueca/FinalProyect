require('dotenv').config()
const { expect } = require('chai')
const { describe } = require('mocha')
const registerUser = require('../registerUser')
const { mongoose } = require('mongoose')
const { generateUser, cleanUp } = require('../helpers/test')
const { User } = require('../../data/models')

describe('registerUser', () => {
    let user
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        user = generateUser.user()

        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should succeed on register user', async () => {
        await registerUser(user.name, user.email, user.password)

        const userRegistered = await User.findOne({ email: user.email })

        expect(userRegistered).to.exist
        expect(userRegistered.name).to.equal(user.name)
        expect(userRegistered.email).to.equal(user.email)
        expect(userRegistered.password).to.equal(user.password)
        expect(userRegistered.avatar).to.be.null
    })

    it('faisl on already existing user', async () => {
        User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: null,
            favs: [],
        })

        try {
            await registerUser(
                user.name,
                user.email,
                user.password,
                user.passwordConfirm
            )
        } catch (error) {
            expect(error).to.instanceOf(Error)
            expect(error.message).to.equal('Email is not valid')
        }
    })

    it('fails on empty name', () => {
        expect(() =>
            registerUser('', user.email, user.password, user.password, () => {})
        ).to.throw(Error, 'Name is empty')
    })

    it('fails on undefined name', () => {
        expect(() =>
            registerUser(undefined, user.email, user.password, () => {})
        ).to.throw(Error, 'Name is not a string')
    })

    it('fails on empty email', () => {
        expect(() =>
            registerUser(user.name, '', user.password, user.password, () => {})
        ).to.throw(Error, 'Email is empty')
    })

    it('fails on undefined email', () => {
        expect(() =>
            registerUser(user.name, undefined, user.password, () => {})
        ).to.throw(Error, 'Email is not a string')
    })

    it('fails on empty password', () => {
        expect(() =>
            registerUser(user.name, user.email, '', user.password, () => {})
        ).to.throw(Error, 'Password is empty')
    })

    it('fails on undefined password', () => {
        expect(() =>
            registerUser(user.name, user.email, undefined, () => {})
        ).to.throw(Error, 'Password is not a string')
    })
})
