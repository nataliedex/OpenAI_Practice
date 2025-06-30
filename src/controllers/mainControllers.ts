import {  Request, Response, raw } from "express";
import { getDirections } from "../openai";

const mainController = {
    getIndex: async(req: Request, res: Response) => {
        try {
            res.render("index.ejs");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error getting the index.ejs");
            
        }
    },
    postTime: async(req: Request, res: Response) => {
        const { startLocation, endLocation, arrivalTime } = req.body;
        try {
            const departureTime = await getDirections(startLocation, endLocation, arrivalTime);
            res.render("departure.ejs", { departureTime });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error getting the time");
        }
    }
}

export default mainController;