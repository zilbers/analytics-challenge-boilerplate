# Event routes:
keep in mind:
```typeScript
interface event{
   _id: string;
  session_id: string;
  name: eventName;
  url: string;
  distinct_user_id: string;
  date: number;
  os: os;
  browser: browser;
  geolocation: GeoLocation;
  }

type eventName = "login" | "signup" | "pageView";
type os = "windows" | "mac" | "linux" | "ios" | "android" | "other";
type browser = "chrome" | "safari" | "edge" | "firefox" | "ie" | "other";
type GeoLocation = {
  location: Location;
  accuracy: number;
};
type Location = {
  lat: number;
  lng: number;

  
};
```
### /all
returns all events in an array:
```typescript
declare function allEvents():event[]
```

### /all-filtered !incomplete!

__what does it do?__

```typescript
interface Filter {
  sorting: string;
  type: string;
  browser: string;
  search: string;
  offset: number;
}
const filters: Filter = req.query;
declare function allEvents():event[]
```
});

## /by-days/:offset !incomplete!

## /by-hours/:offset !incomplete!

## /today
gets events from the last 24 hours
```typescript
declare function getToday() : event[] 
```
## /week
gets events from the last 7 days
```typescript
declare function getWeek() : event[] 
```

## /retention
return the an array of objects with User retention Information for every week since launch.
For every week, what percent of the users that signed up on that week have logged in to the site on every consecutive week.
```typescript
interface weeklyRetentionObject {
  registrationWeek:number;  //launch is week 0 and so on
  newUsers:number;  // how many new user have joined this week
  weeklyRetention:number[]; // for every week since, what percentage of the users came back. weeklyRetention[0] is always 100% because it's the week of registration  
  start:string;  //date string for the first day of the week
  end:string  //date string for the first day of the week
}
let week0Retention : weeklyRetentionObject = {
  registrationWeek: 1, 
  newUsers: 34, 
  weeklyRetention:[100,24,45,66,1,80],  // here we see there were 7 in total since week 1 has data for 6 weeks 
  start:'01/11/2020',
  end: '07/11/2020'
} 

declare function getRetentionCohort() : weeklyRetentionObject[]
```

## /:eventId
return an event by its Id
```typescript
declare function getEventById():event
```

## /chart/os/:time

## /chart/pageview/:time

## /chart/timeonurl/allusers

## /chart/timeonurl/inhours

## /chart/timeonurl/:time

## /chart/geolocation/:time
