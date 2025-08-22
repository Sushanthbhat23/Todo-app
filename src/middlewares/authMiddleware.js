import jwt from 'jsonwebtoken'

function authMiddleware (req, res, next){
    const token = req.headers('authorization')
    if(!token){ return res.status(401).json({'message': 'token not present'})}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(error){res.status(401).json({'message': 'heheboi'})}

        req.userId = decoded.id
        next()
    })
}