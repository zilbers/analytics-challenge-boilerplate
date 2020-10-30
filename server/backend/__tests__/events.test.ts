import { mockData } from "./mock_data";
import request from "supertest";
import app from "../app";
import db from "../database";
import { Event as event,os } from "../../../client/src/models/event";

 const isEvent = (event : any ): event is event => {
   if(
    '_id' in event&&
    'session_id' in event&&
    'name' in event&&
    'url' in event&&
    'distinct_user_id' in event&&
    'date' in event&&
    'os' in event&&
    'browser' in event&&
    'geolocation' in event
    ){
      return true
    }else{
      return false
    }
}

const isEventArray = (events: any[]): events is event[] => {
  return events.every(eve=>isEvent(eve))
}

describe("main test", () => {

  beforeAll(async (done) => {
    db.setState(mockData).write()
    done()
  })

  it("can get all events", async () => {
    
    const { body: allEvents } = await request(app).get("/events/all").expect(200);
    expect(allEvents.length).toBe(250);
  });

  it("getting all events from the server must return array of event types", async () => {
    const { body: allEvents } = await request(app).get("/events/all").expect(200);
    expect(isEventArray(allEvents)).toBe(true);
  });

  it("can post new event", async () => {
    await request(app).post("/events").send(mockData.events[0]).expect(200);
    const { body: allEvents2 } = await request(app).get("/events/all").expect(200);
    expect(allEvents2.length).toBe(251);
    expect(allEvents2[250].date).toBe(mockData.events[0].date);
    expect(allEvents2[250].os).toBe(mockData.events[0].os);
  });

  it("can get unique sessions count by day", async () => {
    const { body: sessionsByDays } = await request(app).get("/events/by-days/0").expect(200)

    expect(sessionsByDays.length).toBe(7)
    expect(sessionsByDays.reduce((sum: number, day: {date: string; count: number}) => sum += day.count, 0)).toBe(48)
    expect(sessionsByDays[0].count).toBe(7);

    const { body: sessionsByDays2 } = await request(app).get("/events/by-days/7").expect(200)

    expect(sessionsByDays2.length).toBe(7)
    expect(sessionsByDays2.reduce((sum: number, day: {date: string; count: number}) => sum += day.count, 0)).toBe(52)
    expect(sessionsByDays2[0].count).toBe(7);
    expect(sessionsByDays2[1].count).toBe(8);
    expect(sessionsByDays2[6].count).toBe(7);
  });

  it.skip("can get unique sessions count by hour", async () => {
    const { body: sessionsByHours } = await request(app).get("/events/by-hours/0").expect(200)

    expect(sessionsByHours.length).toBe(24)
    expect(sessionsByHours.reduce((sum: number, day: {date: string; count: number}) => sum += day.count, 0)).toBe(6)

    const { body: sessionsByHours2 } = await request(app).get("/events/by-hours/1").expect(200)

    expect(sessionsByHours2.length).toBe(24)
    expect(sessionsByHours2.reduce((sum: number, day: {date: string; count: number}) => sum += day.count, 0)).toBe(8)
  });
  
  //deleted timeoneurl tests
  const charts: string[] = ['os','pageview','geolocation']
  const timeRange: string[] = ['today','week','all']
  
  charts.forEach(chart => {
    timeRange.forEach(timeRange => {
      it.skip(`${chart} entry point can get ${timeRange} as a param to determine the wanted time range for the data`, async () => {
        const { body: events } = await request(app).get(`/events/chart/${chart}/${timeRange}`).expect(200);
        expect(events.length).not.toBe(0);
      }); 
    });
  });
  
  // it.skip("can get time of each URL for 'time on URL chart'", async () => {
  //   const { body: time } = await request(app).get("/chart/timeonurl/allusers").expect(200)
  //   const { body: timeIHours } = await request(app).get("/chart/timeonurl/inhours").expect(200)
  //   expect(time.length).toBe(7)
  //   expect(countBy((day) => day.count, time)).toBe(47)
  // });

  it.skip("retention cohort", async () => {

    const { body: retentionData } = await request(app).get("/events/retention").expect(200);
    expect(retentionData.length).toBe(6);

    expect(retentionData[0].weeklyRetention.slice(0,3)).toEqual([100, 27, 18]);
    expect(retentionData[1].weeklyRetention.slice(0,2)).toEqual([100, 57]);
    expect(retentionData[2].weeklyRetention[0]).toBe(100);

    expect(retentionData[1].weeklyRetention[4]).toBe(0);

  });
})