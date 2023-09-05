import { Link } from 'react-router-dom'
import logoutUser from '../../logic/logoutUser'
import { useAppContext } from '../hooks'
import { useEffect, useState } from 'react'

export default function Aside({ onOpenAddPostModal, onPostCreated }) {
    const { Toaster, toast, navigate } = useAppContext()

    function handleOpenModal(event) {
        event.preventDefault()
        onOpenAddPostModal()
        onPostCreated()
    }

    const handleLogout = () => {
        logoutUser()
        navigate('/login')
    }

    const isPostView = window.location.pathname === '/posts'

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            to="/profile"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    fill="none"
                                    stroke="#6b7280"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinejoin="round"
                                        d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                                    ></path>
                                    <circle cx="12" cy="7" r="3"></circle>
                                </g>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Profile
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            to="/posts"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    fill="none"
                                    stroke="#6b7280"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinejoin="round"
                                        d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                                    ></path>
                                    <circle cx="12" cy="7" r="3"></circle>
                                </g>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            to="/map"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    fill="none"
                                    stroke="#6b7280"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        d="M20.965 7c-.078-1.872-.328-3.02-1.137-3.828C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-3"
                                    ></path>
                                    <path d="M6 12c0-1.414 0-2.121.44-2.56C6.878 9 7.585 9 9 9h6c1.414 0 2.121 0 2.56.44c.44.439.44 1.146.44 2.56v4c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44H9c-1.414 0-2.121 0-2.56-.44C6 18.122 6 17.415 6 16v-4Z"></path>
                                    <path
                                        strokeLinecap="round"
                                        d="M7 6h5"
                                    ></path>
                                </g>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Map{' '}
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            to="/pets"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#6b7280"
                                    d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9c.36 1.77-.29 3.35-1.47 3.53c-1.17.18-2.43-1.11-2.8-2.89c-.37-1.77.3-3.35 1.48-3.54m7.15 0c1.19.19 1.85 1.77 1.5 3.54c-.38 1.78-1.63 3.07-2.81 2.89c-1.19-.18-1.84-1.76-1.47-3.53c.36-1.78 1.61-3.07 2.78-2.9M3 7.6c1.14-.49 2.69.4 3.5 1.95c.76 1.58.5 3.24-.63 3.73c-1.13.49-2.67-.39-3.46-1.96C1.62 9.75 1.9 8.08 3 7.6m18 0c1.1.48 1.38 2.15.59 3.72c-.79 1.57-2.33 2.45-3.46 1.96c-1.13-.49-1.39-2.15-.63-3.73C18.31 8 19.86 7.11 21 7.6m-1.67 10.78c.04.94-.68 1.98-1.54 2.37c-1.79.82-3.91-.88-5.9-.88c-1.99 0-4.13 1.77-5.89.88c-1-.49-1.69-1.79-1.56-2.87c.18-1.49 1.97-2.29 3.03-3.38c1.41-1.41 2.41-4.06 4.42-4.06c2 0 3.06 2.61 4.41 4.06c1.11 1.22 2.96 2.25 3.03 3.88Z"
                                ></path>
                            </svg>

                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Pets
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            to="/wishlist"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 256 256"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#6b7280"
                                    d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12ZM40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24Zm176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24Z"
                                ></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Wish List
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            to="/calendar"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 256 256"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#6b7280"
                                    d="M208 28h-20v-4a12 12 0 0 0-24 0v4H92v-4a12 12 0 0 0-24 0v4H48a20 20 0 0 0-20 20v160a20 20 0 0 0 20 20h160a20 20 0 0 0 20-20V48a20 20 0 0 0-20-20ZM68 52a12 12 0 0 0 24 0h72a12 12 0 0 0 24 0h16v24H52V52ZM52 204V100h152v104Zm60-80v56a12 12 0 0 1-24 0v-36.68a12 12 0 0 1-9.37-22l16-8A12 12 0 0 1 112 124Zm61.49 33.88L163.9 168h4.1a12 12 0 0 1 0 24h-32a12 12 0 0 1-8.71-20.25L155.45 142a4 4 0 0 0 .55-2a4 4 0 0 0-7.47-2a12 12 0 0 1-20.78-12A28 28 0 0 1 180 140a27.77 27.77 0 0 1-5.64 16.86a10.63 10.63 0 0 1-.87 1.02Z"
                                ></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Calendar
                            </span>
                        </Link>
                    </li>

                    {isPostView && (
                        <li>
                            <button
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                onClick={handleOpenModal}
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400  group-hover:text-green-900 dark:group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    New Post
                                </span>
                            </button>
                        </li>
                    )}
                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            to="/settings"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    fill="none"
                                    stroke="#6b7280"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinejoin="round"
                                        d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                                    ></path>
                                    <circle cx="12" cy="7" r="3"></circle>
                                </g>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Settings
                            </span>
                        </Link>
                    </li>

                    <li>
                        <button
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            onClick={handleLogout}
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#6b7280"
                                    d="M5 5h6c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6c.55 0 1-.45 1-1s-.45-1-1-1H5V5z"
                                ></path>
                                <path
                                    fill="#6b7280"
                                    d="m20.65 11.65l-2.79-2.79a.501.501 0 0 0-.86.35V11h-7c-.55 0-1 .45-1 1s.45 1 1 1h7v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.19.2-.51.01-.7z"
                                ></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Log Out
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
            <Toaster />
        </aside>
    )
}
