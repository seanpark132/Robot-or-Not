import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    try {
        const body = await request.json();   

        const generateAll = await Promise.allSettled(
            body.questions.map(async (question: string) => {
                try {                    
                    const response = await generateResponse(question);
                    return response;
                } catch(error) {
                    console.error(error);
                    return "Error in generating a response";
                }
            })
        );     
        
        const allResponses = generateAll.map((obj: any) => {
            if (obj.value) {
                return obj.value;
            } else {
                return obj.reason;
            }
        });
       

        return NextResponse.json({ response: allResponses });
    } catch (error) {
        console.error(error); 
        return new NextResponse("Internal server error", { status: 500 });
    }
};

async function generateResponse(question: string) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            reject("Error in generating a response");
        }, 9000);

        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Generate a common response to the question using basic vocabulary: ${question}. Please limit the response to 20 words.`,
                },
            ],
            temperature: 1.5,
            n: 1,
            max_tokens: 80,
        })
        .then((responseCompletion) => {
            clearTimeout(timeout);
            const choices = responseCompletion.data.choices;
            const response = choices[0].message?.content;
            const aiResponse = response?.replace(/"/g, "");
            resolve(aiResponse);
        })
        .catch((error) => {
            clearTimeout(timeout);            
            reject("Error in generating a response");
        });
    });
}
