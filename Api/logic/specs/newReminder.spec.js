require('dotenv').config()
const { expect } = require('chai')
const newReminder = require('../newReminder') // Asegúrate de importar la función adecuada
const { mongoose } = require('mongoose')
const { cleanUp, generateUser, generateReminder } = require('../helpers/test')
const { User, Reminder } = require('../../data/models.js')

describe('newReminder', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL_TEST)
    })

    beforeEach(async () => {
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should create a reminder successfully', async () => {
        const reminderData = generateReminder.reminder()
        const user = await User.create(generateUser.user())

        await newReminder(user._id, reminderData.text, reminderData.date)

        const createdReminder = await Reminder.findOne({ user: user._id })
        expect(createdReminder).to.exist
        expect(createdReminder.text).to.equal(reminderData.text)
    })

    it('should fail on invalid user id', async () => {
        const reminderData = generateReminder.reminder()
        const wrongId = new mongoose.Types.ObjectId()

        try {
            await newReminder(wrongId, reminderData.text, reminderData.date)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id not found`)
        }
    })

    it('should fail on invalid text', async () => {
        const reminderData = generateReminder.reminder()
        const user = await User.create(generateUser.user())

        try {
            await newReminder(user._id, '', reminderData.date)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`text is empty`)
        }
    })
})
