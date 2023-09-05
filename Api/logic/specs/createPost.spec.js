require('dotenv').config()
const { expect } = require('chai')
const createPost = require('../createPost') // Asegúrate de importar la función adecuada
const { mongoose } = require('mongoose')
const { cleanUp, generateUser, generatePost } = require('../helpers/test')
const { User, Post } = require('../../data/models.js')

describe('createPost', () => {
    let user

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        await cleanUp()

        user = generateUser.user()
        await User.create(user)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should create a post successfully', async () => {
        const postData = generatePost.post()
        const author = await User.findOne({})

        await createPost(
            author._id,
            postData.image,
            postData.text,
            postData.location
        )

        const createdPost = await Post.findOne({ author: author._id })
        expect(createdPost).to.exist
        expect(createdPost.image).to.equal(postData.image)
        expect(createdPost.text).to.equal(postData.text)
        expect(createdPost.location).to.equal(postData.location)
    })

    it('should fail on invalid user id', async () => {
        const postData = generatePost.post()
        const wrongId = new mongoose.Types.ObjectId()

        try {
            await createPost(
                wrongId,
                postData.image,
                postData.text,
                postData.location
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id not found`)
        }
    })

    it('should fail on invalid image url', async () => {
        const postData = generatePost.post()

        try {
            await createPost(
                user._id,
                'invalid url',
                postData.text,
                postData.location
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('image url is not a valid URL')
        }
    })
    it('should fail on invalid text ', async () => {
        const postData = generatePost.post()

        try {
            await createPost(
                user._id,
                postData.image,
                'invalid text',
                postData.location
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('image url is not a valid URL')
        }
    })
})
