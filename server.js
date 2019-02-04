const express = require('express');
const fs=require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
// app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log',log+'\n');
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	// res.send('<h1>Hello There!!</h1>');
	// res.send({
	// 	name : 'Manas Gabani',
	// 	spi : [9.00,8.79,8.93,8.8,9.5]
	// });
	res.render('home.hbs',{
		pageTitle : 'BVM UDAAN-2K19',
		// currentYear : new Date().getFullYear(),
		welcomeMessage : 'Welcome to BVM Engineering College'
	});
});

app.get('/about',(req,res)=>{
	// res.send('About Us');
	res.render('about.hbs',{
		pageTitle : 'About Us',
		// currentYear : new Date().getFullYear()
	});
});

app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pageTitle : 'Projects'
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage : 'Unable to handle request!'
	});
});

app.listen(port,()=>{
	console.log(`Server connecting to port ${port}`);
}); 	