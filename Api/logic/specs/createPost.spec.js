const { expect } = require('chai')
const createPost = require('../createPost') // Asegúrate de importar la función adecuada
const { mongoose } = require('mongoose')
const { generate, cleanUp } = require('../helpers/test')
const { User, Post } = require('../../data/models.js')

describe('createPost', () => {
    let post
    let user

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        post = generate.post()
        user = generate.user()
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should create a post successfully', async () => {
        await createPost(post.author, post.image, post.text, post.location)
    })

    createdPost = await Post.findOne({ author: user.userId })

    expect(createdPost).to.exist
    expect(createdPost.author.toString()).to.equal(postData.userId.toString())
    expect(createdPost.image).to.equal(postData.image)
    expect(createdPost.text).to.equal(postData.text)
    expect(createdPost.location).to.equal(postData.location)
})

it('should throw an error if user does not exist', async () => {
    const postData = {
        userId: 'nonexistentuserid',
        image: 'https://example.com/image.jpg',
        text: 'This is a test post.',
        location: 'https://example.com/location',
    }

    try {
        await createPost(
            postData.userId,
            postData.image,
            postData.text,
            postData.location
        )
        // Si la función no genera un error, la prueba debe fallar
        expect.fail('Expected an error but did not get one')
    } catch (error) {
        // Verifica que el error sea del tipo esperado y contiene el mensaje correcto
        expect(error).to.be.an('Error')
        expect(error.message).to.equal(
            `user with id ${postData.userId} not found`
        )
    }
})

// Agrega más pruebas aquí para otros casos que desees probar

// const { expect } = require('chai')
// const createPost = require('../createPost')
// const { User, Post } = require('../../data/models.js')
// const { generate, cleanUp } = require('../helpers/test')
// const { mongoose } = require('mongoose')

// describe('createPost', () => {
//     // Define algunas variables de ejemplo para usar en las pruebas
//     let userId
//     let image
//     let text
//     let location

//     before(async () => {
//         await mongoose.connect(process.env.MONGODB_URL_TEST)
//     })

//     // Antes de cada prueba, asegúrate de que userId esté definido y crea un usuario de prueba en la base de datos
//     beforeEach(async () => {
//         user = generate.user()
//         post = generate.post()

//         await cleanUp()
//     })

//     // Después de cada prueba, elimina los documentos de usuario y publicación creados
//     after(async () => {
//         await mongoose.disconnect()
//     })

//     it('should create a post', async () => {
//         await createPost(userId, image, text, location)

//         // Verifica que la función devuelva un valor válido (puede ser un objeto o cualquier cosa que no sea null o undefined)

//         // Verifica que se haya creado una publicación en la base de datos
//         const post = await Post.findOne({ author: userId })
//         expect(post).to.exist
//         expect(post.image).to.equal(image)
//         expect(post.text).to.equal(text)
//         expect(post.location).to.equal(location)
//     })

//     it('should throw an error if user does not exist', async () => {
//         // Intenta crear una publicación con un ID de usuario que no existe
//         const nonExistentUserId = 'nonexistentuserid'

//         try {
//             await createPost(nonExistentUserId, image, text, location)
//             // Si no se produce un error, la prueba fallará
//             expect.fail('Expected an error but did not get one')
//         } catch (error) {
//             // Verifica que el error sea del tipo esperado y contenga el mensaje correcto
//             expect(error).to.be.an.instanceOf(Error)
//             expect(error.message).to.equal(
//                 `user with id ${nonExistentUserId} not found`
//             )
//         }
//     })

//     // Agrega más pruebas para otros casos de error si es necesario
// })
