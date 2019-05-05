DROP TABLE IF EXISTS PEOPLEACTIONS;  
DROP TABLE IF EXISTS PATIENTSMEDS; 
DROP TABLE IF EXISTS APPTSISSUES;  

DROP TABLE IF EXISTS MEDICATIONS;
DROP TABLE IF EXISTS ISSUES;
DROP TABLE IF EXISTS APPOINTMENTS; # error code 3730 referenced by foreign key apptid_actions_fk on table actions
DROP TABLE IF EXISTS ACTIONS;

DROP TABLE IF EXISTS PATIENTS; # 3730 patientid_appointments_fk on table appointments
DROP TABLE IF EXISTS DOCTORS; # 3730 doctorid_appointments_fk on table appointments
DROP TABLE IF EXISTS PEOPLE; # 3730 id_patients_fk on table patients

DROP DATABASE IF EXISTS APPTMANAGER;

# TODO Check not nulls 

CREATE DATABASE APPTMANAGER;
USE APPTMANAGER;

CREATE TABLE People ( 
  PeopleID int NOT NULL AUTO_INCREMENT,
  Type varchar (8) NOT NULL CHECK (Type IN ('Doctor', 'Patient')),
  CONSTRAINT PERSONS_PK PRIMARY KEY (PeopleID)
  );   

CREATE TABLE Patients (
  PatientID int,
  FirstName varchar (30) NOT NULL,
  LastName varchar (30),
  DateOfBirth datetime,
  CONSTRAINT PATIENTS_PK PRIMARY KEY (PatientID),
  CONSTRAINT ID_PATIENTS_FK FOREIGN KEY (PatientID) REFERENCES People (PeopleID) ON DELETE CASCADE
  );  
  
  # TODO need something not null 
CREATE TABLE Doctors ( 
  DoctorID int,
  DocFirst varchar (30),
  DocLast varchar (30),
  OfficeName varchar (40),
  Specialization varchar (30),
  Comments varchar (60),
  Address1 varchar (30),
  Address2 varchar (30),
  City  varchar (40),
  Province  varchar (2),
  PostalCode  varchar (10),
  Phone  varchar (11),
  Email varchar (30),
  Fax  varchar (11),
  CONSTRAINT DOCTORS_PK PRIMARY KEY (DoctorID),
  CONSTRAINT ID_DOCTORS_FK FOREIGN KEY (DoctorID) REFERENCES People (PeopleID) ON DELETE CASCADE
  );   

CREATE TABLE Medications ( 
  MedID int NOT NULL AUTO_INCREMENT,
  MedName varchar (30) NOT NULL,
  CONSTRAINT MEDICATIONS_PK PRIMARY KEY (MedID)
  );   

CREATE TABLE Issues (
  IssueID int NOT NULL AUTO_INCREMENT,
  PatientID int,
  IssueTitle varchar (20),
  IssueText varchar (60) NOT NULL,
  CONSTRAINT ISSUES_PK PRIMARY KEY (IssueID),
  CONSTRAINT PATIENTID_ISSUES_FK FOREIGN KEY (PatientID) REFERENCES Patients (PatientID) ON DELETE CASCADE
  );  

CREATE TABLE Appointments ( 
  ApptID int NOT NULL AUTO_INCREMENT,
  PatientID int NOT NULL,
  DoctorID int NOT NULL,
  DateAndTime datetime,
  Comments varchar (60),
  CONSTRAINT APPOINTMENTS_PK PRIMARY KEY (ApptID),
  CONSTRAINT PATIENTID_APPOINTMENTS_FK FOREIGN KEY (PatientID) REFERENCES Patients (PatientID) ON DELETE CASCADE,
  CONSTRAINT DOCTORID_APPOINTMENTS_FK FOREIGN KEY (DoctorID) REFERENCES Doctors (DoctorID) ON DELETE CASCADE
  );   
 
CREATE TABLE Actions ( 
  ActionID int NOT NULL AUTO_INCREMENT,
  ApptID int,
  ActionText varchar (60) NOT NULL,
  CONSTRAINT ACTIONS_PK PRIMARY KEY (ActionID),
  CONSTRAINT APPTID_ACTIONS_FK FOREIGN KEY (ApptID) REFERENCES Appointments (ApptID) ON DELETE CASCADE
  );   

CREATE TABLE PeopleActions (
  PeopleID int,
  ActionID int NOT NULL,
  CONSTRAINT PEOPLEACTIONS_PK PRIMARY KEY (PeopleID, ActionID),
  CONSTRAINT PEOPLEID_PA_FK FOREIGN KEY (PeopleID) REFERENCES People (PeopleID) ON DELETE CASCADE,
  CONSTRAINT ACTIONID_PA_PK FOREIGN KEY (ActionID) REFERENCES Actions (ActionID) ON DELETE CASCADE
  );  
 
CREATE TABLE PatientsMeds ( 
  PatientID int NOT NULL,
  MedID int NOT NULL,
  Reason varchar (30),
  Dosage varchar (20),
  Instructions varchar (40),
  CONSTRAINT PATIENTMEDS_PK PRIMARY KEY (PatientID, MedID),
  CONSTRAINT PATIENTID_PM_FK FOREIGN KEY (PatientID) REFERENCES Patients (PatientID) ON DELETE CASCADE,
  CONSTRAINT MEDID_PM_FK FOREIGN KEY (MedID) REFERENCES Medications (MedID) ON DELETE CASCADE
  ); 

CREATE TABLE ApptsIssues (
  ApptID int NOT NULL,
  IssueID int NOT NULL,
  CONSTRAINT APPTSISSUES_PK PRIMARY KEY (ApptID, IssueID),
  CONSTRAINT APPTID_AI_FK FOREIGN KEY (ApptID) REFERENCES Appointments (ApptID) ON DELETE CASCADE,
  CONSTRAINT ISSUEID_AI_FK FOREIGN KEY (IssueID) REFERENCES Issues (IssueID) ON DELETE CASCADE
  );

