const User = require('../users/users-model')

const checkIfValid = (req, res, next) => {
    const {username, password} = req.body
    if (username && password) {
        next()
    } else {
        res.status(400).json({
            message: "username and password is required"
        }) 
    }
}

async function checkUsernameExists(req, res, next) {
    try{
        const users = await User.findBy({ username: req.body.username})
        if(!users.length){
            next()
        } else {
            res.status(422).json({
                message: "that username is taken"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports ={
    checkIfValid,
    checkUsernameExists
}