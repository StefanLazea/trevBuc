# web-transport
Our app for giving feedback for public transport in Bucharest.


## GIT CheatSheet

In order to "download" the code from the repo use ```git clone https://github.com/StefanLazea/web-transport.git```  
For checking for changes in your local cloned repo, use: ```git status```  
In order to add the things that you have changes: ```git add . ```  
After adding, commit the files + give a message (lol): ```git commit -m "My message"```  

In order to push to the remote (origin): ```git push``` + credentials   


## Project structure
- `back-end/` keeps the api for the app


## Start the app  
For installing the latest dependecies, change to the `back-end/` directory: ```cd back-end/```  
Than, use: ```npm install```
For running the app:
    - ```node app.js``` in `back-end` directory  
    - ```nodemon```  FOR INSTALLING NODEMON: ```npm install -g nodemon``` 

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
	"username": "stefan",
	"password": "pass",
	"email":"lazeastefan@gmail.com"
}
```
