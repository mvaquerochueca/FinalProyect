// import { validateId, validateCallback } from './helpers/validators'
import { savePost, findUserById, findPostById } from '../data'
import context from './context'

import { validators } from 'com'

const { validateId } = validators

export default (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/${postId}/like`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${context.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            }
        )
        if (res.status === 204) return
        const body = await res.json()
        throw new Error(body.message)
    })()

    // findUserById(userId, (user) => {
    //     if (!user) {
    //         callback(new Error(`User with id ${userId} not found`))

    //         return
    //     }

    //     findPostById(postId, (post) => {
    //         if (!post) {
    //             callback(new Error(`Post with id ${postId} not found`))

    //             return
    //         }

    //         if (!post.likes) {
    //             post.likes = [userId]
    //         } else {
    //             const index = post.likes.indexOf(userId)

    //             if (index < 0) post.likes.push(userId)
    //             else {
    //                 post.likes.splice(index, 1)

    //                 if (!post.likes.length) delete post.likes
    //             }
    //         }

    //         savePost(post, () => callback(null))
    //     })
    // })
}
