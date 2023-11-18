const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next)=>{
    const jwtSecretKey = "hameed"
    const token = req.header('auth-token')

    if(!token) return res.status(401).send({error: "Please authenticate using valid token"})

    try {
        const data = jwt.verify(token,jwtSecretKey);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"})
    }
}

module.exports = fetchuser;