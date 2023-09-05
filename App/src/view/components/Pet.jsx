import Aside from './Aside'
import NavBar from './NavBar'
import { DEFAULT_AVATAR } from '../../ui'
import { useState, useEffect } from 'react'
import index from '../../logic'

const { retrieveUser, retrievePets } = index

export default function Pets({
    pet: { id, owner, name, age, size, breed, description, image },
}) {
    const [showDescription, setShowDescritpion] = useState(false)
    // const [pet, setPet] = useState()
    // const [user, setUser] = useState()

    const toggleDescription = () => {
        setShowDescritpion(!showDescription)
    }

    // useEffect(() => {
    //     try {
    //         retrievePets()
    //             .then(setPet)
    //             .catch((error) => error.message)
    //     } catch (error) {
    //         error.message
    //     }
    // }, [])
    // useEffect(() => {
    //     try {
    //         retrieveUser()
    //             .then(setUser)
    //             .catch((error) => error.message)
    //     } catch (error) {
    //         error.message
    //     }
    // }, [])

    return (
        <div>
            <Aside />
            <NavBar />
            <div className=" max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-20 bg-white shadow-xl rounded-lg text-gray-900 ">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img
                        className="object-cover object-top w-full"
                        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                        alt="Mountain"
                    />
                </div>
                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-black bg-white rounded-full overflow-hidden">
                    <img
                        className=" object-cover object-center h-32 rounded-xl w-32"
                        src={image}
                        alt="Woman looking front"
                    />
                </div>
                <div className="text-center mt-2">
                    <h2 className="font-semibold">{owner.name}</h2>
                    <p className="text-gray-500">{name}</p>
                </div>
                <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="4.5"
                                cy="9.5"
                                r="2.5"
                                fill="#000000"
                            ></circle>
                            <circle
                                cx="9"
                                cy="5.5"
                                r="2.5"
                                fill="#000000"
                            ></circle>
                            <circle
                                cx="15"
                                cy="5.5"
                                r="2.5"
                                fill="#000000"
                            ></circle>
                            <circle
                                cx="19.5"
                                cy="9.5"
                                r="2.5"
                                fill="#000000"
                            ></circle>
                            <path
                                fill="#000000"
                                d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91c-.46-.54-1.05-1.08-1.75-1.32c-.11-.04-.22-.07-.33-.09c-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09c-.7.24-1.28.78-1.75 1.32c-.87 1.02-1.6 1.89-2.48 2.91c-1.31 1.31-2.92 2.76-2.62 4.79c.29 1.02 1.02 2.03 2.33 2.32c.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44c1.31-.29 2.04-1.31 2.33-2.32c.31-2.04-1.3-3.49-2.61-4.8z"
                            ></path>
                        </svg>
                        <div>{size}</div>
                    </li>
                    <li className="flex flex-col items-center justify-between">
                        <svg
                            className="w-4 fill-current text-blue-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                        </svg>
                        <div>{age}</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <svg
                            className="w-4 fill-current text-blue-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                        </svg>
                        <div>{breed}</div>
                    </li>
                </ul>
                <div className="p-4 border-t mx-8 mt-2">
                    <button
                        className="text-sm w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                        onClick={toggleDescription}
                    >
                        {showDescription ? 'Hide' : 'Show'} description
                    </button>
                    {showDescription && (
                        <div className="mt-4 px-4 text-gray-700">
                            {description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
