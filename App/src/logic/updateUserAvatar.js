import { validators } from 'com'
import context from './context'

const { validateId, validateUrl } = validators

export default (userId, avatar) => {
    validateId(userId, 'User id')
    validateUrl(avatar, 'Avatar url')

    return (async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${userId}/avatar`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${context.token}`,
                },
                body: JSON.stringify({ avatar }),
            }
        )
        if (res.status === 204) return
        const body = await res.json()
        throw new Error(body.message)
    })()

    // return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/avatar`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },

    //     body: JSON.stringify({ avatar }),
    // }).then((res) => {
    //     if (res.status === 200) return res.json()
    //     return res.json().then((body) => {
    //         throw new Error(body.message)
    //     })
    // })
}
