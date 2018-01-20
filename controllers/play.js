/**
 * GET /
 * Play page.
 */
exports.index = (req, res) => {
  res.render('play', {
    title: 'Play'
  });
};
