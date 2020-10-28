///<reference path="types.ts" />

import express from "express";
import { Request, Response } from "express";
import {
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

interface Filter {
  sorting: string;
  type: string;
  browser: string;
  search: string;
  offset: number;
}

router.get("/by-days/:offset", (req: Request, res: Response) => {
});

router.get("/by-hours/:offset", (req: Request, res: Response) => {
});
router.get("/today", (req: Request, res: Response) => {
});
router.get("/week", (req: Request, res: Response) => {
});

router.get("/all", (req: Request, res: Response) => {
});

router.get("/all-filtered", (req: Request, res: Response) => {
});

router.get("/:eventId",(req, res) => {
});

router.get("/retention", (req: Request, res: Response) => {
});

export default router;
