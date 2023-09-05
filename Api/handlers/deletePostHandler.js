const { deletePost } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return deletePost(userId)
        .then(() => res.status(201).end())
        .catch((error) => res.status(400).json({ error: error.message }))
})
