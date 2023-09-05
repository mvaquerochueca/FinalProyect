import addCommentToPost from '../../logic'
import './Modal.css'
import { useHandleErrors, useAppContext } from '../hooks'
import context from '../../logic'

export default function AddCommentToPost({ onCancel, onCommentPost, postId }) {
    const { Toaster, toast, navigate } = useAppContext()
    const handleErrors = useHandleErrors()
    console.debug('AddCommentToPost -> Render')

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    const handleCommentPost = (event) => {
        event.preventDefault()
        debugger
        const text = event.target.text.value

        handleErrors(async () => {
            await addCommentToPost(context.token, postId, text)
            onCommentPost()
            handleCancel(event)
        })

        // try
        //     addCommentToPost(context.token, postId, text)
        //         .then(() => {
        //             onCommentPost()

        //             handleCancel(event)
        //         })
        //         .catch((error) => toast(error.message))
        // } catch (error) {
        //     toast.error(error.message)
        // }
    }

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <form
                className="bg-white rounded-lg p-6"
                onSubmit={handleCommentPost}
            >
                <h3 className="text-xl f text-center mb-4 ">Create Comment</h3>

                <textarea
                    className="w-full border-2 border-cyan-500 placeholder-black rounded px-3 py-2 mb-4"
                    name="text"
                    cols="30"
                    rows="10"
                    placeholder="Text"
                ></textarea>

                <div className="flex justify-end">
                    <button
                        className="rounded-lg px-2 text-lg mx-2  mr-2 bg-cyan-500 "
                        type="submit"
                    >
                        Comment
                    </button>
                    <button
                        className="rounded-lg px-2 text-lg mx-2  mr-2 bg-cyan-500 "
                        type="button"
                        onClick={handleCancel}
                    >
                        Close
                    </button>
                </div>
            </form>
            <Toaster />
        </section>
    )
}
