import { useState, useEffect } from 'react'
import './Home.css'
import { useAppContext } from '../hooks'
import index from '../../logic'
import allComponents from '../components/allComponents'

const { logoutUser, retrieveUser } = index
const {
    Posts,
    Feed,
    Profile,
    Footer,
    Aside,
    NavBar,
    AddPostModal,
    EditPostModal,
    UpdateAvatar,
    UpdatePassword,
} = allComponents

export default function Home({}) {
    console.debug('Home -> render')

    const { Toaster, toast, navigate } = useAppContext()
    const [modal, setModal] = useState(false)

    const [view, setView] = useState('posts')
    const [postId, setPostId] = useState(null)
    const [lastPostUpdate, setLastPostUpdate] = useState(Date.now())
    const [user, setUser] = useState()
    // const [isDarkMode, setDarkMode] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        try {
            retrieveUser()
                .then(setUser)
                .catch((error) => toast(error.message))
        } catch (error) {
            toast(error.message)
        }
    }, [])

    const handleLogout = () => {
        logoutUser()
        navigate('/login')
    }

    const handleOpenEditPostModal = (postId) => {
        setPostId(postId)
        setModal(!modal ? 'edit-post' : null)
    }

    const handleOpenAddComentModal = (postId) => {
        setPostId(postId)
        setModal(!modal ? 'add-comment' : null)
    }

    const handleCloseModal = () => setModal(null)

    const handleGoToUser = (event) => {
        event.preventDefault()
        setView('profile')
    }

    const handleGoToFeed = (event) => {
        event.preventDefault()
        setView('feed')
    }

    const handleGoToProfile = (event) => {
        event.preventDefault()
        setModal(null)
        setView('profile')
        setOpen(false)
    }
    const handleGoToUpdatePassword = (event) => {
        event.preventDefault()
        setModal(null)
        setView('update-password')
        setOpen(false)
    }

    const handleGoUpdateAvatar = (event) => {
        event.preventDefault()
        setView('update-avatar')
        setModal(null)
        setOpen(false)
    }

    const handleOpenAddPostModal = () => setModal(!modal ? 'add-post' : null)

    const handleCommentCreated = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const handlePostUpdated = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const handleUserAvatarUpdate = () => {
        try {
            retrieveUser()
                .then(setUser)
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <main className="">
                {/* {view === 'posts' && (
                    <Posts
                        onEditPost={handleOpenEditPostModal}
                        lastPostsUpdate={lastPostUpdate}
                        onGoToProfile={handleGoToUser}
                        onCommentPost={handleOpenAddComentModal}
                    />
                )} */}

                {/* {view === 'feed' && <Feed />} */}

                {/* {view === 'calendar' && <Calendar />} */}

                {/* {view === 'profile' && <Profile />} */}

                {/* {view === 'saved-posts' && <SavedPosts />} */}
                {/* 
                {view === 'update-avatar' && (
                    <UpdateAvatar
                        onUserAvatarUpdated={handleUserAvatarUpdate}
                    />
                )}

                {view === 'update-password' && <UpdatePassword />} */}

                {modal === 'add-post' && (
                    <AddPostModal
                        onCancel={handleCloseModal}
                        onPostCreated={handlePostUpdated}
                        // onCommentPost={handleOpenAddComentModal}
                    />
                )}

                {modal === 'edit-post' && (
                    <EditPostModal
                        onCancel={handleCloseModal}
                        onPostUpdated={handlePostUpdated}
                        postId={postId}
                    />
                )}
                {/* {modal === 'add-comment' && (
                    <AddComentModal
                        onCancel={handleCloseModal}
                        onCommentCreated={handleCommentCreated}
                        postId={postId}
                    />
                )} */}
                <Aside
                    onOpenAddPostModal={handleOpenAddPostModal}
                    onUserLogout={handleLogout}
                />
                <NavBar onOpenAddPostModal={handleOpenAddPostModal} />
                <Footer onOpenAddPostModal={handleOpenAddPostModal} />
            </main>

            <Toaster />
        </>
    )
}
