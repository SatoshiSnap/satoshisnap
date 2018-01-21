const User = require('../models/User');
/**
 * GET /
 * Play page.
 */
exports.index = (req, res, next) => {
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    res.render('play', {
      title: 'Play',
      user: user
    });
  });
};
