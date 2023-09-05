const { createPet } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    // const { petId } = req.params

    const { name, size, age, breed, description, image } = req.body

    return createPet(userId, name, size, age, breed, description, image).then(
        () => res.status(201).send()
    )
})
