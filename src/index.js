const express = require("express");
const path = require("path");
const apiRouter = require("./routes/apiRouter");
const cors = require("cors");
const log = require("./middlewares/logger");

let app = express();
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(log);
app.use("/api", apiRouter);
app.use("/usercontent", express.static(path.join(__dirname, "../useruploads")));
app.listen(8888, () => {
  console.log("listening on port 8888 ...");
});
