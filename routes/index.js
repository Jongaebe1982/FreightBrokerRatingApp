const router = require('express').Router();
const ratingController = require('../controllers/rating.controller');
const authController = require('../controllers/auth.controller');


router.get('/register', authController.registerPage);
router.post('/register', authController.registerUser);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

router.get('/', ratingController.listRatings);
router.get('/myratings', ratingController.listMyRatings);
router.get('/add', ratingController.addRating);
router.post('/update', ratingController.updateRating);
router.get('/delete/:id', ratingController.deleteRating);
router.get('/edit/:id',  ratingController.editRating);


module.exports = router;