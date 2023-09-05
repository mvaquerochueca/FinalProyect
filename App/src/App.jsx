import { useState } from 'react'
import Register from './view/Pages/Register'
import Home from './view/Pages/Home'
import Login from './view/Pages/Login'
import AppContext from './AppContext'
import { Loader } from './view/library/index.js'
import { Toaster, toast } from 'react-hot-toast'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import index from '../src/logic/index'

const { isUserLoggedIn } = index
const { Provider } = AppContext

import allComponents from './view/components/allComponents'

const { Profile, Calendar, Pets, MapComponent, Posts, WishList, Settings } =
    allComponents

export default function App() {
    const [feedback, setFeedback] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleAcceptAlert = () => setFeedback(null)

    console.debug('App -> render')

    return (
        <Provider value={{ Toaster, toast, navigate }}>
            <Routes>
                {(() => console.debug('Routes ->render'))()}

                <Route
                    path="/login"
                    element={isUserLoggedIn() ? <Posts /> : <Login />}
                />
                <Route
                    path="/register"
                    element={isUserLoggedIn() ? <Posts /> : <Register />}
                />
                <Route
                    path="/"
                    element={
                        isUserLoggedIn() ? <Posts /> : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        isUserLoggedIn() ? (
                            <Calendar />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        isUserLoggedIn() ? (
                            <Profile />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/pets"
                    element={
                        isUserLoggedIn() ? <Pets /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/map"
                    element={
                        isUserLoggedIn() ? (
                            <MapComponent />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/posts"
                    element={
                        isUserLoggedIn() ? <Posts /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        isUserLoggedIn() ? (
                            <WishList />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/settings"
                    element={
                        isUserLoggedIn() ? (
                            <Settings />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>

            {/* {feedback && (
                <Alert
                    message={feedback.message}
                    level={feedback.level}
                    onAccept={handleAcceptAlert}
                />
            )}

            {loading && <Loader />} */}
        </Provider>
    )
}
