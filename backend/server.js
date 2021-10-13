// dependencies
const express = require('express');
const app = express();

// db
const connectDB = require('./models/db')
connectDB()

// Body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('test')
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server connect on port ${PORT}`);
})