import { validators } from 'com'
import context from './context'

const { validateText, validateUrl } = validators

/**
 * Creates a pet
 *
 * @param {string} name The pet's name
 * @param {string} size The pet's size
 * @param {string} age The pet's age
 * @param {string} breed The pet's breed
 * @param {string} description The pet's description
 * @param {string} image The pet's image
 *
 * @returns {Promise<void>} A promise that resolves when the pet is created
 *
 */

export default function (name, size, age, breed, description, image) {
    validateText(name, 'name')
    validateText(size, 'size')
    validateText(age, 'age')
    validateText(breed, 'breed')
    validateText(description, 'description')
    validateUrl(image, 'image')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pets`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                size,
                age,
                breed,
                description,
                image,
            }),
        })
        if (res.status === 201) return
        const body = await res.json()
        throw new Error(body.message)
    })()
}
