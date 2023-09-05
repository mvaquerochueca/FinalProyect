import { validators } from 'com'
import context from './context'

const { validateUrl, validateText } = validators

/**
 * Creates a post
 *
 * @param {string} image The post's image
 * @param {string} text The post's text
 * @param {string} location The post's location
 *
 * @returns {Promise<void>} A promise that resolves when the post is created
 *
 * @throws {Error} If any param is not a valid url or text
 * @throws {Error} If there's no token in context
 * @throws {Error} If there's a server error
 *
 */

export default function (image, text, location) {
    validateUrl(image, 'image url')
    validateUrl(location, 'location url')
    validateText(text)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image, text, location }),
        })
        if (res.status === 201) return
        const body = await res.json()
        throw new Error(body.message)
    })()
}
