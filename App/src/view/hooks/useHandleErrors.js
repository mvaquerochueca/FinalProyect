import { useAppContext } from '.'
import { errors } from 'com'

const { DuplicityError, ExistenceError, AuthError, ContentError } = errors

export default () => {
    const { alert, toast } = useAppContext()

    return (callback) => {
        try {
            const promise = callback()

            ;(async () => {
                try {
                    await promise
                } catch (error) {
                    console.log('Error')
                    showError(error, toast)
                }
            })()
        } catch (error) {
            console.log('Error')

            showError(error, toast)
        }
    }
}

function showError(error, toast) {
    if (error instanceof DuplicityError) toast(error.message, 'error')
    else if (error instanceof ExistenceError) toast(error.message, 'warn')
    else if (error instanceof AuthError) toast(error.message, 'error')
    else if (error instanceof TypeError) toast(error.message, 'warn')
    else if (error instanceof ContentError) toast(error.message, 'warn')
    else if (error instanceof RangeError) toast(error.message, 'error')
    else toast(error.message, 'error')
}
