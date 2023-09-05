const { retrievePets } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrievePets(userId).then((pets) => res.json(pets))
})
