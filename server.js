const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next)=>{
var now = new Date().toString();   
var log = (`${now}: ${req.method} ${req.url}`);
fs.appendFile('server.log', log + '\n',(err) =>{
    if(err)
      console.log('unable to append to server.log');
})
next();
})

/*
app.use((req,res,next)=>{
 res.render('maintenance.hbs');
})*/

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        message: 'Welcome to my website!',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page',
        message: 'Know about us!',
    });
})


app.get('/help', (req, res) => {
    res.render('about.hbs', {
        title: 'Help Page',
        message: 'Want some help?',
    });
})

app.get('/projects', (req, res) => {
    res.render('about.hbs', {
        title: 'Projects Page',
        message: 'Take a view of out projects!',
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});