var express = require('express');
var router = express.Router();



/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
	var bday = req.body.dob;
	
	var dateParts = bday.split('-');
	bday = dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0];
	var dob = new Date(bday);
	
	
		var today = new Date();
		/*var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd
		} 
		if(mm<10) {
			mm='0'+mm
		} 
		today = dd+'/'+mm+'/'+yyyy;*/
		//today = yyyy+'-'+mm+'-'+dd;
	
	var oneDay = 24*60*60*1000
	var diff = (today-dob)/oneDay;
	
	
    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "firstname" : firstname,
        "lastname" : lastname,
		"dob" : bday,
		"today" : today,
		"diff" : diff
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});
/*


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET Hello World page. 
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});
*/
module.exports = router;
