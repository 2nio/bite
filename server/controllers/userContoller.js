const userModel = require('../models/userModel')
const companyModel = require('../models/companyModel')
const { createAccessToken, createRefreshToken } = require('../functions/createTokens');
const { accessOptions, refreshOptions } = require('../config/cookiesConfig')

const postUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        let User = await userModel.signup(email, password, name)
        User = await userModel.findById(User._id).select('-password')

        //Send token cookies
        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)
        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json(User)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const logUser = async (req, res) => {
    const { email, password } = req.body
    try {
        let User = await userModel.login(email, password)
        User = await userModel.findById(User._id).select('-password')

        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)
        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json(User)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const signoutUser = async (req, res) => {
    try {
        res.cookie('accessToken', '', { maxAge: 1, httpOnly: true, sameSite: 'strict', secure: true })
        res.cookie('refreshToken', '', { maxAge: 1, httpOnly: true, sameSite: 'strict', secure: true })
        res.status(200).json('Signed out')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getUser = async (req, res) => {
    try {
        const User = await userModel.findById(req.user._id).populate('currentCompany').select('-password')
        if (!User) throw Error('User not found')
        res.status(200).json(User);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const putUser = async (req, res) => {
    try {

        if (req.body.currentCompany) {
            const company = await companyModel.findById(req.body.currentCompany)
            if (!company) throw Error('Invalid company')
        }

        let User = await userModel.findByIdAndUpdate(req.user._id, req.body)
        User = await userModel.findById(User._id).populate('currentCompany').select('-password')
        if (!User) throw Error('User not found')

        res.status(200).json(User);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getUserCompanies = async (req, res) => {
    try {
        const page = req.query.page || 0
        const size = req.query.size || 2

        const User = await userModel.findById(req.user._id).select('companies').populate('companies.id')

        if (!User) throw Error('User not found')

        const Companies = User.companies.slice(page * size, (page * size) + size)

        res.status(200).json(Companies);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const Users = await userModel.find()
        res.status(200).json(Users)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postUser, logUser, signoutUser, getUser, putUser, getUserCompanies, getAllUsers }