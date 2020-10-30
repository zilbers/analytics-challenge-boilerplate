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
declare function allEvents():Event[]
```
### /all-filtered?
returns all events in an array:
```typescript
interface Filter {
  sorting: string;
  type: string;
  browser: string;
  search: string;
  offset: number;
}
const filters: Filter = req.query;
declare function allEvents():Event[]
```
});

router.get(/by-days/:offset, (req: Request, res: Response) => {
});

router.get(/by-hours/:offset, (req: Request, res: Response) => {
});

router.get(/today, (req: Request, res: Response) => {
});

router.get(/week, (req: Request, res: Response) => {
});

router.get(/retention, (req: Request, res: Response) => {
});
router.get(/:eventId,(req, res) => {
});
```


export default router;
