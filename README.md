# Postit Social Media App

Build a simple social media app called Postit (or Post-it). Post-it allows you to post anything (text, images, video, and/or audio) on a single post-it. A post-it is a single post on the post-it app, just like a tweet. Other users can reply to a post-it. Replying to a post-it is like adding a comment to a post (post-it). A post-it reply can also be one or a combination of text and other media already mentioned. To simplify things, a post-it and its replies can just be text for now.


[![Latest release](https://img.shields.io/github/v/release/mhucka/readmine.svg?style=flat-square&color=b44e88)](https://github.com/emerald2240/postit)


## Table of contents
-------------------------------
* [Introduction](#introduction)
* [Installation](#installation)
* [Short Sample Usage](#short-sample-usage)
* [Documentation](#documentation)
* [Choices and Motivations](#choices-and-motivations)
* [Contribution](#contributing)
* [Acknowledgments](#acknowledgments)


Introduction
-------------

This is a twitter like social media web API that lets users share 250 char texts(postits) to the world. The API is currently hosted live at [justpostit](https://justpostit.onrender.com).


Installation
-------------
This project is a NodeJs/Vanilla JavaScript app that runs with Express. Download the code locally into your machine and ensure you have NodeJs installed on your computer. 
- Clone the repository
- Install the dependencies: using `npm install`
- Create a new file named `.env` in root folder of the project.
- Copy and paste the content of `.env.example` into `.env` and fill it with the appropriate URI values.
- You are advised to use atlas for the `DATABASE_URI` key but local database url is fine. Access and Refresh tokens are fine with whatever, but use values that will be difficult to guess.
- Run the command below to build and start the server manually:
```bash
node app.js
```
- To start the server in development with nodemon running, run this command: 
 ```bash
 npm run dev
 ```
 - Read the terminal output to make sure that the server is running and the database is connected properly.


Short Sample Usage
------
The API is comprised of three main resources: 
- Users
- Postits
- Comments

To gain access to any of these resources you need authentication.
To sign up, create a post request to
**localhost:5000/api/v1/users** and in the body, supply
1. first_name
2. last_name
3. email
4. password &
5. user_type(user or admin)

Example: 
```json
{
    "first_name":"Michael",
    "last_name":"Orji",
    "email":"orjimichael@learnable.com",
    "handle":"SubZero",
    "password":"12345",
    "user_type":"admin"
}
```

Sample Response:
```json
{
    "message": "Resource created successfully",
    "success": true,
    "data": {
        "_id": "640f2f02946b98ed90a80951",
        "first_name": "Michael",
        "last_name": "Orji",
        "email": "orjimichael@learnabl.com",
        "handle": "SubZeroMax",
        "avatar": "https://api.dicebear.com/5.x/croodles-neutral/svg?seed=orjimichael-5iub9-learnabl-5he72-com&size=200&radius=50",
        "avatar_wrapped": "<img src='https://api.dicebear.com/5.x/croodles-neutral/svg?seed=orjimichael-5iub9-learnabl-5he72-com&size=200&radius=50' alt='SubZeroMax'>",
        "createdAt": "2023-03-13T14:11:14.310Z",
        "updatedAt": "2023-03-13T14:11:14.310Z"
    }
}
```

Once succesfully registered, create another post request to **localhost:5000/api/v1/auth/login**; supply it your email and password; if correct, you'll get a refresh token and access token, pass in the latter as a bearer token before making any requests, depending on your user type you should have access to most of the API resources. Checkout the documentations below for full details on how to consume the API.


Documentation
-------------
For full info on how the API works and how to consume it, refer to: [justpostit/docs](https://justpostit.onrender.com/api/v1/docs) for its documentation. Simply replace **justpostit.onrender.com** with **localhost:5000** if running the app locally.

- Database Model: [https://dbdesigner.page.link/eqmiCimxeioSnwvA8](https://dbdesigner.page.link/eqmiCimxeioSnwvA8)
- Auth: [https://documenter.getpostman.com/view/24521226/2s93JtQioY](https://documenter.getpostman.com/view/24521226/2s93JtQioY)
- Users: [https://documenter.getpostman.com/view/24521226/2s93JtQioa](https://documenter.getpostman.com/view/24521226/2s93JtQioa)
- Postits: [https://documenter.getpostman.com/view/24521226/2s93JtQPF8](https://documenter.getpostman.com/view/24521226/2s93JtQPF8)
- Comments: [https://documenter.getpostman.com/view/24521226/2s93JtQioZ](https://documenter.getpostman.com/view/24521226/2s93JtQioZ)


Choices and Motivations
------------

> "Choose a folder structure from Layered(MVC like) and Module(Domain Driven) and explain why you made your choice" 

This app makes use of the *Layered(MVC)* pattern. I chose it because it's easier to read, use and maintain. It helps me seperate concerns and makes it easier to add updates in the future.

---

> "Decide what you will do with deleted post-its, and in your readme, explain what you later did."

Here, no resource is truly destroyed, instead soft delete is implemented. 'Deleted' postits are just removed from regular requests and for regular users, but can be viewed by admins. When postits are 'deleted', the comments remain untouched. The 'deleted' resources can be used in the future for accountability or as backup for users who claim to have accidently deleted their data.

 ---
 
 >  "Write what you considered when building this app of yours."
 
I considered many things whilst building the app:
- Seamless use for frontend devs
- Code readability
- Folder and Route naming/organisation
- Soft deletion management
- Admin/Super User privilledges
- Error handling
- Mongoose reference data population
- Auth/Login access tokens
- Accurate http responses
- API documentation redirection
- Data input validation

Contributions
--------------

If you find any part of the app you can improve, just fork the project, work on your own copy then send me a pull request, i reply as soon as possible. Do try to make the pull request as small as possible, that way its easier to read through them.


Acknowledgements
-----------------

I had the assistance of many people whilst building the project; in the way of coding, design, testing, data entry and advice but most impactful of all were The Genesys Learnable Facilitators, Mentors and Tutors. I'm super grateful for the guidance and opportunity to develop and display my coding skills.
