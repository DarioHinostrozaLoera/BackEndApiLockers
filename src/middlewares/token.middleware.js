import jwt from 'jsonwebtoken'

exports.authenticateToken = (req, res, next) => {

    console.log("********** authenticateToken **************")

    const authHeader = req.headers.authorization

    console.log("Headers:",authHeader)

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        console.log("token solo:",token)

        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).send({
                    idError: '1ex',
                    message: err.message || "Error token"
                })
            }

            req.user = user
            next()
        })
    } else {
        return res.status(401).send({
            idError: '2twn',
            message: "Error token"
        })
    }
}

exports.generateAccessToken = (valores) => {
    return jwt.sign(valores, process.env.SECRET_TOKEN, { expiresIn: process.env.TIME_LIFE_TOKEN });
}

exports.authenticateTokenRefresh = (req, token) => {

    jwt.verify(token, process.env.SECRET_TOKEN_REFRESH, (err, user) => {
        if (err) req.userInToken = null
        req.userInToken = user
    })
}

exports.generateTokenRefresh = (valores) => {
    return jwt.sign(valores, process.env.SECRET_TOKEN_REFRESH);
}