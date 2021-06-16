module.exports = log = (req, res, next) => {
  console.log(Date(), req.method, req.url, req.body, req.queries);
  next();
};
