import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const allResponses = await Promise.all(
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

        return NextResponse.json({ response: allResponses });
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal server error in generating responses.");
    }
}

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
            temperature: 1.3,
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
