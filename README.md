# Binar: Challenge 04 Car List Database 
Fullstack Web Development Challenge 4 Binar Academy - FSW2402KM6004 Andhika Rizky Aulia  
A fullstack web application using express.js and postgreSQL as the database. Have CRUD operation and use cloudinary as image storage platform

# How to Use
1. `git clone https://github.com/ndikrp/f-fsw24001086-km6-and-dsb-ch4.git`
2. `npm install`
3. Make sure [PostgreSQL](https://www.postgresql.org/download/) is installed and running on your computer
4. Go to src\db\config directory and configure config.json according to your database credentials
5. run create database script `npm run create-data` to create database in your PostgreSQL
6. run migrate script `npm run migrate-data` to migrate
7. (OPTIONAL) - run seed data script `npm run seed-data` to populate the database with dummy data
              - run undo seed script `npm run undo-seed` to undo the seeders
8. run `npm run start` to run the server
