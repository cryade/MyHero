exports.isAuthenticated = function isAuthenticated(req, res, next) {
  if ((req.session.user && req.cookies.user_sid) || req.url == ('/api/users/signIn') || req.url == ('/api/users/create')) {
    console.log('loggedIn');
    return next();
  }

  console.log(req.url);
  return res.status(401).json({ loggedIn: false });
};
