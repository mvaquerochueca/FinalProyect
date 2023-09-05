const {
    validators: { validateId },
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    // validateId(userId, 'User Id')
    // validateId(postId, 'Post Id')

    return Promise.all([
        User.findById(userId, '-__v').lean(),
        Post.findById(postId, '-_id -__v -date -likes -paymentMethods').lean(),
    ]).then(([user, post]) => {
        if (!user) throw new Error(`User with id ${userId} not found`)
        if (!post) throw new Error(`Post with id ${postId} not found`)

        if (post.author.toString() !== userId)
            throw new Error(
                `User with id ${userId} is not the author of post with id ${postId}`
            )

        delete post.author

        return post
    })
}
