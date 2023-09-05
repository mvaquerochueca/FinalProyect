const { createPost } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { image, text, location } = req.body

    return createPost(userId, image, text, location, new Date())
        .then(() => res.status(201).end())
        .catch((error) => res.status(400).json({ error: error.message }))
})
