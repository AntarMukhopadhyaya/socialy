import {GoogleGenerativeAI} from "@google/generative-ai";
console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export default genAI;