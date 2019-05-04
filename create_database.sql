--comment
--How to work with PeopleID if doctor vs office
CREATE DATABASE APPTMANAGER;
USE APPTMANAGER;

CREATE TABLE Persons ( 
  PeopleID
  FirstName
  LastName
  Type
  ); 
  
CREATE TABLE Patients (
  PatientID
  FirstName
  LastName
  DateOfBirth
  );
  
CREATE TABLE Doctors ( 
  DoctorID
  DocName
  OfficeName
  Specialization
  Comments
  Address1
  Address2
  City
  Province
  PostalCode
  Phone
  Email
  Fax
  ); 
  
CREATE TABLE Medications ( 
  MedID
  MedName
  ); 
  
CREATE TABLE Issues (
  IssueID
  PatientID
  IssueTitle
  IssueText  
  );
  
CREATE TABLE Appointments ( 
  ApptID
  PatientID
  DoctorID
  DateAndTime
  Comments
  ); 
  
CREATE TABLE NextActions ( 
  ActionID
  ApptID
  ActionText
  ); 
  
CREATE TABLE PeopleActions (
  PeopleID
  ActionID
  );
  
CREATE TABLE PatientsMeds ( 
  PatientID
  MedID
  Dosage
  Instructions
  ); 
  
CREATE TABLE ApptIssues (
  ApptID
  IssueID
  );

