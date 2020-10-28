# Analytics Challenge

## Introduction

You will build analytics system that would present usage analytics about website by events sent to the platform.

## Getting Started

clone the repo https://github.com/cypress-io/cypress-example-kitchensink and build your project on top of it.


## Home Page Requirements:

 - Make the following layout for tiles and make it compatible with different tile sizes and different screen sizes.

![](https://i.imgur.com/gtPzvXP.jpg)
 - While loading data show loading indicator you built using canvas tag

### Tiles to present:
 - Showing events on Google Map (show number of events from area).
![](https://i.imgur.com/AOACrVj.png)
 - showing time per url per user
![](https://i.imgur.com/FSQEHo7.png)
 - showing time spent on each page by all users.
![](https://i.imgur.com/RFx8GFw.png)
 - showing graph with unique sessions by day with option to change date
![](https://i.imgur.com/EPPmDjq.png)
 - showing graph with unique sessions by hour with option to change date
![](https://i.imgur.com/6gJ7e1k.png)
 - showing retention cohort week by week
![How Startups Can Do Better Cohort Analyses – Philosophical Hacker](https://www.philosophicalhacker.com/images/cohort-analysis.png)
 - Showing log of all events - search option and filter by event name using regex.
![](https://i.imgur.com/hFlqDbG.png)
 - showing page views for on each page.
 - Showing pie charts with users by operating system usage.

## Backend Requirements:

 - POST "/event" - adding new event to event collection.
 - Any other entry point needed.
 - Use lowdb and create collection for the 'event' entity.
	Sample of events documents (you can add any other properties you wish):

      [
        	        {
        	        "_id": "vern685wo7gbtg8iwhw487oy",
        	         "session_id": "gehos8t4hlkros5",
        	         "name": "Signed Up",
        	         "distinct_user_id": "13793",
        	         "referred": "Friend",
        	         "time": 1371002000,
        	    	 "os": "windows",
        	    	 "browser": "chrome",
        	    	 "geolocation": {  
        	    		 "location":  {  "lat":  51.0,  "lng":  -0.1  },
        	    		 "accuracy":  1200.4,
        	    		}, 
        	        },
        	        {
        	        "_id": "vern685wo7gbtg8iwhw487oy",
        	         "session_id": "fsdawgwg35gsd5",
        	         "name": "Viewed Home page",
        	         "distinct_user_id": "13793",
        	         "referred": "Friend",
        	         "time": 1371002000,
        	    	 "os": "Android",
        	    	 "browser": "chrome",
        	    	 "geolocation": {  
        	    		 "location":  {  "lat":  51.0,  "lng":  -0.1  },
        	    		 "accuracy":  1200.4,
        	    		}, 
        	        },
        	    ]

## General Requirement

 - All system will be coded using Typescript.
 - Add Error Boundaries around each tile.
 - Use Styled Components for styling.
 - Make it responsive for any screen size.


## Bonuses
  - Make your own custom tiles.
  - Make the tiles resizable.
  - Make the tiles move by drag and drop.
  - Add any feature you wish
  
## Running Tests
// To be added

