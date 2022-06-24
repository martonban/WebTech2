const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'egyszer_meg_lesz_a_diplomam_remelem');
    next();
  } catch(error){
    res.staus(401).json({message: 'Auth Failed'});
  }

}
