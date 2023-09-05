import React from 'react'
import index from '../../logic'
import { useAppContext, useHandleErrors } from '../hooks'
import NavBar from './NavBar'
import Aside from './Aside'

const { updateUserAvatar, context, updateUserPassword } = index

export default function Settings({ onUserAvatarUpdated }) {
    const { Toaster, toast } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleUpdateAvatar = (event) => {
        event.preventDefault()
        debugger
        const url = event.target.url.value

        handleErrors(async () => {
            await updateUserAvatar(context.token, url)

            toast('Avatar updated')

            onUserAvatarUpdated()
        })
    }

    const handleUpdatePassword = (event) => {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        handleErrors(async () => {
            await updateUserPassword(
                context.userId,
                password,
                newPassword,
                newPasswordConfirm
            )

            toast('Password updated')
        })
    }

    return (
        <div className="container p-4 md:p-8 lg:p-12">
            <NavBar />
            <Aside />
            <div className="flex flex-col justify-center">
                {' '}
                {/* Centrar el contenido en versión de escritorio */}
                <form
                    onSubmit={handleUpdateAvatar}
                    className="mb-4 mt-16 left-0"
                >
                    <h2 className="text-xl md:text-2xl mb-4">Update Avatar</h2>
                    <input
                        type="url"
                        name="url"
                        placeholder="URL"
                        className="w-full md:w-1/2 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update
                    </button>
                </form>
                <form onSubmit={handleUpdatePassword} className="mb-4">
                    <h2 className="text-xl md:text-2xl mb-4">
                        Update Password
                    </h2>
                    <input
                        type="password"
                        name="password"
                        placeholder="Current Password"
                        className="w-full md:w-1/2 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 mb-4"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        className="w-full md:w-1/2 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 mb-4"
                    />
                    <input
                        type="password"
                        name="newPasswordConfirm"
                        placeholder="Confirm New Password"
                        className="w-full md:w-1/2 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update
                    </button>
                </form>
            </div>

            <Toaster />
        </div>
    )
}
