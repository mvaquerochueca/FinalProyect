require('dotenv').config()
const { expect } = require('chai')
const removeCommentFromPost = require('../removeCommentFromPost')
const { User, Post } = require('../../data/models')
const {
    generateUser,
    generatePost,
    generateComment,
    cleanUp,
} = require('../helpers/test')
const mongoose = require('mongoose')

describe('removeCommentFromPost', () => {
    let user
    let post
    let comment

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        await cleanUp()

        user = generateUser.user()
        post = generatePost.post(user._id)
        comment = generateComment.comment(user._id)

        await User.create(user)
        await Post.create(post)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should successfully delete a comment', async () => {
        post.comments.push(comment)
        await post.save()

        const { userId, postId, commentId } = {
            userId: user._id.toString(),
            postId: post._id.toString(),
            commentId: post.comments[0].id,
        }

        await removeCommentFromPost(userId, postId, commentId)

        const updatedPost = await Post.findById(postId)

        expect(updatedPost).to.exist
        expect(updatedPost.comments).to.be.an('array')
        expect(updatedPost.comments).to.be.empty
    })

    it('should fail on deleting non-existing comment', async () => {
        const fakeCommentId = new mongoose.Types.ObjectId().toString()

        try {
            await removeCommentFromPost(
                user._id.toString(),
                post._id.toString(),
                fakeCommentId
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `Comment with id ${fakeCommentId} not found in post with id ${post._id}`
            )
        }
    })

    it('should fail on deleting comment by non-author user', async () => {
        const otherUser = generateUser.user()
        await User.create(otherUser)

        post.comments.push(comment)
        await post.save()

        try {
            await removeCommentFromPost(
                otherUser._id.toString(),
                post._id.toString(),
                comment.id
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `User with id ${otherUser._id.toString()} is not the author of comment with id ${
                    comment.id
                }`
            )
        }
    })

    it('should fail on deleting comment in non-existing post', async () => {
        const fakePostId = new mongoose.Types.ObjectId().toString()

        try {
            await removeCommentFromPost(
                user._id.toString(),
                fakePostId,
                comment.id
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Post with id not found`)
        }
    })

    // Agrega más casos de prueba según tus necesidades para cubrir otros escenarios.
})
