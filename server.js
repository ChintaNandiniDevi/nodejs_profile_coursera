console.log("888i");
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3001', // your React app port
  credentials: true, // optional if using cookies
}));

app.get('/', (req, res) => {
    return res.send("helllll0000")
})

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

const port = 3000
app.listen(port, () => console.log(`Server runnind at ${port}`))