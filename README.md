# web-transport
Our app for giving feedback on public transport in Bucharest.

## Introduction
- What is the main need/problem this product solves? <br />
Our product gives you the possibily of sharing and receiving information/experiences on public transport based on categories (metros, trams, buses). Thus we make the public transport and the selection of the route based on the leaving point and destination easier. 
- To whom this product addresses? <br />
Our app is destined for people of all ages, due to the great diversity of this market segment, which makes it easy to use with the proper friendly interface. 
- What other similar existing products are there on the market? <br />
Moovit <br />
Info Autogari <br />
Transport Urban

## Technologies used
On frontend the is developed using the ReactJS framework, whereas the backend has the well-known ExpressJS. 
In the backend, the application will follow the RESTful APIs concepts. 
The datas are stored in a MySQL database using for manipulation the Sequelize ORM.  

## Interfaces
1. Login page
![login2](https://user-images.githubusercontent.com/48203043/69498394-53daa780-0ef0-11ea-8a68-c79c99115519.png)

2. Main interface of the app
- For logged users:
![893ba78e-6e59-4017-8338-0ae201199dff](https://user-images.githubusercontent.com/48203043/69498367-fe05ff80-0eef-11ea-8717-59f7ed7e5f33.jpg)
- For anonymous users:
![bb77ceef-346f-41d8-a6ab-bcd2470a13ca](https://user-images.githubusercontent.com/48203043/69498385-31e12500-0ef0-11ea-8455-aa3c0e683091.jpg)

## The relational data model
![Screenshot_from_2019-11-10_21-28-56](https://user-images.githubusercontent.com/48203043/69498406-81275580-0ef0-11ea-8d82-8cac77cc983b.png)

## Components
1. Login/Registration form
2. Review introduction form
3. Visualization page view
4. Searching bar 
5. Delete/Edit review button
6. Login button for anonymous users/ Logout button for logged users

## API Rest
- POST /reviews - add review <br />
- GET /reviews - display reviews <br />
- GET /reviews/:id - display reviews by id <br />
- GET /reviews/transport-type <br />
- PUT /reviews/:id <br />
- DELETE /reviews/:id <br />
- GET /transport-type <br />
- GET /transport-type/:id <br />
- GET /transport-type/nume

## Team roles
Product official: Iovu Iris-Ana-Maria <br />
Process official: Istrate Laurentiu Constantin, Lazea Stefan Eugen <br/>
Developers: Ladaru Andreea-Bianca, Iovu Iris-Ana-Maria, Lazea Stefan Eugen, Istrate Laurentiu Constantin, Joita Mihnea <br/>
Tester: Joita Mihnea


## Start the app  
For installing the latest dependecies, change to the `back-end/` directory: ```cd back-end/```    
Than, use: ```npm install```   
For running the app:  
    - ```node app.js``` in `back-end` directory  
    - ```nodemon```  FOR INSTALLING NODEMON: ```npm install -g nodemon```  
	- create in ```back-end/``` directory, the ```.env``` file as mentioned in [this sample](back-end/.env.sample)
    

## Project structure
- `back-end/` keeps the api for the app
 

## GIT CheatSheet

In order to "download" the code from the repo use ```git clone https://github.com/StefanLazea/web-transport.git```  
For checking for changes in your local cloned repo, use: ```git status```  
In order to add the things that you have changes: ```git add . ```  
After adding, commit the files + give a message (lol): ```git commit -m "My message"```  

In order to push to the remote (origin): ```git push``` + credentials

**USING BRANCHES**
- In order to see in what branch you are: ```git branch```
- For creating a **local** branch: ```git checkout -b branch-name``` - this will automatically change from the branch you were to the new one
- For switching to master/other branch: ```git checkout branch-name```
- For getting a branch from remote use: ```git checkout -b branch-name origin/branch-name```

## Using MySQL 

For accesing the mysql command line:  
- ```mysql -u <user>``` if you don't have a passwd  
- ```mysql -u <user> -p``` and then type the passwd  
- FOR ROOT: ```mysql -u root```

In case you want to create a new user, check [this](https://ebu.gitbook.io/webtech-superheroes/configurare-mediu-de-lucru/mysql) tutorial  

For database manipulation:  
- show databases: ```SHOW DATABASES```  
- for changing a database: ```USE DATABASE-NAME```  
- for showing tables from db: ```SHOW TABLES```  
- check the fields from one table: ```DESCRIBE TABLE-NAME```  

##TESTING IN POSTMAN:

POST /register  
```
{
	"username": "myemail@gmail.com",
	"password": "pass"
}
```

POST /login  
```
{
	"username": "myemail@gmail.com",
	"password": "pass"
}
```  
- you will receive a token for auth on private routes


POST /reviews
request body:
```
{
	"leaving_point": "Bucuresti",
    "arriving_point": "Pitesti",
    "leaving_hour": "12:10",
    "duration": 50,
    "observations": "minunat",
    "rating": "super",
    "congestion_level":10,
    "userId": 1,
    "transportTypeId":null
}
```

## FOR POSTMAN USERS:  
In order to get your token automatically into the ```Authorization``` headers;  

```
let jsonData = pm.response.json()
let reqToken = jsonData.token;
console.log(reqToken)
pm.environment.set("token", reqToken);
```
