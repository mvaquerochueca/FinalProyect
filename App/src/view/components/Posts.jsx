import index from '../../logic'
import { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'
import Aside from './Aside'
import NavBar from './NavBar'
import Footer from './Footer'
import Post from './Post'
import AddPostModal from './AddPostModal'
import AddComentModal from './AddComentModal'

const { retrievePosts } = index

export default function Posts({
    onEditPost,
    lastPostsUpdate,
    onCommentPost,
    user,
}) {
    const { Toaster, toast } = useAppContext()
    const [posts, setPosts] = useState()
    const [modal, setModal] = useState(false)
    const [postId, setPostId] = useState(null)
    const [lastPostUpdate, setLastPostUpdate] = useState(Date.now())

    useEffect(() => handleRefreshPosts(), [])

    const handleCommentCreated = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const handleOpenEditPostModal = (postId) => {
        setPostId(postId)
        setModal(!modal ? 'edit-post' : null)
    }

    const handleOpenAddComentModal = (postId) => {
        setPostId(postId)
        setModal(!modal ? 'add-comment' : null)
    }

    const handleOpenAddPostModal = () => setModal(!modal ? 'add-post' : null)
    const handleCloseModal = () => setModal(null)

    const handleRefreshPosts = () => {
        try {
            retrievePosts()
                .then(setPosts)
                .catch((error) => toast.error(error.message))
                .finally()
        } catch (error) {
            toast(error.message)()
        }
    }

    useEffect(() => {
        console.debug('Posts -> "componentWillReceiveProps" with hooks')

        if (lastPostsUpdate) handleRefreshPosts()
    }, [lastPostsUpdate])

    console.debug('Posts -> render')

    return (
        <section className="z-20 items-center">
            <NavBar
                onOpenAddPostModal={handleOpenAddPostModal}
                onPostCreated={handleRefreshPosts}
            />
            <Aside
                onOpenAddPostModal={handleOpenAddPostModal}
                onPostCreated={handleRefreshPosts}
            />

            {posts &&
                posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        // onGoToProfile={onGoToProfile}
                        onEditPost={onEditPost}
                        onToggledLikePost={handleRefreshPosts}
                        onPostDeleted={handleRefreshPosts}
                        onToggledSavePost={handleRefreshPosts}
                        // onCommentPost={handleRefreshPosts}
                        onCommentPost={handleOpenAddComentModal}
                        user={user}
                    />
                ))}
            {modal === 'add-post' && (
                <AddPostModal
                    onCancel={handleCloseModal}
                    onPostCreated={handleRefreshPosts}
                />
            )}
            {modal === 'add-comment' && (
                <AddComentModal
                    onCancel={handleCloseModal}
                    postId={postId}
                    onCommentPost={handleCommentCreated}
                />
            )}
            <Footer
                onOpenAddPostModal={handleOpenAddPostModal}
                onPostCreated={handleRefreshPosts}
            />
            <Toaster />
        </section>
    )
}
