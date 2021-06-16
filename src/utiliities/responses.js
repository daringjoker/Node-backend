function sendFailure(res, msg, data = [], responseCode = 500) {
  res.status = responseCode;
  res.json({
    status: "failed",
    msg: msg,
    data: data,
  });
}

function sendSuccess(res, msg, data = [], responseCode = 200) {
  res.status = responseCode;
  res.json({
    status: "success",
    msg: msg,
    data: data,
  });
}

module.exports = {
  sendFailure,
  sendSuccess,
};
