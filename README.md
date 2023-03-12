# Today's Weather

## Project Summary

Live link to website: https://keen-kitten-bb3c92.netlify.app/

**Project Context**

"Today's Weather" is a web application for users to retrieve weather information (e.g. temperature, humidity) for a city/country. 


## Features

1. User can search for weather information for a city/country

2. Valid search would be saved in search history

3. User can retrieve weather information based on the list of city/country recorded in their search history

4. User can clear their search history

5. Search history is ordered by pagination


## Technologies Used

* TypeScript

* CSS3

* [React](https://reactjs.org/)

* [Git](https://git-scm.com/)
    * For version control

* [GitHub](http://github.com)
    * To create repository and store source code

* [Netlify](https://www.netlify.com/)
    * To deploy React application

* [Google Font](https://fonts.google.com/)

* [FontAwesome](https://fontawesome.com/icons)

* [Moment.js](https://momentjs.com/)
    * To format date and time

* [react-toastify](https://www.npmjs.com/package/react-toastify)
    * To display message to user

* [react-paginate](https://github.com/AdeleD/react-paginate)

* [iso-3166-1-alpha-2](https://www.npmjs.com/package/iso-3166-1-alpha-2)
    * To retrieve country code based on country name

* [lodash](https://www.npmjs.com/package/lodash)

* Localstorage
    * To store search history

## Deployment

The website is hosted using Netlify.

**Steps to deployment using Netlify**
1. Add, commit, and push any latest edits made to GitHub via the terminal.
2. Go to [Netlify](https://www.netlify.com/) and log in with Github account.
3. Click on "Add new site" button and click on "Import an existing project"
4. Select "GitHub" as the Git provider
5. Authorize access to GitHub should a pop-up appear
6. Select the repository that you want to deploy
7. Add in environment variables
8. Click on "Deploy site" button to get a link for the deployed site

**Steps to run project locally**

1. Fork or git clone the project from https://github.com/kshannn/react-weather-app into preferred directory

2. Navigate to the directory where the project is at and run npm install to install the dependencies
```
npm install
```

3. Obtain OpenWeather API key (Requires account creation at https://openweathermap.org/)

4. Create an .env file, include the following variable in the .env file and replace <API_KEY> with the API key obtained from the previous step: 
```
REACT_APP_OPENWEATHER_API_KEY = <API_KEY>
```

5. Run npm start 
```
npm start
```

6. The website should start up, if not visit http://localhost:3000/ to see the website



## Dependencies

* [Axios](https://cdnjs.com/libraries/axios)
    * To call API

## Credits

* [OpenWeather API](https://openweathermap.org/api) 
