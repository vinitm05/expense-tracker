const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const routes = require("./routes/user.routes");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
