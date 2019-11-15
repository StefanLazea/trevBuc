# web-transport
Our app for giving feedback for public transport in Bucharest.

## Start the app  
For installing the latest dependecies, change to the `back-end/` directory: ```cd back-end/```  
Than, use: ```npm install```
For running the app:
    - ```node app.js``` in `back-end` directory  
    - ```nodemon```  FOR INSTALLING NODEMON: ```npm install -g nodemon``` 
    

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
