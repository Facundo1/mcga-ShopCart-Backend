const functions = require('../functions')

function confirmAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'autorization denied.'})
    }

    const token = req.headers.authorization.split(" ")[1]
    functions.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response =>{
            res.status(response.status).send({ message: response.message})
        })
}

module.exports = confirmAuth