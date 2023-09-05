import index from '../../logic'
import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/ButtonForm'
import { useAppContext, useHandleErrors } from '../hooks'

const { updateUserAvatar, context } = index

export default function UpdateAvatar({ onUserAvatarUpdated }) {
    const { Toaster, toast } = useAppContext()

    const handleErrors = useHandleErrors()

    const handleUpdateAvatar = (event) => {
        event.preventDefault()

        const url = event.target.url.value

        handleErrors(async () => {
            await updateUserAvatar(context.token, url)

            onUserAvatarUpdated()
        })
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
