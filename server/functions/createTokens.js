const jwt = require('jsonwebtoken')

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' })
}

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '15m' })
}

module.exports = { createAccessToken, createRefreshToken }