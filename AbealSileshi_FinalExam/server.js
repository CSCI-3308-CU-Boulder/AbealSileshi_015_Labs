/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/

// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'reviews_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

const ops = [
	{
		id: 1,
		name: "Add",
		sign : "+",
	},
	{
		id: 2,
		name: "Subtract",
		sign : "-",
	},
	{
		id: 3,
		name: "Multiply",
		sign : "*",
	}
  ];

// login page
app.get('/', function(req, res) {
	res.render('pages/home',{
		my_title:"Home Page",
		items: "",
		error: false
	});
});


app.get('/home', function(req, res) {
	res.render('pages/home',{
		my_title: "Home Page",
		items: '',
		error: false
	})
});

//to request data from API for given search criteria
app.post('/get_feed', function(req, res) {
	var title = req.body.title;
	if(title) { 
	  axios({
		url: `http://api.tvmaze.com/search/shows?q=${title}`,
		  method: 'GET',
		  dataType:'json',
		})
		
		  .then(items => {
			// TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
			// Did console.log(items) return anything useful? How about console.log(items.data.results)?
			// Stuck? Look at the '/' route above
			console.log(items.data[0].show.name);
			console.log("These are the ratings", items.data[0].show.rating);
			console.log("success in reaching data!");
			res.render('pages/home', {
			  my_title: "Home Page",
			  items: items.data,
			  error: false,
			  message: ''
			})
			//.log("This is items.result.data[0]", items.data.results[0]);
			  //console.log("This is items.data.results at 0",items.data.results[0]);
  
		  })
		  .catch(error => {
			if (error.response) {
			  console.log(error.response.data);
			  console.log(error.response.status);
			}
			console.log("We never got the JSON data");
			res.render('pages/home',{
			  my_title: "Home Page",
			  items: false,
			  error: true,
			  message: error
			})
		  });
	}
	else {
	  // TODO: Render the home page and include an error message (e.g., res.render(...);); Why was there an error? When does this code get executed? Look at the if statement above
	  // Stuck? On the web page, try submitting a search query without a search term
	  res.render('pages/home',{
		my_title: "Home Page",
		items: false,
		error: true,
		message: "Empty search result"
	  })
	}
  });
  
  app.post('/review/post_review', function(req, res) {
	var title = req.body.movie_title;
	var review = req.body.review_input;
	var date = new Date(); 
	var insert_statement = "INSERT INTO reviews(tv_show, review, review_date) VALUES('" + title +"','"+ review +"','"+ date +"') ON CONFLICT DO NOTHING;";
	
	var reviews = 'select * from reviews';

	db.task('post-data', task => {
        return task.batch([
			task.any(insert_statement),
			task.any(reviews)	
        ]);
    })
        .then(data => {
            res.render('pages/review',{
				my_title: "Review Page",
				reviews: data[1],
				items: '',
				error: false
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/review', {
                my_title: 'Review Page',
                review: '',
                items: '',
				error: true,
				message: error
            })
        })
});

app.get('/review', function(req, res) {
	console.log('Get reviews');
	var reviews_1 = 'select * from reviews';
	db.task('get-everything', task => {
		return task.batch([
			task.any(reviews_1)
		]);
	})
	.then(data => {
		res.render('pages/review',{
				my_title: "Review Page",
				reviews: data[0]
			})
	})
	.catch(err => {
			console.log('error', err);
			res.render('pages/review',{
				my_title: "Review Page (Error)",
				reviews: ''
			})
	});
});

app.get('/filter', function(request, response) {
	var title = request.query.title;
	console.log("This is the title", title);
	var query = 'SELECT * FROM reviews WHERE tv_show =\''+ title +'\';';
	console.log(query);
		db.task('get-everything', task => {
			return task.batch([
				task.any(query),
			]);
		})
			.then( info => {
				console.log(info[0]);
				if(info[0].length > 0){ 
					response.render('pages/review', {
						my_title: "Review Page",
						reviews: info[0], 
					})
				}
				else{
					console.log("There was an error my dude");
				}
			})
			.catch(function (err) {
				console.log('error', err);
				response.render('pages/review', {
					my_title: 'Review Page',
					review: ''
				})
			});
});



module.exports = app.listen(3000);
console.log('3000 is the magic port');