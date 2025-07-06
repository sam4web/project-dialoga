import express, { Request, Response } from "express";

const router = express.Router();

router.get(["/", "/index"], (request: Request, response: Response) => {
  if (request.accepts("text")) {
    response.type("text").send("Welcome to project-dialoga.");
    return;
  }
  response.json({ message: "Welcome to project-dialoga." });
});

export default router;
