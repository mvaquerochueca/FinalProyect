const { retrievePet } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { petId } = req.params

    return retrievePet(userId, petId).then((post) => res.json(post))
})
