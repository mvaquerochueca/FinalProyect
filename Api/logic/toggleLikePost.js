const {
    validators: { validateId },
} = require('com')

const { User, Post } = require('../data/models')

//TODO: toggle like post
module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new Error(`user with id ${userId} not found`)
            if (!post) throw new Error(`post with id ${postId} not found`)

            post.likes.push(userId)

            return post.save()
        })
        .then(() => {})
}

// module.exports = (userId, postId) => {
//     validateId(userId, 'user id')
//     validateId(postId, 'post id')

//     return Promise.all([User.findById(userId), Post.findById(postId)])
//         .then(([user, post]) => {
//             if (!user) throw new Error(`user with id ${userId} not found`)
//             if (!post) throw new Error(`post with id ${postId} not found`)

//             post.likes.push(userId)

//             return post.save()
//         })
//         .then(() => {})
// }
