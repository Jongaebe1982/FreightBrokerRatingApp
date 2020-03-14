const router = require('express').Router();
const ratingController = require('../controllers/rating.controller');
const authController = require('../controllers/auth.controller');
const companyController = require("../controllers/company.controller");
const adminController = require("../controllers/admin.controller");


router.get('/register', authController.registerPage);
router.post('/register', authController.registerUser);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

router.get('/', ratingController.listRatings);
router.get('/myratings', ratingController.listMyRatings);
router.get('/add', ratingController.addRating);
router.get('/companies', companyController.listCompanies);
router.get('/addcompany', authorizeRole([2]), companyController.addCompany);
router.post('/updatecompanies', authorizeRole([2]), companyController.updateCompany);
router.get("/editcompanies/:id", companyController.editCompany);
router.get("/deletecompanies/:id", companyController.deleteCompany);
router.get("/users", adminController.listUsers);
router.post("/updateRoles", authorizeRole([2]), adminController.updateRoles);
router.post('/update', ratingController.updateRating);
router.get('/delete/:id', ratingController.deleteRating);
router.get('/edit/:id',  ratingController.editRating);


function authorizeRole(roles) {
  return (req, res, next) => {
    if (roles.includes(req.user.roleId)) {
      return next();
    }
    res.status(401).send();
  };
}

module.exports = router;