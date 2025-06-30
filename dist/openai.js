"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirections = getDirections;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function getDirections(startLocation, endLocation, arrivalTime) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userPrompt = `
    I am leaving from ${startLocation} and I am driving to ${endLocation}.  
    I would like to arrive at ${arrivalTime}.

    I need to know what time I should leave my ${startLocation} in it's time zone to arrive at the ${endLocation} at ${arrivalTime} using the ${endLocation} time zone.

    Please format the response like this: HH:MM AM or PM
    `;
        const response = yield openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful trip planner" },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
        });
        return (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
    });
}
