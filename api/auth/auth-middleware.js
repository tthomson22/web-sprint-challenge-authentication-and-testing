const User = require("../users/model");
const bcrypt = require("bcryptjs");

function checkUsernameFree(req, res, next) {
  const username = req.body.username;
  User.findBy({ username })
  .then(([user]) => {
    if (!user) {
        next();
    } else {
        res.status(400).json({
          message: `Username Taken`,
        });
    }
  })
  .catch((err) => next(err))
}

function checkCredentials(req, res, next) {
    const { username, password } = req.body;

    if (
        !username ||
        username.trim() === null ||
        !password ||
        password.trim() === null
    ) {
        res.status(400).json({
        message: `username and password required`,
        });
    } else {
        next();
    }

}

function checkRegisteredUser(req, res, next) {
  const { username, password } = req.body;

  User.findBy({ username }).then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      next();
    } else {
      res.status(401).json({
        message: `invalid credentials`,
      });
    }
  });
}

module.exports = {
  checkUsernameFree,
  checkCredentials,
  checkRegisteredUser,
};