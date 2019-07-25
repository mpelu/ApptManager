var mysql = require('mysql'); //import mysql library
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var con = mysql.createConnection({
    host: "127.0.0.1", // ip address of server running mysql
    user: "backend", // user name to your mysql database
    password: "backend", // corresponding password
    database : "APPTMANAGER"
    });

  con.connect(function(err) {
    if (err) throw err;
    //console.log("Connected!");
  });


  function addDoctor(FirstName, LastName) {
    return new Promise(resolve => {
      con.query('INSERT INTO People (Type) VALUES ("doctor")', function (error, results, fields) {
        if (error) throw error;
        console.log('The PeopleID is ' + results.insertId); //insertId - primary key of inserted row
    
        // Patient, then Insert into Doctors
        con.query('INSERT INTO Doctors (PeopleID, DocFirst, DocLast) VALUES (?, ?, ?)', [results.insertId, FirstName, LastName], function (error, results, fields) {
            if (error) throw error;
            console.log('The DoctorID is: ' + results.insertId);
            resolve(results.insertId); //resolve = Promise kept!
          });
      });
    });
  }

  function editDoctorFirst(FirstName, id){
    return new Promise(resolve => {
      con.query('UPDATE Doctors SET DocFirst = ? WHERE DoctorID = ?', [FirstName, id], function (error, results, fields) {
        if (error) throw error;
        console.log('Doctor ' + id + ' is now called ' + FirstName); 
        resolve(FirstName);
      });
    });
  }

  function editDoctorLast(LastName, id){
    return new Promise(resolve => {
      con.query('UPDATE Doctors SET DocLast = ? WHERE DoctorID = ?', [LastName, id], function (error, results, fields) {
        if (error) throw error;
        console.log('Doctor ' + id + ' is now called ' + LastName);
        resolve(LastName);
      });
    });
  }

  function deleteDoctor(id){
    return new Promise(resolve => { //this enables await. 
      con.query('DELETE FROM People WHERE PeopleID = ?', [id], function (error, results, fields) {
          if (error) throw error;
          console.log('The Person with PeopleID ' + id + ' was deleted'); 
      
          con.query('DELETE FROM Doctors WHERE PeopleID = ?', [id], function (error, results, fields) {
              if (error) throw error;
              console.log('The Doctor with PeopleID ' + id + ' was deleted');
              resolve(true); //resolve - promise kept!
            });
        });
      });
  }

  function addPatient(First, Last){
    return new Promise(resolve => { //this enables await. 
    con.query('INSERT INTO People (Type) VALUES ("patient")', function (error, results, fields) {
      if (error) throw error;
      console.log('The PeopleID is ' + results.insertId);
  
      con.query('INSERT INTO Patients (PeopleID, FirstName, LastName) VALUES (?, ?, ?)', [results.insertId, First, Last], function (error, results, fields) {
          if (error) throw error;
          console.log('The PatientID is: ' + results.insertId);
          resolve(results.insertId); //resolve - promise kept!
        });
    });
  });
}

  function editPatientFirst(FirstName, id){
    return new Promise(resolve => {
    con.query('UPDATE Patients SET FirstName = ? WHERE PatientID = ?', [FirstName, id], function (error, results, fields) {
      if (error) throw error;
      console.log('Doctor ' + id + ' is now called ' + FirstName); 
      resolve(FirstName);
    });
  });
}
  function deletePatient(id){
    return new Promise(resolve => {
    con.query('DELETE FROM People WHERE PeopleID = ?', [id], function (error, results, fields) {
      if (error) throw error;
      console.log('The Person with ID ' + id + ' was deleted'); 
  
      con.query('DELETE FROM Patients WHERE PeopleID = ?', [id], function (error, results, fields) {
          if (error) throw error;
          console.log('The Patient with PeopleID ' + id + ' was deleted');
          resolve(true); //resolve - promise kept!
        });
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

  function addIssue(PatientID, IssueText){
    return new Promise(resolve => {
    con.query('INSERT INTO Issues (PatientID, IssueText) VALUES (?, ?)', [PatientID, IssueText], function (error, results, fields) {
      if (error) throw error;
      console.log('The IssueID is ' + results.insertId); 
      resolve(results.insertId);
    });
  });
}

  // function editIssue(){}
  // function deleteMedication(){}

  function addAppointment(PatientID, DoctorID){
    return new Promise(resolve=> {
    con.query('INSERT INTO Appointments (PatientID, DoctorID) VALUES (?, ?)', [PatientID, DoctorID], function (error, results, fields) {
      if (error) throw error;
      console.log('The ApptID is ' + results.insertId); 
      resolve(results.insertId);
    });
  });
}


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

  function addApptIssue(ApptID, IssueID){
    return new Promise(resolve=> { //"resolve" could be called anything
      con.query('INSERT INTO ApptsIssues (ApptID, IssueID) VALUES (?, ?)', [ApptID, IssueID], function (error, results, fields) {
        if (error) throw error;
        resolve(results.insertId);
      });
    });
  }

async function addDoctors() {
  let doctorDorianId = addDoctor("Dorian", "Carey");
  let doctorSylviaId = addDoctor("Sylvia", "Rivera");
  let doctorJohnId = addDoctor("John", "Cena");
  await editDoctorFirst("Super", await doctorDorianId); // await 0 - don't go to next line until this one finished. await 1 - wait until ID is generated
  await editDoctorLast("Effin Rivera", await doctorSylviaId);
  let isDeleted = await deleteDoctor(await doctorJohnId);
  console.log(`Doctor deleted: ${isDeleted}`);
  return doctorDorianId;
}

async function handlePatients(){
  let patientCorgiId = addPatient("Corgi", "Daniels");
  let patientLabradoodleID = addPatient("Labradoodle", "Tomkins");
  await editPatientFirst("SuperCorgi", await patientCorgiId);
  let isDeleted = await deletePatient(await patientCorgiId);
  console.log(`Patient deleted: ${isDeleted}`);
  return patientLabradoodleID;
}

async function handleAppointments(){
  let docID = await addDoctors();
  let patientID = await handlePatients();
  console.log(`the doctor id is: ${docID} and patient id is : ${patientID}`);
  let apptCuteNameId = addAppointment(patientID, docID);
  return apptCuteNameId;
}

async function handleIssues(){
  let cerbyID = await addPatient("Cerby", "McCutie");
  let corgiButtsID = await addIssue(cerbyID, "Corgis have cute butts");
  return corgiButtsID;
}

async function handleApptIssues(){
  let apptID = await handleAppointments();
  let issueID = await handleIssues();
  let corgiButtsProblem = addApptIssue(apptID, issueID);
  console.log(`Issue ${issueID} has been assigned to appointment ${apptID}`);
}

async function ask(askText){
return new Promise (resolve => {
  rl.question(askText, answer => {
    // rl.close();
    resolve(answer)
  })
})

 
}

async function askPatientQuestions() {
  let firstName = await ask("What is the first name?")
  let lastName = await ask("What is the last name?")
  console.log(`You chose to name the patient ${firstName} ${lastName}`);
  let cerbyTwo = await addPatient(firstName, lastName)
  console.log(`You chose to name the patient ${firstName} ${lastName} with an ID of ${cerbyTwo}`);

  /*rl.question('What do you want to call the patient? ', async (answer) => {
    // TODO: Log the answer in a database
    let cerbyTwo = await addPatient(answer, "thecutest")
    console.log(`You chose to name the patient ${answer} with an ID of ${cerbyTwo}`);
  
    rl.close();
  });*/
}

async function askAppointmentQuestions(){
  let patientId = await ask("What is the patient's ID number?")
  let doctorId = await ask("What is the doctor's ID number?")

  let firstAppt = await addAppointment(patientId, doctorId)

  console.log(`You scheduled appointment ID# ${firstAppt} for Patient ID#${patientId} with Doctor ID#${doctorId}`)
}


async function userMenu(){
    let answer = await ask("Hello, what would you like to do? Press the number, then press enter \n 1 - Add Patient\n 2 - Add Appointment")


    //while loop with let answer inside it, add case to exit loop
    switch(answer){
      case "1": askPatientQuestions()
        break;
      case "2": askAppointmentQuestions()
        break;
      default: console.log(`${answer} is an invalid option`)
    }
    
}



//handleAppointments();
//handleApptIssues();
// askPatientQuestions()
userMenu()


 // con.end();
