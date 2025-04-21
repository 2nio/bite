const userModel = require('../models/userModel')
const companyModel = require('../models/companyModel')

const postCompany = async (req, res) => {
    try {
        const Company = await companyModel.create(req.body)
        const User = await userModel.findById(req.user._id);

        User.companies.push({ id: Company._id, role: 'owner' });
        Company.users.push({ user: User._id, role: 'owner' });
        await User.save();
        await Company.save();

        res.status(200).json('Company created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteCompany = async (req, res) => {
    try {
        const Company = await companyModel.findByIdAndDelete(req.query.id);
        if (!Company) {
            throw new Error('Company not found!');
        }

        await userModel.updateMany(
            { 'companies.id': Company._id },
            { $pull: { companies: { id: Company._id } } }
        );

        res.status(200).json({ message: 'Company deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postCompany, deleteCompany }