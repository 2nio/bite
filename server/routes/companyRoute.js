const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../middleware/verifyAccessToken')
const verifyRole = require('../middleware/verifyRole')
const { postCompany, deleteCompany } = require('../controllers/companyController')

router
    .post('/', verifyAccessToken, postCompany)
    .delete('/', verifyAccessToken, verifyRole(['owner']), deleteCompany)

module.exports = router