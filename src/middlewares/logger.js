module.exports = log = (req, res, next) => {
  console.log(Date(), req.url, req.method, req.body, req.queries);
  next();
};
