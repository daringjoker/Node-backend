module.exports = log = (req, res, next) => {
  console.log(Date(), req.socket.remoteAddress, req.method, req.url, req.body, req.queries);
  next();
};
