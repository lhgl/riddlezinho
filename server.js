const express = require('express');
const path = require('path');
const app = express();

// Define EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Render the appropriate page for each route
app.get('/coracao', (req, res) => {res.render('coracao')});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});