[![GitHub license](https://img.shields.io/github/license/prithvish-doshi-17/application-tracking-system)](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/LICENSE)
[![DOI](https://zenodo.org/badge/408949717.svg)](https://zenodo.org/badge/latestdoi/408949717)
![GitHub issues](https://img.shields.io/github/issues/prithvish-doshi-17/application-tracking-system)
![GitHub issues](https://img.shields.io/github/issues-closed/prithvish-doshi-17/application-tracking-system)
![GitHub top language](https://img.shields.io/github/languages/top/prithvish-doshi-17/application-tracking-system)
[![Build Status](https://app.travis-ci.com/jiangyy12/application-tracking-system.svg?branch=main)](https://app.travis-ci.com/jiangyy12/application-tracking-system)
#      J-Tracker - Your Job Tracking Assistant

Click this picture to open the procedure video.
[![](https://github.com/lokesh45/TeamFormationAssistant/blob/master/Assistant.png)](https://youtu.be/J_P4uTz7U9s)


https://user-images.githubusercontent.com/43064854/135554150-c06afd4e-d223-47e3-b123-b45f9cd1b87a.mp4

If you have ever come across the process of applying for jobs and internships, you must be knowing that it's not a cakewalk. Managing the job applications is a tedious task. Our application helps you to track and manage your job application process and helps you to control your application process without the need of messy excel sheets.

This application is created as a part of our SE project for Fall 2021

## Basic Design:
![Basic Design](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/resources/Overall%20Design.PNG)

### Here's how the application looks like:
https://user-images.githubusercontent.com/43064854/135554649-9f5e8f21-ff12-45c9-82b4-37078e88709d.mp4

## Roadmap:
![Roadmap](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/resources/Roadmap%20-%202.PNG)


## Explanation:
Here each table represents the multiple stages of the application process. Currently we are including 4 basic steps which are  job applied, job you are willing to apply without referral, job which has rejected you and the the jobs you are waiting for referral. One can edit any details at any stage in any table during the whole process. 

## Version Improvement:

#### Implemented Login page. (NEW Feature)

Get jwt token from backend when users login successfully and store it in the session storage.

#### Implemented Application Summary page. (NEW Feature)

Use application summary page to show application progress summary of each company.

#### Implemented School Application page. (NEW Feature)

Use school application page to show application progress of each school.

#### Implemented Database. (Improvement)

Implemented database (MySQL) on the basis of the original project to replace the original way of managing data through .csv files.

## Technologies Used:

** Python
** Node.Js
** Flask 

## Linting: Code Styling, Formatting and Syntax Checking:
Flake8, ESlint, Prettier

## Automated Analysis Tool used:
[Code Climate](https://codeclimate.com/github/jiangyy12/application-tracking-system)

## Installation:
* Clone our project
* Before installation, we recommand you to open two consoles, one for frontend and the other for backend.
* First of all, you need to install [Node.js](https://nodejs.org/en/). After that, run the following command in the frontend directory to open the website. 
* After installing Node.js, try to run command `npm` on your console, and you will see the result as below. If you can't, trying to reopen your console and try the command again.
```
$ npm
npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term>
npm help npm       more involved overview
```
* Third, run the following command. <br/> `npm start` is the command to run frontend server.
```
cd [location of the git repository]/frontend
npm install
npm start
```
* Install [python3](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installation/). Run the following command on `the other console`. If you can see the pip version in your console, you install pip successfully!
```
pip -V
```

* Then, start to install python dependencies:
```
cd [location of the git repository]/backend
pip install flask
pip install -U flask-cors
pip install selenium
pip install bs4
pip install webdriver-manager
pip install flask-jwt-extended
```

* Now, you can start the backend by running `flask run` on your console
* Conclusion:<br/>After installing all ncessary dependencies, you can run the following command to start the frontend and backend server in separate console:
```
cd [location of the git repository]/frontend
npm start

cd [location of the git repository]/backend
flask run
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
