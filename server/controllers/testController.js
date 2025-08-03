const dashboard = (req, res) => {
  res.status(200).json({
    msg: `Welcome to the dashboard, user ID: ${req.user.userId}`,
  });
};

module.exports = { dashboard };
