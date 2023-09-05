require('dotenv').config()

const mongoose = require('mongoose')
const updateUserAvatar = require('../updateUserAvatar.js')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserAvatar(
            '64b7c71774c99de977d39ccc',
            'https://i.imgur.com/IlMXGoI.jpg'
        )
    )
    .then((result) => console.log('updated'))
    .catch(console.error)
    .finally(mongoose.disconnect)

// ;(async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL)

//         await updateUserAvatar(
//             'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000'
//         )
//     } catch (error) {
//         console.error(error)
//     } finally {
//         mongoose.disconnect()
//     }
// })()

// require('dotenv').config()
// const { expect } = require('chai')
// const updateUserAvatar = require('./updateUserAvatar')
// const { writeFile, readFile } = require('fs')

// describe('updateUserAvatar', () => {
//     let id, name, email, password, avatar

//     beforeEach((done) => {
//         id = `id-${Math.round(Math.random() * 100 + 1)}`
//         name = `name-${Math.random()}`
//         email = `e-${Math.random()}@mail.com`
//         password = `password-${Math.random()}`
//         avatar = `avatar-${Math.random()}`

//         writeFile(`${process.env.DB_PATH}/users.json`, '[]', (error) =>
//             done(error)
//         )
//     })

//     it('succeeds on existing user and correct id', (done) => {
//         const users = [{ id, name, email, password, avatar }]
//         const json = JSON.stringify(users)

//         writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
//             expect(error).to.be.null

//             const newAvatar = avatar + '-new'

//             updateUserAvatar(id, newAvatar, (error) => {
//                 expect(error).to.be.null

//                 readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
//                     expect(error).to.be.null

//                     const [{ avatar }] = JSON.parse(json)

//                     expect(avatar).to.equal(newAvatar)

//                     done()
//                 })
//             })
//         })
//     })

//     it('fails on existing user but incorrect id', (done) => {
//         const users = [{ id, name, email, password, avatar }]
//         const json = JSON.stringify(users)

//         writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
//             expect(error).to.be.null

//             const wrongId = id + '-wrong'
//             const newAvatar = avatar + '-new'

//             updateUserAvatar(wrongId, newAvatar, (error) => {
//                 expect(error).to.be.instanceOf(Error)
//                 expect(error.message).to.equal(
//                     `user with id ${wrongId} not found`
//                 )

//                 done()
//             })
//         })
//     })

//     // TODO add more unhappies

//     after((done) =>
//         writeFile(`${process.env.DB_PATH}/users.json`, '[]', (error) =>
//             done(error)
//         )
//     )
// })
