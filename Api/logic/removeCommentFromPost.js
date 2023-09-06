const {
    validators: { validateId },
} = require('com')
const { User, Post, Comment } = require('../data/models')

module.exports = (userId, postId, commentId) => {
    validateId(userId, 'User id')
    validateId(postId, 'Post id')
    validateId(commentId, 'Comment id')

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new Error(`User with id ${userId} not found`)
            if (!post) throw new Error(`Post with id not found`)

            const index = post.comments.findIndex(
                (comment) => comment.id === commentId
            )

            if (index < 0)
                throw new Error(
                    `Comment with id ${commentId} not found in post with id ${postId}`
                )

            const comment = post.comments[index]

            if (comment.author.toString() !== userId)
                throw new Error(
                    `User with id ${userId} is not the author of comment with id ${commentId}`
                )

            post.comments.splice(index, 1)

            return post.save()
        })
        .then(() => {})
}
