import index from '../../logic'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { errors } from 'com'

const { createPost } = index
const { ContentError, DuplicityError, RangeError } = errors

export default function AddPostModal({ onCancel, onPostCreated }) {
    const { Toaster, toast, navigate } = useAppContext()
    console.debug('AddPostModal -> Render')
    const [quote, setQuote] = useState(null)
    const [image, setImage] = useState(null)

    const handleErrors = useHandleErrors()

    const handleRandomQuote = () => {
        try {
            petitionApiQuote((error, content) => {
                if (error) {
                    toast(error.message, 'error')
                    return
                }
                setQuote(content)
                document.querySelector('.input').innerHTML = content
            })
        } catch (error) {
            alert(error.message, 'error')
        }
    }

    const handleRandomPost = () => {
        handleRandomImage()
        handleRandomQuote()
    }

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    const handleCreatePost = (event) => {
        event.preventDefault()

        const image = event.target.image.value
        const location = event.target.location.value
        const text = event.target.text.value

        handleErrors(async () => {
            await createPost(image, text, location)
            onPostCreated()
            handleCancel(event)
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h3 className="text-xl font-semibold text-center mb-4">
                    Create Post
                </h3>
                <form onSubmit={handleCreatePost}>
                    <input
                        type="url"
                        name="image"
                        id="image"
                        placeholder="Image URL"
                        className="input mb-4 border-2 border-gray-300 rounded-md m-2 placeholder-gray-600 focus:placeholder-gray-500 sm:w-full md:w-full lg:w-full xl:w-full "
                    />
                    <input
                        type="url"
                        name="location"
                        id="location"
                        className="input mb-4 border-2 border-gray-300 rounded-md m-2 placeholder-gray-600 focus:placeholder-gray-500 sm:w-full md:w-full lg:w-full xl:w-full "
                        placeholder="Location URL"
                    />
                    <textarea
                        className="input  mb-4 border-2 border-gray-300 rounded-md m-2 w-full placeholder-gray-600 focus:placeholder-gray-500 sm:w-full md:w-full lg:w-full xl:w-full block "
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Text"
                    ></textarea>
                    <div className="flex justify-center">
                        <button
                            className="mr-2 border-2 border-gray-300 rounded-md pl-2 pr-2"
                            type="submit"
                        >
                            Create
                        </button>
                        <button
                            className="btn-secondary border-2 border-gray-300 rounded-md pl-2 pr-2"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
