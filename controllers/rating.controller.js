const Rating = require("../db").Rating;
const Company = require("../db").Company;
const User = require("../db").User;

exports.addRating = async (req, res) => {
  let companies = await Company.findAll({ order: [["companyName", "ASC"]] });
  res.render("add-edit", { companies });
};

exports.listRatings = async (req, res) => {
  let ratings = await Rating.findAll({
    include: [Company, User]
  });
  let isLoggedIn = req.isAuthenticated();
  // let isAdmin = req.user.roleId === 2;
  res.render("list", { ratings, isLoggedIn });
};

exports.listMyRatings = async (req, res) => {
  let myRatings = await Rating.findAll({
    where: { userId: req.user.id },
    include: [Company, User]
  });
  let isLoggedIn = req.isAuthenticated();
  res.render("mylist", {
    isLoggedIn,
    myRatings,
    isAdmin: req.user.roleId === 2
  });
};

exports.updateRating = async (req, res) => {
  req.body.userId = req.user.id;
  await Rating.upsert(req.body);
  res.redirect("/myratings");
};

exports.deleteRating = async (req, res) => {
  let id = req.params.id;
  await Rating.destroy({ where: { id } });
  res.redirect("/myratings");
};
exports.editRating = async (req, res) => {
  let id = req.params.id;
  let companies = await Company.findAll();
  let rating = await Rating.findByPk(id)

  res.render("add-edit", { rating, companies });
};
