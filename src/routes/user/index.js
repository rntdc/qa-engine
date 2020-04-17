const express = require('express');
const router = express.Router();
const passport = require('./../../passport')
const isAuth = require('./../../middlewares/isAuth');

router.get('/', require('./user-get'));
router.post('/', require('./user-post'));
router.put('/', isAuth, require('./user-put'));
router.post('/login', passport.authenticate('local'), require('./login-success')); //passport middleware, done
router.get('/logout', isAuth, require('./logout'));

module.exports = router;


module.exports = router;