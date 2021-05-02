const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    const userId = decodedToken.id;
    
    if (typeof userId == null || typeof userId == undefined) {
      res.json({error: 'Vous n\'avez pas le droit de mettre à jour un autre utilisateur'});
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error:("Veiller vous connecter")
    });
  }
};