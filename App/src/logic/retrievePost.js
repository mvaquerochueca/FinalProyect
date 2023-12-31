import { validators } from 'com'

const { validateToken, validateId } = validators

export default (token, postId) => {
    validateToken(token)
    validateId(postId, 'Post Id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        if (res.status !== 200)
            return res.json().then(({ error: message }) => {
                throw new Error(message)
            })

        return res.json()
    })
}
