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
            {user && (
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                        <img
                            className="w-32 h-32 rounded-full mx-auto"
                            alt="John Doe"
                            src={user.avatar}
                        />
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                            {user.name}
                        </h3>
                        <div className="text-center text-gray-400 text-xs font-semibold">
                            <p>Surname</p>
                        </div>
                        <table className="text-xs my-3">
                            <tbody>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                        Phone
                                    </td>
                                    <td className="px-2 py-2">+34 658945612</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                        Email
                                    </td>
                                    <td className="px-2 py-2">{user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <button
                    class="mt-6 group relative h-10 w-40 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
                    onClick={togglePetSection}
                >
                    {petVisible ? 'Hide' : 'Add'} Pet
                    <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
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
