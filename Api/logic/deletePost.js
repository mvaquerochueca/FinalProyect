const { User, Post } = require('../data/models')
const {
    errors: { ExistenceError, PropertyError },
    validators: { validateId },
} = require('com')

module.exports = (userId) => {
    validateId(userId, 'User id')
    validateId(postId, 'Post id')

    return Promise.all([
        User.findById({ _id: userId }),
        Post.findById({ _id: author.id }),
    ]).then(([user, post]) => {
        if (!user) throw new Error(`User with id ${userId} does not exist!`)
        if (!post) throw new Error(`Post with id ${postId} does not exist!`)
        if (post.author.toString() !== userId)
            throw new PropertyError(
                `User with id ${userId} is not the author of post with id ${postId}`
            )

        return User.find().then((users) => {
            users.forEach((user) => {
                users.saves?.splice(
                    (user.saves.findIndex((save) => save === postId), 1)
                )

                return Post.deleteOne({ _id: postId })
            })
        })
    })
}
