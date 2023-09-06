require('dotenv').config()

const express = require('express')
const context = require('./logic/context')
const bodyParser = require('body-parser')
const cors = require('cors')
const {
    helloApiHandler,
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    updateUserAvatarHandler,
    updateUserPasswordHandler,
    createPostHandler,
    retrievePostsHandler,
    deletePostHandler,
    retrievePostHandler,
    addCommentToPostHandler,
    removeCommentFromPostHandler,
    createPetHandler,
    retrievePetsHandler,
    retrievePetHandler,
    toggleLikePostHandler,
} = require('./handlers')
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        //Get recibir de la Api
        api.get('/helloworld', (req, res) => res.json({ hello: ' World' }))

        //Post enviar a la Api
        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        //Patch actualizar en la Api
        api.patch(
            '/users/:userId/avatar',
            jsonBodyParser,
            updateUserAvatarHandler
        )

        api.patch(
            '/users/password/:userId',
            jsonBodyParser,
            updateUserPasswordHandler
        )

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.get('/posts', jsonBodyParser, retrievePostsHandler)

        api.get('/posts/:postId', jsonBodyParser, retrievePostHandler)

        api.post('/posts/:postId/like', jsonBodyParser, toggleLikePostHandler)

        api.post(
            '/posts/:postId/comments',
            jsonBodyParser,
            addCommentToPostHandler
        )

        api.post('/pets', jsonBodyParser, createPetHandler)

        api.get('/pets', jsonBodyParser, retrievePetsHandler)

        api.get('/pets/:petId', jsonBodyParser, retrievePetHandler)

        api.delete(
            '/posts/:postId/comments/:commentId',
            removeCommentFromPostHandler
        )
        // api.patch('/posts/delete', jsonBodyParser, deletePostHandler)

        api.listen(process.env.PORT, () =>
            console.log(`server running in port ${process.env.PORT}`)
        )
    })
    .catch(console.error)
