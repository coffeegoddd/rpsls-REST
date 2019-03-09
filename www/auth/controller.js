module.exports = {
  get: (req, res, next) => {
    console.log(req.headers.cookie);
    res.cookie('coffee', '123abc');
    res.status(200).send('got request');
  },
};
