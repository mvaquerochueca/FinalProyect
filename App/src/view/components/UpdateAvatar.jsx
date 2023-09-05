import index from '../../logic'
import { useAppContext } from '../hooks'
import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/ButtonForm'

const { updateUserAvatar, context } = index

export default function UpdateAvatar({ onUserAvatarUpdated }) {
    const { Toaster, toast } = useAppContext()

    const handleUpdateAvatar = (event) => {
        event.preventDefault()
        debugger
        const url = event.target.url.value

        try {
            updateUserAvatar(context.token, url)
                .then(() => {
                    onUserAvatarUpdated()
                })
                .catch((error) => toast(error.message))
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <section>
            <Container tag="div">
                <Form onSubmit={handleUpdateAvatar}>
                    <span className="text-center text-xl mt-4">
                        Update avatar
                    </span>
                    <Input type="url" name="url" placeholder="Url" />
                    <Button type="submit" className="mb-4">
                        Update
                    </Button>
                </Form>
                <Toaster />
            </Container>
        </section>
    )
}
