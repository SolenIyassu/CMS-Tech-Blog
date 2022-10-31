module.exports = (req, res) => {
  if (!req.session.loggedIn) {
    res.send("/login");
    return;
  }
  next();
};
