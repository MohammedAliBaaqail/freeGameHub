require('dotenv').config();

const express = require('express');

// Create express app
const app = express();

// routes

app.get('/' , (req , res) => {
    res.json({msg:'Hello World'});
})

// Setup server port
app.listen(process.env.PORT , () => {
    console.log('Server is listening on port 4000');
})