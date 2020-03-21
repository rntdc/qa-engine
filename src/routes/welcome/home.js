module.exports =(req, res) => {
    return res.render('welcome/index', { user: req.user });
}