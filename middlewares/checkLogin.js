const jsonwebtoken = require("jsonwebtoken")


const checkLogin = (req, res, next) => {
    const { authorization } = req.headers
    try {
        if (authorization && authorization.startWith('Bearer')) {
            const token = authorization.split(" ")[1]
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)


            req.user = await User.findById(decoded.id).select("-password");


            next()
        }


    } catch {
        next('Authentication failed')
    }
}


const admin = (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorized as an Admin");
    }
};

module.exports = checkLogin