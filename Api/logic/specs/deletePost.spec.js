require('dotenv').config()

const { expect } = require('chai')
const mongoose = require('mongoose')
const deletePost = require('../deletePost') // Asegúrate de importar la función adecuada
const { User, Post } = require('../../data/models')
const { generateUser, generatePost, cleanUp } = require('../helpers/test')

describe('deletePost', () => {
    let user
    let post

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        await cleanUp()

        user = generateUser.user()
        post = generatePost.post()
        user.saves = [post._id] // Asociar el post al usuario
        await User.create(user)
        await Post.create(post)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should delete a user post successfully', async () => {
        const userId = user._id.toString()
        const postId = post._id.toString()

        let existingUser = await User.findById(userId)
        expect(existingUser).to.exist
        expect(existingUser.saves).to.include(post._id)

        let existingPost = await Post.findById(postId)
        expect(existingPost).to.exist

        await deletePost(userId, postId)

        existingUser = await User.findById(userId)
        expect(existingUser).to.exist
        expect(existingUser.saves).to.not.include(post._id)

        existingPost = await Post.findById(postId)
        expect(existingPost).to.not.exist
    })

    it('should fail on non-existing user', async () => {
        const fakeUserId = mongoose.Types.ObjectId().toString()
        const postId = post._id.toString()

        try {
            await deletePost(fakeUserId, postId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `User with id ${fakeUserId} does not exist!`
            )
        }
    })

    it('should fail on non-existing post', async () => {
        const userId = user._id.toString()
        const fakePostId = mongoose.Types.ObjectId().toString()

        try {
            await deletePost(userId, fakePostId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `Post with id ${fakePostId} does not exist!`
            )
        }
    })

    it('should fail if user is not the author of the post', async () => {
        const otherUser = generateUser.user()
        await User.create(otherUser)

        const userId = otherUser._id.toString()
        const postId = post._id.toString()

        try {
            await deletePost(userId, postId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `User with id ${userId} is not the author of post with id ${postId}`
            )
        }
    })
})
