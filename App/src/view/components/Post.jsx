import index from '../../logic'
import { Link } from 'react-router-dom'
// import { deletePost } from '../../logic'
import { useAppContext, useHandleErrors } from '../hooks'
// import { isCurrentUser } from '../../logic'
// import { getUserId } from '../../logic'
import { DEFAULT_AVATAR } from '../../ui.js'

const {
    toggleFavPosts,
    toggleLikePost,
    deletePost,
    isCurrentUser,
    getUserId,
    context,
} = index

export default function Post({
    post: { id, image, location, text, date, likes, author, fav, comments },
    onEditPost,
    onToggledLikePost,
    onPostDeleted,
    onToggledSavePost,
    onGoToProfile,
    onCommentPost,
}) {
    const { Toaster, toast } = useAppContext()
    const handleEditPost = () => onEditPost(id)
    const handleCommentPost = () => onCommentPost()

    const handleErrors = useHandleErrors()

    const handleToggleLikePost = () => {
        debugger
        handleErrors(async () => {
            await toggleLikePost(context.userId, id)

            onToggledLikePost()
        })
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id, (error) => {
                if (error) {
                    toast.error(error.message)

                    return
                }

                onPostDeleted()
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            toggleFavPosts(context.userId, id, (error) => {
                if (error) {
                    toast.error(error.message)

                    return
                }

                onToggledSavePost()
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

    // const options = {
    //     day: 'numeric',
    //     month: 'long',
    //     hour: 'numeric',
    //     minute: 'numeric',
    // }
    // const formattedDate = date.toLocaleDateString('en-EN', options)

    const handleShowLikes = (likes) => {
        if (likes.length < 5) {
            return likes.map((like) => (
                <img
                    key={like}
                    className="w-8 h-8 rounded-full"
                    src={author.avatar}
                />
            ))
        } else {
            return <p className="likesNumber">+{likes.length}</p>
        }
    }

    const limitText = (text) => {
        if (text.length > 50) {
            return text.slice(0, 50) + '...'
        } else {
            return text
        }
    }

    const limitLocation = (location) => {
        if (location.length > 20) {
            return location.slice(0, 20) + '...'
        } else {
            return location
        }
    }

    const extractComments = (comments) => {
        if (comments.length > 0) {
            return comments.map((comment) => (
                <div key={comment.id}>
                    <p>
                        <b>
                            <Link
                                className="id"
                                href="#"
                                to="/profile"
                                onClick={onGoToProfile}
                            >
                                {`${comment.author.name} `}
                            </Link>
                        </b>
                        {comment.text}
                    </p>
                </div>
            ))
        } else {
            return <p>Comments:</p>
        }
    }

    const allComments = extractComments(comments)

    const locationPost = location ? limitLocation(location) : ''

    const textPost = limitText(text)

    const isUserPost = isCurrentUser(author.id)

    return (
        <div className="mt-24  flex justify-center items-center">
            <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <img className="w-full cursor-pointer" src={image} />

                <div className="flex p-4 justify-between border-black">
                    <div className="left-4 top-4 absolute backdrop-blur-lg rounded-xl">
                        <Link
                            href="#"
                            className="flex p-1.5 px-3 border border-grey-200 rounded-xl"
                            to="/profile"
                        >
                            <img
                                src={
                                    author.avatar
                                        ? author.avatar
                                        : DEFAULT_AVATAR
                                }
                                className="mr-2 w-8 h-8 rounded-full border border-black-400"
                            />

                            <div className="">{author.name}</div>
                        </Link>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleToggleLikePost}
                            className="mr-2"
                        >
                            {likes && likes.includes(getUserId()) ? (
                                <i
                                    className="fa-solid fa-heart fa-xl"
                                    style={{ color: 'red' }}
                                ></i>
                            ) : (
                                <i className="fa-regular fa-heart fa-xl"></i>
                            )}
                        </button>
                        <button onClick={handleCommentPost}>
                            <i className="fa-sharp fa-regular fa-comment fa-xl"></i>
                        </button>
                    </div>
                    {/* <div className="flex space-x-2">
                        <div className="flex justify-end ">
                            {isUserPost && (
                                <button
                                    onClick={handleDeletePost}
                                    className="mr-1"
                                >
                                    <i className="fa-solid fa-trash fa-xl"></i>
                                </button>
                            )}
                            {isUserPost && (
                                <button
                                    onClick={handleEditPost}
                                    className="mr-2"
                                >
                                    <i className="fa-regular fa-pen-to-square fa-xl"></i>
                                </button>
                            )}
                            <button
                                type="button"
                                className="mr-2"
                                onClick={handleToggleSavePost}
                            >
                                {fav ? (
                                    <i
                                        className="fa-solid fa-bookmark fa-xl"
                                        style={{ color: 'green' }}
                                    ></i>
                                ) : (
                                    <i className="far fa-bookmark fa-xl"></i>
                                )}
                            </button>
                        </div>
                    </div> */}
                </div>
                <section className="mb-10 mt-2 ml-2">
                    {/* <p className="mb-1">
                        Likes: {likes && handleShowLikes(likes)}
                    </p> */}
                    <p>
                        <b>
                            <Link className="id" href="#" to="/profile">
                                {`${author.name} `}
                            </Link>
                        </b>
                        {textPost}
                    </p>
                    <p>
                        Loc:
                        <Link
                            to={location}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {locationPost}
                        </Link>
                    </p>
                    <p className="text-base"> {date}</p>
                    <p className="mb-2 ml-2">{allComments}</p>
                </section>
                {/* <div>
                </div> */}
            </div>
        </div>
    )
}
