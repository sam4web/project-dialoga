import express, { Request, Response } from "express";

const router = express.Router();

// @route /api
// @method GET
router.get(["/", "/index"], (request: Request, response: Response) => {
  if (request.accepts("text")) {
    response.type("text").send("Welcome to dialoga chat app.");
    return;
  }
  response.json({ message: "Dialoga chat app" });
});

export default router;
