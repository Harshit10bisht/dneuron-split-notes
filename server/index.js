const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./routes/notes.js');
require('dotenv').config();
require('./db/mongoose.js');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
app.use(notesRouter);

app.get('/', (req, res) => {
    console.log("HELLO GUYS");
    res.send({ data: "HELLO"});
});

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});