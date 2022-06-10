# NGRX-Grid-Project

Project Goal:
NGRX-Grid-Project, while still a work in progress, is meant to simulate retrieving data from backend services doing data transformations and displaying that data within an ag-grid.

## What I accomplished:
- I implemented NgRx on the front-end. I implemented an ag-grid that could add, delete, and update rows. The difference column could change color depending on whether or not
its value was >= 0 or < 0. 
-Filtering, sorting and searching works. These were provided by ag-grid
- Anytime a CRUD action was called on the front-end from the component, the action was sent to the reducer which was in turn used to update the store. The data in the store would be selected by the selector and then rendered within the component.    
- I created an express server and a MongoDb database for my backend and set up functional rest api's to properly manage data on the backend and tested them using Postman.

## What I'm currently struggling with:
- When it came time to connect my front-end and backend, bugs became very noticeable. 
  - Currently, while data from the backend loads into the ag-grid, adding rows and updating data doesn't work. Short attempts at debugging so far have shown me that adding a row attempts to add multiple rows and updating data seems to be trying to update the changed data with its previous values (ultimately updating nothing). 
  - My api's are working properly in postman, so I believe the issue is in my NgRx implementation.

A snapshot of the project so far (I know, not the best looking yet):

![image](https://user-images.githubusercontent.com/43007609/173094844-0ee8208d-f832-42e8-bb27-29a08e57473f.png)


## What Comes Next:
- I need to fix my NgRx implementation and get data adding and updating properly.
- I need to implement random data updating every 250 ms on the backend. I'm thinking I do this once I get my data on the front end, before it is sent to the store but open to ideas. (I investigated MongoDb Triggers but it looked like scheduled triggers could only run at minimum 1 minute at a time)  

NgRx is a framework for building reactive applications in Angular inspired by Redux.

Key NgRx concepts: 
- Actions describe unique events that are dispatched from components and services.
- State changes are handled by pure functions called reducers that take the current state and the latest action to compute a new state.
- Selectors are pure functions used to select, derive and compose pieces of state.
- State is accessed with the Store, an observable of state and an observer of actions.

The diagram below represents the general flow of the application state in NgRx.
![image](https://user-images.githubusercontent.com/43007609/173082155-6ceb7daa-9242-49c5-bc62-420cbaec48d1.png)


