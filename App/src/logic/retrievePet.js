import { validators } from 'com'
import context from './context'

const { validateToken, validateId } = validators

export default (token, petId) => {
    validateToken(token)
    validateId(petId, 'Pet Id')

    return (async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/pets/${petId}`,
            {
                headers: {
                    Authorization: `Bearer ${context.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    size,
                    age,
                    breed,
                    owner,
                    description,
                }),
            }
        )
        if (res.status !== 200) {
            const { error: message } = await res.json()
            throw new Error(message)
        }
        return await res.json()
    })()
}
