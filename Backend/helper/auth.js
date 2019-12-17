exports.isAuthenticated = function(req, res, next) {

    if (req.session.user != null || req.url == ("/api/users/signIn" ) || req.url == ("/api/users/create" )){
        console.log("loggedIn");
        return next();
    }else{
    console.log(req.url);
    res.send('not logged');
    }
}
