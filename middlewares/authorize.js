const authorize = (req, res, next) => {
  req.user = {
    _id: '5e616d18d954b4760ac82531'
  };
  next();
}

module.exports = authorize;