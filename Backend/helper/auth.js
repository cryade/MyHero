exports.isAuthenticated = function(req, res, next) {

    if (req.session.user && req.cookies.user_sid || req.url == ("/api/users/signIn" ) || req.url == ("/api/users/create" ) || req.url == ("/api/users/isSignedIn" )){
        if(true){
        console.log("loggedIn");
        return next();
        }
    }else{
    console.log(req.url);
    return res.status(401).json({ loggendIn: false});
    }
}
