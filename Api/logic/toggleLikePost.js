const {
    validators: { validateId },
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return async () => {
        // return Promise.all([User.findById(userId), Post.findById(postId)])
        //     .then(([user, post]) => {
        //         if (!user) throw new Error(`user with id not found`)
        //         if (!post) throw new Error(`post with id not found`)
        //         post.likes.push(userId)
        //         return post.save()
        //     })
        //     .then(() => {})
    }
}
