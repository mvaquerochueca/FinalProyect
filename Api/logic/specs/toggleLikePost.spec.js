require('dotenv').config()
const { expect } = require('chai')
const toggleLikePost = require('../toggleLikePost')
const { User, Post } = require('../../data/models')
const { generateUser, generatePost, cleanUp } = require('../helpers/test')
const mongoose = require('mongoose')

describe('toggleLikePost', () => {
    let user
    let post

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        await cleanUp()

        // user = generateUser.user()
        // post = generatePost.post()

        // await User.create(user)
        // await Post.create(post)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should successfully like a post', async () => {
        const user = await User.create(generateUser.user())
        const post = await Post.create(generatePost.post())

        await toggleLikePost(user._id.toString(), post._id.toString())

        const updatedPost = await Post.findById(post._id())

        expect(updatedPost).to.exist
        expect(updatedPost.likes).to.be.an('array')
        expect(updatedPost.likes).to.include(user._id.toString())
    })

    it('should fail on liking a post that does not exist', async () => {
        const fakePostId = new mongoose.Types.ObjectId().toString()

        try {
            await toggleLikePost(user._id.toString(), fakePostId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`post with id not found`)
        }
    })

    it('should fail on liking a post with a non-existing user', async () => {
        const fakeUserId = new mongoose.Types.ObjectId().toString()

        try {
            await toggleLikePost(fakeUserId, post._id.toString())
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id not found`)
        }
    })

    // Agrega más casos de prueba según sea necesario para cubrir otros escenarios.
})
