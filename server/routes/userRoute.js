const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../middleware/verifyAccessToken')
const verifyRole = require('../middleware/verifyRole')
const {
    postUser,
    getAllUsers,
    logUser,
    signoutUser,
    getUser,
    getUserCompanies,
    putUser
} = require('../controllers/userContoller')

router
    .post('/', postUser)
    .get('/', verifyAccessToken, verifyRole(['owner', 'admin']), getAllUsers)
    .put('/', verifyAccessToken, putUser)
router.get('/current', verifyAccessToken, getUser)
router.post('/login', logUser)
router.post('/signout', signoutUser)
router.get('/companies', verifyAccessToken, getUserCompanies)

module.exports = router