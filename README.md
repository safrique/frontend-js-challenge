![alt text](src/assets/img/suade_logo_circle_solid_red.svg "Suade Labs logo")
# Suade Labs Frontend JavaScript Challenge

> Created by Josef van Niekerk

![alt text](src/assets/img/sfq-full.png "safrique logo")

> The code for this application is available under the MIT license and can be accessed at my
>[GitHub frontend-js-challenge repository](https://github.com/safrique/frontend-js-challenge "frontend-js-challenge on safrique's GitHub repos")

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run the unit tests
npm run test

# this app is not yet in and has not been prepared for production
```

## Design considerations
I chose the Technology 1 (VueJS + VueX + vue router) and Scenario 1 (Visualisation Dashboard) options for this project.
The application is a Single Page Application (SPA) with tabs for each of Table, Charts, Map and Instructions sections
. See the Instructions tab and below for more information.

#### VueJS
VueJS was used to build the SPA with components for individual sections and functionality.

#### VueX
VueX was used to manage the centralised state of data.

#### Vue router
Each tab can be accessed by adding the `/charts`, `/map` or `/instructions` extensions to the root URL. The root URL
 points to the Table tab. Vue Router was used to manage these routes.

#### Visualise the data on a pie chart
A pie chart was included under the Charts tab.

#### Visualise the data on a bar chart
A bar chart was also included under the Charts tab.

#### Dynamic interactions between the charts
The PieChart component includes a dropdown list from which different data types can be selected for display. When the
 displayed data type is changed, the PieChart emits an event that will in turn instruct the BarChart component to get
  the relevant data from the VueX store and change to displaying this data.

#### Edit the data with a table or modal
Under the Table tab, data can be edited and people can be added and deleted. Please see the Instructions tab for more
 information.

#### Add a geographical chart
A map showing the location of each person in the world is included under the Map tab. Please see the Instructions tab
 for more information.
 **_Note:_** _The given locations seem to be randomly generated, causing the bullets indicating people's locations to
  be scattered randomly around the globe, including in the middle of the ocean._

#### Tests
A few unit tests have been included to test the API and Helpers functions. A limited number of tests have been
 included due to time constraints. Usually my approach to software engineering would be to include unit test for all
  functions as well as integration and e2e tests.

#### External Libraries
1. [Element-UI](https://element.eleme.io "Element-UI Website") was used for custom elements and CSS, e.g. the data
 table, dropdown select list, tabs etc.
1. [AmCharts](https://www.amcharts.com "AmCharts Website") was used for the charts and map.
