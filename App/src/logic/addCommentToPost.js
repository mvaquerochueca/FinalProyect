import { validators } from 'com'
import context from './context'

const { validateId, validateText } = validators

/**
 * Adds a comment to a post
 *
 * @param {string} userId The user's id
 * @param {string} postId The post's id
 * @param {string} text The comment's text
 *
 * @returns {Promise<void>} A promise that resolves when the comment is added
 *
 *
 * @throws {Error} If any param is not a valid id or text
 * @throws {Error} If there's no token in context
 * @throws {Error} If there's a server error
 *
 */

export default function (userId, postId, text) {
    validateId(userId)
    validateId(postId)
    validateText(text)

    return fetch(
        `${
            import.meta.env.VITE_API_URL
        }/users/${userId}/posts/${postId}/comments`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        }
    ).then((res) => {
        if (res.status === 201) return
        return res.json().then((body) => {
            throw new Error(body.message)
        })
    })
}
