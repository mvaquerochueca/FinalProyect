import { savePosts, loadPosts, findUserById, findPostById } from '../data'
import { validators } from 'com'

const { validateId } = validators

export default (userId, postId, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return (async () => {
        const user = await findUserById(userId)
        if (!user) throw new Error(`User with id ${userId} not found`)
        const post = await findPostById(postId)
        if (!post) throw new Error(`Post with id ${postId} not found`)
        if (post.author !== userId)
            throw new Error(
                `Post with id ${postId} does not belong to user with id ${userId}`
            )
        const posts = await loadPosts()
        const index = posts.findIndex((post) => post.id === postId)
        posts.splice(index, 1)
        await savePosts(posts)
        return
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

    //         if (post.author !== userId) {
    //             callback(
    //                 new Error(
    //                     `Post with id ${postId} does not belong to user with id ${userId}`
    //                 )
    //             )

    //             return
    //         }

    //         loadPosts((posts) => {
    //             const index = posts.findIndex((post) => post.id === postId)

    //             posts.splice(index, 1)

    //             savePosts(posts, () => callback(null))
    //         })
    //     })
    // })
}
