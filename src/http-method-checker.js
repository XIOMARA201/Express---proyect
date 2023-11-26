
module.exports = function (req, res, next) {
    if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'PATCH' && req.method !== 'DELETE') {
        return res.status(400).json({ message: 'Invalid HTTP method' });
  }

  next(); 
};
