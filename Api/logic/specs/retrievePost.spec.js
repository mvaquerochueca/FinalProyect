require('dotenv').config()
const { expect } = require('chai')
const retrievePost = require('../retrievePost') // Asegúrate de importar la función adecuada
const { mongoose } = require('mongoose')
const { cleanUp, generateUser, generatePost } = require('../helpers/test')
const { User, Post } = require('../../data/models.js')

describe('retrievePost', () => {
    let user
    let post

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        await cleanUp()

        user = generateUser.user()
        post = generatePost.post(user._id)

        await User.create(user)
        await Post.create(post)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should retrieve a user post successfully', async () => {
        const retrievedPost = await retrievePost(user._id, post._id)

        expect(retrievedPost).to.exist
        // expect(retrievedPost.name).to.equal(post.name)
        // expect(retrievedPost.size).to.equal(post.size)
        // expect(retrievedPost.age).to.equal(post.age)
        // expect(retrievedPost.breed).to.equal(post.breed)
        // expect(retrievedPost.description).to.equal(post.description)
    })

    it('should fail on invalid user id', async () => {
        const wrongId = new mongoose.Types.ObjectId()

        try {
            await retrievePost(wrongId, post._id)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${wrongId} not found`)
        }
    })

    it('should fail on invalid post id', async () => {
        const wrongId = new mongoose.Types.ObjectId()

        try {
            await retrievePost(user._id, wrongId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Post with id ${wrongId} not found`)
        }
    })

    it('should fail when user is not the author of the post', async () => {
        const anotherUser = generateUser.user()
        await User.create(anotherUser)

        try {
            await retrievePost(anotherUser._id, post._id)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `User with id ${anotherUser._id} is not the author of post with id ${post._id}`
            )
        }
    })
})
