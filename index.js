console.log("hello");
var mysql = require('mysql'); //import mysql library

var con = mysql.createConnection({
    host: "127.0.0.1", // ip address of server running mysql
    user: "backend", // user name to your mysql database
    password: "backend", // corresponding password
    database : "APPTMANAGER"
    });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });



  function addDoctor(FirstName, LastName) {
    con.query('INSERT INTO People (Type) VALUES ("doctor")', function (error, results, fields) {
        if (error) throw error;
        console.log('The PeopleID is ' + results.insertId); //insertId - primary key of inserted row
    
        con.query('INSERT INTO Doctors (PeopleID, DocFirst, DocLast) VALUES (?, ?, ?)', [results.insertId, FirstName, LastName], function (error, results, fields) {
            if (error) throw error;
            console.log('The DoctorID is: ' + results.insertId);
          });
      });
  }

addDoctor("Sylvia", "Rivera");

 // con.end();