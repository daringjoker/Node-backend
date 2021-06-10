const express = require("express");
const apiRouter = require("./routes/apiRouter");

let app = express();

app.use("/api", apiRouter);

app.listen(8888, () => {
  console.log("listening on port 8888 ...");
});
