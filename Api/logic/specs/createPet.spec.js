require('dotenv').config()
const { expect } = require('chai')
const createPet = require('../createPet') // Asegúrate de importar la función adecuada
const { mongoose } = require('mongoose')
const { cleanUp, generateUser, generatePet } = require('../helpers/test')
const { User, Pet } = require('../../data/models.js')

describe('createPet', () => {
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

    it('should create a pet successfully', async () => {
        const petData = generatePet.pet()
        const owner = await User.findOne({})

        await createPet(
            owner._id,
            petData.name,
            petData.size,
            petData.age,
            petData.breed,
            petData.description,
            petData.image
        )

        const createdPet = await Pet.findOne({ owner: owner._id })
        expect(createdPet).to.exist
        expect(createdPet.name).to.equal(petData.name)
        expect(createdPet.size).to.equal(petData.size)
        // expect(createdPet.age).to.equal(petData.age)
        expect(createdPet.breed).to.equal(petData.breed)
        expect(createdPet.description).to.equal(petData.description)
        expect(createdPet.image).to.equal(petData.image)
    })

    it('should fail on invalid user id', async () => {
        const petData = generatePet.pet()
        const wrongId = new mongoose.Types.ObjectId()

        try {
            await createPet(
                wrongId,
                petData.name,
                petData.size,
                petData.age,
                petData.breed,
                petData.description,
                petData.image
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id not found`)
        }
    })

    it('should fail on invalid image url', async () => {
        const petData = generatePet.pet()

        try {
            await createPet(
                user._id,
                petData.name,
                petData.size,
                petData.age,
                petData.breed,
                petData.description,
                'invalid url'
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('image url is not a valid URL')
        }
    })
    it('should fail on invalid name', async () => {
        const petData = generatePet.pet()

        try {
            await createPet(
                user._id,
                'wrognNane',
                petData.size,
                petData.age,
                petData.breed,
                petData.description,
                petData.image
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('Name is not a valid name')
        }
    })
    it('should fail on invalid size', async () => {
        const petData = generatePet.pet()

        try {
            await createPet(
                user._id,
                petData.name,
                ' ',
                petData.age,
                petData.breed,
                petData.description,
                petData.image
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('size is empty')
        }
    })
    it('should fail on invalid age', async () => {
        const petData = generatePet.pet()

        try {
            await createPet(
                user._id,
                petData.name,
                petData.size,
                3,
                petData.breed,
                petData.description,
                petData.image
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('age is not defined')
        }
    })
    it('should fail on invalid breed', async () => {
        const petData = generatePet.pet()

        try {
            await createPet(
                user._id,
                petData.name,
                petData.size,
                petData.age,
                ' ',
                petData.description,
                petData.image
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('breed is empty')
        }
    })
    it('should fail on invalid description', async () => {
        const petData = generatePet.pet()

        try {
            await createPet(
                user._id,
                petData.name,
                petData.size,
                petData.age,
                petData.breed,
                ' ',
                petData.image
            )
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('description is empty')
        }
    })
})
