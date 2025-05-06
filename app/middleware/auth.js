const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
};

const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    res.redirect('/');
};

module.exports = {
    isAuthenticated,
    isNotAuthenticated
}; 