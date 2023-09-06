require('dotenv').config()
const { expect } = require('chai')
const retrievePosts = require('../retrievePosts')
const { User, Post } = require('../../data/models')
const { generateUser, generatePost, cleanUp } = require('../helpers/test')
const mongoose = require('mongoose')

describe('retrievePosts', () => {
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

    it('should successfully retrieve user feed', async () => {
        const postsCount = 5

        for (let i = 0; i < postsCount; i++) {
            const post = generatePost.post(user._id)
            await Post.create(post)
        }

        const userFeed = await retrievePosts(user._id.toString())

        expect(userFeed).to.exist
        expect(userFeed).to.be.an('array')
        expect(userFeed).to.have.lengthOf(postsCount)

        userFeed.forEach((post) => {
            expect(post).to.have.property('id')
            expect(post).to.have.property('text')
            expect(post).to.have.property('image')
            expect(post).to.have.property('date')
            expect(post).to.have.property('fav')
            expect(post).to.have.property('author')
            expect(post.author).to.have.property('id')
            expect(post.author).to.have.property('name')
            expect(post.author).to.have.property('avatar')
            expect(post).to.have.property('comments')
            expect(post.comments).to.be.an('array')
        })
    })

    it('should fail on retrieving user feed for non-existing user', async () => {
        const fakeUserId = new mongoose.Types.ObjectId().toString()

        try {
            await retrievePosts(fakeUserId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `user with id ${fakeUserId} not found`
            )
        }
    })

    // Agrega más casos de prueba según sea necesario para cubrir otros escenarios.
})
