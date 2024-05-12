const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./routes/notes.js");
require("dotenv").config();
require("./db/mongoose.js");
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(notesRouter);

app.get("/", (req, res) => {
  console.log("HELLO GUYS");
  res.send({ data: "HELLO" });
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
