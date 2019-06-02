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
    
        //Attn Maëlys: This sub-query only runs after another function call. E.g. Insert into People, then Update Patient, then Insert into Doctors
        con.query('INSERT INTO Doctors (PeopleID, DocFirst, DocLast) VALUES (?, ?, ?)', [results.insertId, FirstName, LastName], function (error, results, fields) {
            if (error) throw error;
            console.log('The DoctorID is: ' + results.insertId);
          });
      });
  }

  function editDoctorFirst(FirstName, id){
    con.query('UPDATE Doctors SET DocFirst = ? WHERE DoctorID = ?', [FirstName, id], function (error, results, fields) {
      if (error) throw error;
      console.log('Doctor ' + id + ' is now called ' + FirstName); 
    });
  }

  function editDoctorLast(LastName, id){
    con.query('UPDATE Doctors SET DocLast = ? WHERE DoctorID = ?', [LastName, id], function (error, results, fields) {
      if (error) throw error;
      console.log('Doctor ' + id + ' is now called ' + LastName); 
    });
  }

  function deleteDoctor(id){
    con.query('DELETE FROM People WHERE PeopleID = ?', [id], function (error, results, fields) {
        if (error) throw error;
        console.log('The Person with PeopleID ' + id + ' was deleted'); 
    
        con.query('DELETE FROM Doctors WHERE PeopleID = ?', [id], function (error, results, fields) {
            if (error) throw error;
            console.log('The Doctor with PeopleID ' + id + ' was deleted');
          });
      });
  }

  function addPatient(First, Last){
    con.query('INSERT INTO People (Type) VALUES ("patient")', function (error, results, fields) {
      if (error) throw error;
      console.log('The PeopleID is ' + results.insertId);
  
      con.query('INSERT INTO Patients (PeopleID, FirstName, LastName) VALUES (?, ?, ?)', [results.insertId, First, Last], function (error, results, fields) {
          if (error) throw error;
          console.log('The PatientID is: ' + results.insertId);
        });
    });
  }

  function editPatientFirst(FirstName, id){
    con.query('UPDATE Patients SET FirstName = ? WHERE PatientID = ?', [FirstName, id], function (error, results, fields) {
      if (error) throw error;
      console.log('Doctor ' + id + ' is now called ' + FirstName); 
    });
  }

  function deletePatient(id){
    con.query('DELETE FROM People WHERE PeopleID = ?', [id], function (error, results, fields) {
      if (error) throw error;
      console.log('The Person with ID ' + id + ' was deleted'); 
  
      con.query('DELETE FROM Patients WHERE PeopleID = ?', [id], function (error, results, fields) {
          if (error) throw error;
          console.log('The Patient with PeopleID ' + id + ' was deleted');
        });
    });
  }

  // function addMedication(MedName){
  //   con.query('INSERT INTO Medications (MedName) VALUES (?)', [MedName], function (error, results, fields) {
  //     if (error) throw error;
  //     console.log('The MedID is ' + results.insertId); 
  //   });
  // }

  // function editMedication(){}

  // function deleteMedication(){}

  // function addIssue(PatientID, IssueText){
  //   con.query('INSERT INTO Issues (PatientID, IssueText) VALUES (?, ?)', [PatientID, IssueText], function (error, results, fields) {
  //     if (error) throw error;
  //     console.log('The IssueID is ' + results.insertId); 
  //   });
  // }

  // function editIssue(){}
  // function deleteMedication(){}

  // function addAppointment(PatientID, DoctorID){
  //   con.query('INSERT INTO Appointments (PatientID, DoctorID) VALUES (?, ?)', [PatientID, DoctorID], function (error, results, fields) {
  //     if (error) throw error;
  //     console.log('The ApptID is ' + results.insertId); 
  //   });
  // }

  // function editAppointment(){}
  // function deleteAppointment(){}

  // function addAction(ApptID, ActionText){
  //   con.query('INSERT INTO Actions (ApptID, ActionText) VALUES (?, ?)', [ApptID, ActionText], function (error, results, fields) {
  //     if (error) throw error;
  //     console.log('The ActionID is ' + results.insertId); 
  //   });
  // }

  // function editAction(){}
  // function deleteAction(){}


addDoctor("Dorian", "Carey");
addDoctor("Sylvia", "Rivera");
addDoctor("John", "Cena");
addPatient("Storme", "Delarverie");
addPatient("Corgi", "Daniels");
addPatient("Labradoodle", "Tomkins");
addPatient("Dwayne", "Johnson");
editDoctorFirst("Super", 3);
editDoctorLast("Effin Rivera", 2);
editPatientFirst("The Rock", 4);
deleteDoctor(4);
deletePatient(13);

 // con.end();