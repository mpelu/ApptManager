--comment
--should there be notes independent of appointment/doctor?
CREATE DATABASE APPTMANAGER;
USE APPTMANAGER;
CREATE TABLE Persons ( ); --pk id, first, last, birthdate date, FK PRESCRIPTIONS
CREATE TABLE Offices ( ); -- doc name, location name, specialty, ADDRESS INC ROOM, EMAIL, PHONE
CREATE TABLE Prescriptions ( NAME VARCHAR (30) ); 
CREATE TABLE Appointments ( ); -- phone, address, location/doctor, datetime, person, notes
CREATE TABLE Actions ( ); -- text, who, fk contact info
CREATE TABLE PersonScrips ( ); -- full name, scrip, dosage, purpose, as needed/daily/twice daily

