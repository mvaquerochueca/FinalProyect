import { validators } from 'com'
import context from './context'

const { validateText, validateId } = validators

export default function (userId, text, date) {
    validateId(userId, 'user id')
    validateText(text, 'text')
    validateText(date, 'date')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/reminders`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                date,
            }),
        })
        if (res.status === 201) return
        const body = await res.json()
        throw new Error(body.message)
    })()
}
