const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// port to deploy
const port = process.env.PORT || 3000;
let app = express();

// configuration express and view engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middlewares
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now} ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', `${log} \n`, (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  // allways use next in middleware
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    wellcomeMessage: 'Wellcome to Express app!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({errorMessage: 'Unable to handle request'});
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
