import React, { useState } from 'react'
import Aside from '../components/Aside'
import NavBar from '../components/NavBar'
import Footer from './Footer'
import index from '../../logic'
import { useAppContext, useHandleErrors } from '../hooks'
import { useEffect } from 'react'

const { createPet, retrieveUser, retrievePet } = index

export default function Profile() {
    const handleErrors = useHandleErrors()
    const { Toaster, toast, navigate } = useAppContext()
    const [user, setUser] = useState()
    const [pet, setPet] = useState()
    const [petVisible, setPetVisible] = useState(false)

    useEffect(() => {
        try {
            retrieveUser()
                .then(setUser)
                .catch((error) => toast(error.message))
        } catch (error) {
            toast(error.message)
        }
    }, [])

    useEffect(() => {
        try {
            retrieveUser()
                .then(setPet)
                .catch((error) => toast(error.message))
        } catch (error) {
            toast(error.message)
        }
    }, [])

    const togglePetSection = () => {
        setPetVisible(!petVisible)
    }

    const handleCreatePet = (event) => {
        event.preventDefault()
        debugger
        const name = event.target.name.value
        const size = event.target.size.value
        const age = event.target.age.value
        const breed = event.target.breed.value
        const description = event.target.description.value
        const image = event.target.image.value

        handleErrors(async () => {
            await createPet(name, size, age, breed, description, image)
        })
    }

    return (
        <div className="flex mt-20 flex-col items-center p-4 md:p-8 ml:ml-64">
            <NavBar />
            <Aside />
            <h1 className="text-2xl font-bold mb-4">User</h1>
            <div className="mb-4">
                {user && (
                    <div className="w-1/2 px-3 py-2">
                        <img
                            src={user.avatar}
                            alt=""
                            className="w-12 h-12 rounded-md object-cover mr-4"
                        />
                        <p>{user.name}</p>
                    </div>
                )}
            </div>
            <div className="mb-4">
                <button
                    className="text-blue-500 underline cursor-pointer"
                    onClick={togglePetSection}
                >
                    {petVisible ? 'Hide' : 'Add'} Pet
                </button>
            </div>
            {petVisible && (
                <div className="flex flex-col items-center p-4 md:p-8 ml:ml-64">
                    <h2 className="text-lg font-medium mb-2">Pet</h2>
                    <form onSubmit={handleCreatePet} action="">
                        <div className="mb-4 flex items-center flex-col">
                            <label className="block text-sm font-medium mb-1 justify-center">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                name="name"
                            />
                        </div>
                        <div className="mb-4 flex items-center flex-col">
                            <label className="block text-sm font-medium mb-1">
                                Size
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 bg-white text-gray-700 "
                                name="size"
                            >
                                <option value="tiny">Tiny</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="huge">Huge</option>
                            </select>
                        </div>
                        <div className="mb-4 flex items-center flex-col">
                            <label className="block text-sm font-medium mb-1">
                                Age
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                name="age"
                            />
                        </div>
                        <div className="mb-4 flex items-center flex-col">
                            <label className="block text-sm font-medium mb-1">
                                Breed
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                name="breed"
                            />
                        </div>
                        <div className="mb-4 flex items-center flex-col">
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                name="description"
                            />
                        </div>
                        <div className="mb-4 flex items-center flex-col">
                            <label className="block text-sm font-medium mb-1">
                                Image
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                name="image"
                            />
                        </div>
                        <div className="mb-4 flex items-center flex-col">
                            <button
                                className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                            >
                                Add Pet
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
