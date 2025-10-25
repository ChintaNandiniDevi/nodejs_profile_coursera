console.log("888i");
const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.get('/', (req, res) => {
    return res.send("helllll0000")
})

const port = 3000
app.listen(port, () => console.log(`Server runnind at ${port}`))