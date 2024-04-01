# Binar: Challenge 04 Car List Database 
Fullstack Web Development Challenge 4 Binar Academy - FSW2402KM6004 Andhika Rizky Aulia  
A fullstack web application using express.js and postgreSQL as the database. Have CRUD operation and use cloudinary as image storage platform

# How to Use
1. `git clone https://github.com/ndikrp/f-fsw24001086-km6-and-dsb-ch4.git`
2. `npm install` to install all the dependencies
3. Create a .env file and make it match the .env.example file in root directory
4. Go to src\routes\handler\cloudinary.js and configure your cloudinary credentials. Go to [Cloudinary](https://cloudinary.com) to register if you haven't have an account yet
5. Make sure [PostgreSQL](https://www.postgresql.org/download/) is installed and running on your computer
6. Go to src\db\config directory and configure config.json according to your database credentials
7. run create database script `npm run create-data` to create database in your PostgreSQL
8. run migrate script `npm run migrate-data` to migrate
9. (OPTIONAL) - run seed data script `npm run seed-data` to populate the database with dummy data
              - run undo seed script `npm run undo-seed` to undo the seeders
10. run `npm run start` to run the server
11. Done

# Endpoint Available
### Server Connection Test
To ensure connection to the server
#### *HTTP Request*
> **GET**   
> `/api/v1`

#### *Default Request URL*

    http://localhost:8000/api/v1

#### *Expected Response*
Response Code: `200`  
Response Type: `application/json`  
Response Body:  

    {
	    "status": "Succes!",
	    "message": "Server is running!"
    }
    
-----------------------
### Get All Cars

Return list of cars from the database.

#### *HTTP Request*
> **GET**   
> `/api/v1/cars`

#### *Default Request URL*

    http://localhost:8000/api/v1/cars

#### *Expected Response*
Response Code: `200`  
Response Type: `application/json`  
Response Body:  

    {
    	"status": "Success!",
    	"message": "Cars retrieved succesfully",
    	"data": [
    		{
    			"id": number,
    			"name": string,
    			"size": string,
    			"rent_per_day": number,
    			"image_id": string,
    			"image_url": string,
    			"createdAt": timestamp,
    			"updatedAt": timestamp
    		}
    	]
    }

-----------------------
### Add New Car

Insert new car into the database.

#### *HTTP Request*
> **POST**
> `/api/v1/cars`

#### *Default Request URL*

http://localhost:8000/api/v1/cars

#### *Expected Request*
Request Type: `application/json`  
Request Body:   

    {
    	"name": string,
    	"size": string,
    	"rent_per_day": number,
    	"image_id": string,
    	"image_url": string,
    }

#### *Expected Response*
Response Code: `201`   
Response Type: `application/json`   
Response Body:  

    {
    	"status": "Success!",
    	"message": "Car created successfully"
    }

-----------------------

# Database Design
![Database Diagram](public/assets/img/database.png)
