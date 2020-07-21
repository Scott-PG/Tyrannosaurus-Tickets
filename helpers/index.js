// authorize valid jwt token before proceeding

module.exports = (req, res, next) => {
  const jwt = require("jsonwebtoken")
  require("../controllers/node_modules/dotenv").config()
  
  const TOKEN_KEY = process.env.TOKEN_KEY 
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log("token", token)

    const data = jwt.verify(token, TOKEN_KEY)
    console.log("jwt conversion", data)
    res.locals.user = data
    next()
  } catch (error) {
    console.log(error)
    res.status(403).send("Unauthorized")
  }
}