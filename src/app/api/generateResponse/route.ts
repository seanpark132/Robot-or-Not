import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {  

    const json = await request.json();
    const question = json.prompt;
    try {     
        const responseCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: 
                [{
                    "role": "user", 
                    "content": `Generate a common response to the question: ${question}, using 1 to 30 words with basic vocabulary. `                    
                }],
            temperature: 1.5,  
            n: 1,
            max_tokens: 120         
        });

        const choices = responseCompletion.data.choices;
        const response = choices[0].message?.content;            
        const aiResponse = response?.replace(/"/g, '')   // Sometimes Chat Completion API wraps response in "" 
        console.log("generated a response")
        return NextResponse.json({response: aiResponse}); 
         
    } catch(error) {
        console.error("An error has occured when generating a response (OpenAI API)")
        return NextResponse.json({ response:"Error in generating a response.", status: 500 });
    }
};


