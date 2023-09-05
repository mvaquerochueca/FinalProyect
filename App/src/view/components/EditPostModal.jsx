import updatePost from '../../logic'
import retrievePost from '../../logic'
import { useState, useEffect } from 'react'
import './Modal.css'
import { Container, Form } from '../library'
import { useAppContext } from '../hooks'

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    const { Toaster, toast } = useAppContext()

    const [post, setPost] = useState(null)

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleUpdatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost(context.token, postId, image, text)
                .then(() => {
                    onPostUpdated()
                    handleCancel(event)
                })

                .catch((error) => toast.error(error.message))
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        try {
            retrievePost(context.token, postId)
                .then(setPost)
                .catch((error) => toast.error(error.message))
        } catch (error) {
            toast.error(error.message)
        }
    }, [])

    console.debug('EditPostModal -> render')

    return (
        <>
            {post && (
                <section className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <Form
                        tag="form"
                        className="bg-white rounded-lg p-6"
                        onSubmit={handleUpdatePost}
                    >
                        <h3 className="text-xl font-bold mb-4">Update Post</h3>

                        <input
                            type="url"
                            name="image"
                            id="image"
                            defaultValue={post.image}
                            placeholder="Image URL"
                            className="w-full border-2 border-cyan-500 placeholder-black rounded px-3 py-2 mb-4"
                        />

                        <textarea
                            className="w-full border-2 border-cyan-500 placeholder-black rounded px-3 py-2 mb-4"
                            name="text"
                            cols="30"
                            rows="10"
                            defaultValue={post.text}
                            placeholder="Text"
                        ></textarea>

                        <div className="flex justify-end">
                            <button
                                className="rounded-lg px-2 text-lg mx-2  mr-2 bg-cyan-500 "
                                type="submit"
                            >
                                Update
                            </button>
                            <button
                                className="rounded-lg px-2 text-lg mx-2  mr-2 bg-cyan-500 "
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                </section>
            )}
            <Toaster />
        </>
    )
}
