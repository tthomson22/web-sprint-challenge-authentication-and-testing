const User = require('../users/model')

const checkIfValid = (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        res.status(422).json({
            message: "username and password required"
        }) 
    } else {
        next()
    }
}

async function checkUsernameExists(req, res, next) {
    try{
        const users = await User.get({ username: req.body.username})
        if(!users){
            res.status(422).json({
                message: "username taken"
            })
        } else {
            req.users = users
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports ={
    checkIfValid,
    checkUsernameExists
}