
const  CategoryController  = require('../controllers/category.controller');
const router               = require('express').Router();
const passport             = require('passport');

const access = passport.authenticate('jwt', { session: false });

router.route('/api/category')
    .post(access, CategoryController.createCategory.bind(CategoryController));

module.exports = router;