// routes/expense_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, connection) {

	  app.post('/expenses', (req, res) => {
		    // You'll create your expense here.
		    console.log(req.body)
		    res.send('Hello')
		  });

	  app.post('/expense', (req, res) => {
		  
		    // ///////////////////////////////////////////////////
		    // validate data before doing anything!!!
		    // ///////////////////////////////////////////////////
		    var dataError;

		    // value as a number (fix the dollar sign)
		    var floatValue;
		    if (req.body.value.charAt(0) == '$') {
			    floatValue = parseFloat(req.body.value.substr(1));
			    console.log("User entered a dollar sign($) when entering the expense:" + req.body.value + "; changed to number: " + floatValue + ".");
		    } else {
		    	floatValue = req.body.value;
		    }
		    
		    // value for value is number
		    if (isNaN(floatValue)) {
			    console.log("Checking value for valid number: isNAN" + "(" + floatValue + ")" + isNaN(floatValue));
		        // res.send({ 'error': 'A data error has occurred
				// value.isNaN()!' });
		    	dataError = "Bad value:" + req.body.value + " isNaN!!!";
		    } else {
		    	floatValue = parseFloat(floatValue);
			    console.log("Good Value - supplied:" + req.body.value + "; parsed floatValue: " + floatValue );
		    }

		    // value for value is number
		    // if (isNaN(floatValue)) {
		        // res.send({ 'error': 'A data error has occurred
				// value.isNaN()!' });
		    // dataError = "Bad value:" + req.body.floatValue;
		    // }

		    // value for date
		    var dateDate;
		    if (isDate(req.body.date)) {
			    dateDate = new Date(Date.parse(req.body.date));
			    console.log("Good Date - supplied: " + req.body.date + "; parsed date: " + dateDate );
		    } else {
		    	dataError = "Bad Date:" + req.body.date;
		    }
		    
		    // console.log("At end of validation; dataError: " + dataError);
		    // ///////////////////////////////////////////////////
		    // VALIDATION - END
		    // ///////////////////////////////////////////////////

		    if (typeof dataError !== 'undefined' && dataError !== null) {
			    // console.log("dataError undefined expression - dataError:" +
				// dataError + "expression evaluation:" + (dataError !==
				// 'undefined'));
			    console.log("User entered bad data: " + dataError);
		        res.send({ 'error': 'A data error has occurred: ' + dataError }); 	    	
		    } else {
			    const expense = { 
    					type: req.body.type,
    					date: dateDate,
    					category: req.body.category,
    					name: req.body.name,
    					value: floatValue
    				};

		    	// db.collection('expense').insert(expense, (err, result) => {
			    connection.query('SELECT * from Expense LIMIT 2', function(err, rows, fields) {
			       connection.end();
			          if (!err) {
			             console.log('Successful execution; Now: ', rows);
			    	     res.send(rows); 
			          } else
			             console.log('Error while performing Query.');
			    });
		    	/*
				 * connection.collection('expense').insert(expense, (err,
				 * result) => { if (err) { res.send({ 'error': 'An error has
				 * occurred' }); } else { res.send(result.ops[0]); } });
				 */		    	
		    }
		  });

	  app.get('/expense/:id', (req, res) => {
		    const id = req.params.id;
		    const details = { '_id': new ObjectID(id) };
		    db.collection('expense').findOne(details, (err, item) => {
		      if (err) {
		        res.send({'error':'An error has occurred'});
		      } else {
		        res.send(item);
		      }
		    });
		    
	  });
	  
	  app.delete('/expense/:id', (req, res) => {
		    const id = req.params.id;
		    const details = { '_id': new ObjectID(id) };
		    db.collection('expense').remove(details, (err, item) => {
		      if (err) {
		        res.send({'error':'An error has occurred'});
		      } else {
		        res.send('Note ' + id + ' deleted!');
		      } 
		    });
		});
	  
	  app.put('/expense/:id', (req, res) => {
		    const id = req.params.id;
		    const details = { '_id': new ObjectID(id) };
		    const expense = { 
					type: req.body.type,
					date: req.body.date,
					category: req.body.category,
					name: req.body.name,
					value: req.body.value
					};
		    db.collection('expense').update(details, expense, (err, result) => {
		      if (err) {
		          res.send({'error':'An error has occurred'});
		      } else {
		          res.send(expense);
		      } 
		});
	  });

	  var isDate = function(date) {
		    // console.log("Does \'new Date(" + date + ")\' evalue to an
			// \'Invalid Date\'? : " + (new Date(date) !== "Invalid Date") );
		    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
	  }
};