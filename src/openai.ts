import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getDirections(startLocation: string, endLocation: string, arrivalTime: string) {
    const userPrompt = `
    I am leaving from ${startLocation} and I am driving to ${endLocation}.  
    I would like to arrive at ${arrivalTime}.

    I need to know what time I should leave my ${startLocation} in it's time zone to arrive at the ${endLocation} at ${arrivalTime} using the ${endLocation} time zone.

    Please format the response like this: HH:MM AM or PM
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o", 
        messages: [
            { role: "system", content: "You are a helpful trip planner"},
            { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
    });
    return response.choices[0].message?.content;
}