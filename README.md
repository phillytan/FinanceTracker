# FinanceTracker
## Project Description

The Finance Tracker App is a tool to help users manage their personal finances. Transactions made by the user are stored and the user will be able to create, delete, and update these transactions. Different statistics about the transactions will also be shown to the user in graph, with further additional functionalities such as automatic currency conversion, future spending prediction and budget goal setting.

## Project Goals
- Minimal goals
  - User can add/delete/update/see transactions ✅
  - User can upload bulk transactions ✅
  - Budget goals can be set ✅
- Standard goals
  - Transactions can be stored in different currency buckets ✅
  - Transactions can be categorized by type ✅
  - Dashboard with summary stats of the transactions ✅
  - User authentication ✅
- Stretch goals
  - Forex and crypto tracker ⚠️ (decided that it was too vague to do, and was a bit redundant)
  - Prediction of future spendings ✅

## Technologies

### HTML, CSS, JS
In our project, we extensively used these 3 programming tools, especially JavaScript for programming, such as currency conversion and future spending predictions. While following good code styling practices, as most of our application was written in JavaScript, the features of the language, such as dynamic typing and asynchrony allow us to add dynamics to our application.

### React & Redux
We used React to develop our user interface efficiently, allowing us to easily build reusable components and manage frontend logic without complicated or duplicated code. Redux was also an important technology in building our frontend, as it allowed us to manage application state centrally without having to pass unnecessary state to React components that don’t require it. This would minimize the increase of code complexity as the size of the codebase increased, where props are passed down everywhere and becomes difficult to keep track of.

### Node & Express
We used primarily Express for creating our application server, which was responsible for handling API calls sent by the client, mainly revolving around budget goals, transactions, and user account creation. As these API endpoints would handle critical changes, such as communication to the database in the form of GET/POST/DELETE/PUT requests, we made sure to not disclose any sensitive information, such as restricting users to only being able to see transactions whose user id is their own account’s id. Furthermore, we added error handling to return the right status code and not divulge too much information about the specific error encountered to mitigate security risks.

### MongoDB
MongoDB was used for persistent data storage of our application, in particular saving a user’s login info, their budget goals and transactions, to name a few. This allows user data to persist, even if an error were to occur that would cause the application server to restart. In addition, we used Mongoose to ensure that each field was the right type, and to restrict it so that required fields were filled in before records can be added.

### Builds and Deployment
We used Render to deploy our application, allowing anyone on the Internet to access our application using their own account that they can create. By deploying on the cloud, this allows us to save on hosting costs, as well as not requiring our own technical infrastructure to have sufficient compute power.

## Above and Beyond Functionality
In this project, we also wanted to learn something new. We took some time to research the concept of time series forecasting, which could be used to predict future values based on historical data. We found a couple methods, such as Holt’s trend, Holt-Winters exponential smoothing and the ARIMA model. After conducting some preliminary analysis, we decided to use simple exponential smoothing with an alpha value of  to predict future spendings, broken down into categories. 

## Next Steps
To further improve the app in the future, we would like to add more statistics to our dashboard and allow users to choose different time ranges for each dashboard component. Furthermore, we could also allow more flexibility by letting users add their own custom transaction types and giving them the option to customise what data they want to see on their dashboard. A “forgot password” feature would also be beneficial, where a user can then receive an email with a link to reset their password. A user profile page would also allow a user to view and customize their own account info.

## Contributions

Kevin: One of the core components that Kevin worked on was the Redux actions, specifically for transaction items, to ensure that transactions could be added, updated and removed from the Redux store and displayed on the frontend. He also developed the bulk of the budget goals functionality, including the React table component that displayed the goals and all the Redux actions and API endpoints for adding, modifying, getting and deleting budget goals, which communicated with the MongoDB database. 

Rebecca: Rebecca contributed to the implementation of frontend React components such as the transaction component as well as add/update/delete transaction item components. She also did the frontend component for displaying top spending categories as well as the required endpoint for obtaining that info from the backend database. Another section that she worked on was setting up the backend database with MongoDB and other minor UIs of the transaction table. 

Philly: Philly primarily worked on setting the direction of the project (ideas and goals), working on dev tools, and building the deployment pipelines. Philly led building user authentication to ensure secure logins and separation of data while maintaining clean code across the codebase. Philly also contributed in other areas in supporting other team members and also improving the UX of the app.

Chinchin: A main feature that Chinchin worked on was the bulk uploading functionality; specifically, she implemented the logic for parsing a CSV file into a list of transactions and created a ‘mapping’ modal which allows users to select the column of a CSV file that they want to map to each field of a transaction. She was also responsible for populating the ‘Daily Transactions’ and ‘Spending Categories’ graphs by converting all transactions to use the same currency, then transforming the data into data structures that can be used by the Bar and Pie chart components. She also developed the UI components for the sign in and sign up pages.

Valery: Valery worked mostly on implementing the stretch goal to predict future spendings, which included a lot of researching and learning ways to forecast a time series: after tuning the parameters to create a model that suits the project’s scope and requirements, she also used said model to show forecasted spendings on the dashboard. She generated about a hundred dummy data points using the help of online tools such as chatGPT, which she then cleaned, transformed and formatted so that a dummy test account could be used to aid in testing the functionality of the other tasks. She also helped set up tools such as task boards to help facilitate the team’s progress tracking. 

## Accessing the Application
This project has been deployed and can be accessed via the following link: https://financetracker-htyc.onrender.com/

## Prototypes
### Dashboard Prototype
![Dashboard_Prototype](https://github.com/chin9/FinanceTracker/assets/55860881/3a87d7ae-697c-4ec8-9778-ede283df9a2b)
### Transactions Page Prototype
![IMG_48B14423E544-1](https://github.com/chin9/FinanceTracker/assets/64379928/d860dcb9-eb36-4895-93c5-fda14a384530)
