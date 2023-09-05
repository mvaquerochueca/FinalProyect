// import { validateId, validateCallback } from './helpers/validators'
import { savePost, findUserById, findPostById } from '../data'

import { validators } from 'com'

const { validateId, validateCallback } = validators

export default (userId, postId, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    findUserById(userId, (user) => {
        if (!user) {
            callback(new Error(`User with id ${userId} not found`))

            return
        }

        findPostById(postId, (post) => {
            if (!post) {
                callback(new Error(`Post with id ${postId} not found`))

                return
            }

            if (!post.likes) {
                post.likes = [userId]
            } else {
                const index = post.likes.indexOf(userId)

                if (index < 0) post.likes.push(userId)
                else {
                    post.likes.splice(index, 1)

                    if (!post.likes.length) delete post.likes
                }
            }

            savePost(post, () => callback(null))
        })
    })
}
