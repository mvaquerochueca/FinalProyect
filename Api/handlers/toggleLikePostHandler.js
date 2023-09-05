const { toggleLikePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    return toggleLikePost(userId, postId).then(() =>
        res.json({ message: 'post liked' })
    )
})
