const Rating = require('../db').Rating;
const Company = require('../db').Company;
const User = require('../db').User;

exports.addRating = async (req, res) => {
    res.render('add-edit');
};

exports.listMyRatings = async (req, res) => {
    let myRatings = await Rating.findAll({where: { userId: req.user.id }, order: [['lastName', 'ASC']] });

    res.render('mylist', {myRatings});
}

exports.listRatings = async (req, res) => {
    let ratings = await Rating.findAll({include: [Company, User]});

    res.render('list', {ratings});
}

exports.updateRating = async (req, res) => {
    req.body.userId = req.user.id;
    await Rating.upsert(req.body);
    res.redirect('/');
}

exports.deleteRating = async (req, res) => {
    let id = req.params.id;
    await Rating.destroy({ where: { id } });
    res.redirect('/');
}
exports.editRating = async (req, res) => {
    let id = req.params.id
    let student = await Rating.findByPk(id);

    res.render('add-edit', { rating });
};