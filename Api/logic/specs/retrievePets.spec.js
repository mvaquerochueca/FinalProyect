require('dotenv').config()
const { expect } = require('chai')
const retrievePets = require('../retrievePets')
const { User, Pet } = require('../../data/models')
const { generateUser, generatePet, cleanUp } = require('../helpers/test')
const mongoose = require('mongoose')

describe('retrievePets', () => {
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

    it('should successfully retrieve user pets', async () => {
        const petsCount = 5

        for (let i = 0; i < petsCount; i++) {
            const pet = generatePet.pet(user._id)
            await Pet.create(pet)
        }

        const userPets = await retrievePets(user._id.toString())

        expect(userPets).to.exist
        expect(userPets).to.be.an('array')
        expect(userPets).to.have.lengthOf(petsCount)

        userPets.forEach((pet) => {
            expect(pet).to.have.property('id')
            expect(pet).to.have.property('name')
            expect(pet).to.have.property('size')
            expect(pet).to.have.property('age')
            expect(pet).to.have.property('breed')
            expect(pet).to.have.property('description')
            expect(pet).to.have.property('image')
        })
    })

    it('should fail on retrieving user pets for non-existing user', async () => {
        const fakeUserId = new mongoose.Types.ObjectId().toString()

        try {
            await retrievePets(fakeUserId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(
                `User with id ${fakeUserId} not found`
            )
        }
    })

    // Agrega más casos de prueba según sea necesario para cubrir otros escenarios.
})
