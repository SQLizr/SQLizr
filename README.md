# SQlizr
### A semantic management management tool for SQL
![alt logo](https://user-images.githubusercontent.com/34523493/192654338-e3f8b798-cb97-4878-befd-dacd6265bc15.png)

## The Problem
Complex data metrics are often stored and related in complicated ways. This means that the same metric can be defined and/or queried with slight deviations that can change the output. These deviations can lead to a disruption in the cross-team data pipeline. 

## The Solution
SQLizr is a web app that allows organizations to store and share frequently used SQL queries across teams. Using a two-tiered authoriztion system, "admin" level users have the ability to create new query strings and save these queries, while all users have the ability to search for queries that they need. 

## What is currently done
- Frontend: React Router set up, Login/SignUp/Dashboard page navigation
- Rudimentary check for user logged in status, check for incorrect login credentials, check for already taken username for signup
- Filtering of queries (favorites, HTTP request type, metric string)
- Most backend api endpoints have been created
- SQL database set up with user_data, query_data tables

## What needs to be implemented
- bcrypt/better encryption of user data handling
- favorites, filtering by tags filtering
- rerender component after a new request has been completed (filter/add/delete query cards)
- only display query cards that user has proper authorization level
- user authorization level handling (admin user's ability to edit authorization level of other users)

## Stretch Goals
- User and Query Database per Organization (SSO login)
- Query string validation for admin users before adding a new query data
- Ability for users to link their database?? (and query directly from the site?)
