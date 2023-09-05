import { validators } from 'com'
import context from './context'

const { validateId, validateCallback, validatePassword } = validators

export default (
    userId,
    password,
    newPassword,
    newPasswordConfirm,
    callback
) => {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')
    validateCallback(callback)

    return (async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/users/password/${userId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${context.token}`,
                },
                body: JSON.stringify({
                    password,
                    newPassword,
                    newPasswordConfirm,
                }),
            }
        )
        if (res.status === 204) return
        const body = await res.json()
        throw new Error(body.message)
    })()

    //     const xhr = new XMLHttpRequest()

    //     xhr.onload = () => {
    //         const { status } = xhr

    //         if (status !== 201) {
    //             const { response: json } = xhr
    //             const { error } = JSON.parse(json)

    //             callback(new Error(error))

    //             return
    //         }

    //         callback(null)
    //     }

    //     xhr.onerror = () => {
    //         callback(new Error('connection error'))
    //     }

    //     xhr.open(
    //         'PATCH',
    //         `${import.meta.env.VITE_API_URL}/users/password/${userId}`
    //     )

    //     xhr.setRequestHeader('Content-Type', 'application/json')

    //     xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    //     const data = { password, newPassword, newPasswordConfirm }
    //     const json = JSON.stringify(data)

    //     xhr.send(json)
    // }
}
