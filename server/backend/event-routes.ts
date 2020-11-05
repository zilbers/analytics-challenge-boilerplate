///<reference path="types.ts" />

import express from "express";
import { Request, Response } from "express";

// some useful database functions in here:
import {
  getAllEvents,
  getFilteredEvents,
  getEventsCountFilteredByOffset,
  createEvent,
  getEventsCountPerHour,
  getRetentionData,
} from "./database";
import { Event, weeklyRetentionObject } from "../../client/src/models/event";
import { ensureAuthenticated, validateMiddleware } from "./helpers";

import {
  shortIdValidation,
  searchValidation,
  userFieldsValidator,
  isUserValidator,
} from "./validators";
const router = express.Router();

// Routes

export interface Filter {
  sorting?: string;
  type?: string;
  browser?: string;
  search?: string;
  offset?: number;
}

router.get("/all", (req: Request, res: Response) => {
  try {
    const events = getAllEvents();
    res.send(events);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.get("/all-filtered", (req: Request, res: Response) => {
  try {
    const query: Filter = req.query;
    const events = getFilteredEvents(query);
    res.send(events);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.get("/by-days/:offset", (req: Request, res: Response) => {
  try {
    const offset = Number(req.params.offset);
    const eventCount = getEventsCountFilteredByOffset(offset);
    res.send(eventCount);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.get("/by-hours/:offset", (req: Request, res: Response) => {
  try {
    const offset = Number(req.params.offset);
    const eventCount = getEventsCountPerHour(offset);
    res.send(eventCount);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.get("/today", (req: Request, res: Response) => {
  res.send("/today");
});

router.get("/week", (req: Request, res: Response) => {
  res.send("/week");
});

router.get("/retention", (req: Request, res: Response) => {
  try {
    const { dayZero } = req.query;
    const userRetentionData = getRetentionData(Number(dayZero));
    res.send(userRetentionData);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.get("/:eventId", (req: Request, res: Response) => {
  res.send("/:eventId");
});

router.post("/", (req: Request, res: Response) => {
  try {
    const event: Event = req.body;
    createEvent(event);
    res.send("Created Event");
  } catch {
    res.status(500).send("An Error has happend");
  }
});

router.get("/chart/os/:time", (req: Request, res: Response) => {
  res.send("/chart/os/:time");
});

router.get("/chart/pageview/:time", (req: Request, res: Response) => {
  res.send("/chart/pageview/:time");
});

router.get("/chart/timeonurl/:time", (req: Request, res: Response) => {
  res.send("/chart/timeonurl/:time");
});

router.get("/chart/geolocation/:time", (req: Request, res: Response) => {
  res.send("/chart/geolocation/:time");
});

export default router;
