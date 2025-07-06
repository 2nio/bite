const jwt = require('jsonwebtoken')

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: `${process.env.JWT_ACCESS_TIME}m` })
}

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: `${process.env.JWT_REFRESH_TIME}m` })
}

module.exports = { createAccessToken, createRefreshToken }