# Postit Social Media App
=======================================


Build a simple social media app called Postit (or Post-it). Post-it allows you to post anything (text, images, video, and/or audio) on a single post-it. A post-it is a single post on the post-it app, just like a tweet. Other users can reply to a post-it. Replying to a post-it is like adding a comment to a post (post-it). A post-it reply can also be one or a combination of text and other media already mentioned. To simplify things, a post-it and its replies can just be text for now.


[![License](https://img.shields.io/badge/License-CC0-lightgray.svg?style=flat-square)](https://creativecommons.org/publicdomain/zero/1.0/)
[![Latest release](https://img.shields.io/github/v/release/mhucka/readmine.svg?style=flat-square&color=b44e88)](https://github.com/mhucka/readmine/releases)


## Table of contents
-------------------------------
* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Known issues and limitations](#known-issues-and-limitations)
* [Getting help](#getting-help)
* [Contributing](#contributing)
* [License](#license)
* [Authors and history](#authors-and-history)
* [Acknowledgments](#acknowledgments)


Introduction
-------------

This is a twitter like social media web API that lets users share 250 char texts(postits) to the world. The API is currently hosted live at [justpostit](https://justpostit.onrender.com). For info on how it works and how to consume it, refer to: [justpostit/docs](https://justpostit.onrender.com/api/v1/docs) for its documentation.

Installation
-------------
This project is a NodeJs/Vanilla JavaScript app that runs with Express. Download the code locally into your machine and ensure you have NodeJs installed on your computer. 
- clone the repository
- install the dependencies: using `npm install`
- create a new file named `.env` in root folder of the project.
- Copy and paste the content of `.env.example` into `.env` and filling the value with the appropriate mongoose URI values.
- You are advice to use atlas for the `DATABASE_URL` key but local database url is fine
- run `npm build` to build the Javascript files from Typescript; start the server in development with nodemon by running: `npm run dev` and read the terminal output to make sure that the server is running and the database is connected properly or use `npm run start` to run it directly without any extras (this mode is advised for live hosting).

