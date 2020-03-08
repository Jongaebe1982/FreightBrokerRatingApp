const Rating = require("../db").Rating;
const Company = require("../db").Company;
const User = require("../db").User;

exports.addCompany = async (req, res) => {
  res.render("new-company");
};

exports.listCompanies = async (req, res) => {
  let companies = await Company.findAll( {order: [['companyName', 'ASC']]});

  res.render("company-list", { companies });
};

exports.updateCompany = async (req, res) => {
  console.log(req.body);
  // req.body.userId = req.user.id;
  await Company.upsert(req.body);
  res.redirect("/companies");
};

exports.deleteCompany = async (req, res) => {
  let id = req.params.id;
  await Company.destroy({ where: { id } });
  res.redirect("/companies");
};
exports.editCompany = async (req, res) => {
  let id = req.params.id;
  let student = await Company.findByPk(id);

  res.render("add-edit", { company });
};
