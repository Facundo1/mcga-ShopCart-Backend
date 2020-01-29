const jwtSimple = require('jwt-simple')
const moment = require('moment')
const config = require('../../dbconfig/connectionstring.config')

function createToken(user){
    const payload = 
    {uid: user.id, ct: moment().unix(), wt: moment().add(2, 'hours').unix()}
    return jwtSimple.encode(payload, config.token_key)
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) =>{
        try {
            const payload = jwtSimple.decode(token, config.token_key)
            if(payload.exp <= moment().unix())
            {
                reject({status: 401,message: 'The token has expired'})
            }
            resolve(payload.uid)
        }
        catch(err){
            reject({status: 500,message: 'Incorrect token'})
        }
    })
    return decoded
}

module.exports = {
    createToken, 
    decodeToken
}