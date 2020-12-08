## Lunch localy: 

1. CLONE the project and npm install
check in map frontend/src/store/reducer.js if initialState.production is set to localhost!
2. Create mongo Atlas account
    https://www.mongodb.com/cloud/atlas
3. Create a project
4. Create a cluster
5. Click on the connect button from the cluster dashboard and follow the steps for creating a mongo     user for the cluster and whitelisting IP addresses. To whitelist all IP addresses (helpful for when pushing to heroku), add 0.0.0.0 to the whitelist. or atleast list your own IP for local deployment.
    u then get a string for mongoDB replace ADMIN:PASS with your credentials
    wich u will put in .env file 
    ```
    MONGODB_CONNECTION_STRING=mongodb+srv://<USER>:<PASSWORD>@<YOUR-CLUSTER>?retryWrites=true&w=majority
    JWT_SECRET=<your secret key>
    ```
6. using INSOMNIA input some items in the database "help with readme.md"

## Deploy to Heroku

1. check in map frontend/src/store/reducer.js if initialState.production is set to "" (empty string)!
7. now create account on heroku https://heroku.com
8. Install heroku https://devcenter.heroku.com/articles/heroku-cli
9. Make sure u have git installed
10. input commands in terminal: 
    ```
    $ git init
    $ heroku create my-project (if name is not available it will tell u)
    $ heroku login 
    // this will redirect you to sign in via your default browser
    $ git commit -m "add message"
    $ git push heroku master
    ```
11. if something went wrong u can check with
    ```
    $ heroku logs --tail
    ```
12. In Heroku under your project/settings, click Reveal Vars and input KEY:VALUE pair of your .env file
    (step 5 in local deployment)

File tree looks like this:
```
|- .env                  ( u need to create this file )
|- package.json
|- index.js
|- frontend/             (the react folder)
    |- package.json
    |- src/
       |- store/
       |- context/
       |- components/
           |- auth/
           |- childComponents/ (modals)
           |- icons/
           |- images/
           |- layout/          (childComponents :) i know)
           |- misc/
           |- pages/           (main routes)
           |- protectedRoute/
       |- index.js
       |- app.js
```
