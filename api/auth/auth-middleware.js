const User = require('../users/model')

const checkIfValid = (req, res, next) => {
    const {username, password} = req.body
    if (username && password) {
        next()
    } else {
        res.status(422).json({
            message: "username and password is required"
        }) 
    }
}

async function checkUsernameExists(req, res, next) {
    try{
        const users = await User.get({ username: req.body.username})
        if(!users){
            res.status(422).json({
                message: "that username is taken"
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