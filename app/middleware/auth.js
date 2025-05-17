const isAuthenticated = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('User in session:', req.session.user);
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