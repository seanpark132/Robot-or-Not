import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) { 

  const body = await request.json();

  try {
    const questionCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: 
        [{"role": "user", "content": `Generate a random question that people and ChatGPT would have unique responses to, limited to 20 words. 
        Do not generate a controversial question that ChatGPT would not be able to answer. Here are two examples:
        If you could only eat one food for the rest of your life, what would it be? 
        If you could have dinner with any historical figure, who would it be?`}],
      temperature: 1.5,
      n: body.numQuestions,
      max_tokens: 80           
    });
  
    const choices = questionCompletion.data.choices; 
    const questions = destructureChoices(choices);  

    return NextResponse.json({ response: questions });
    
  } catch(error) {
    console.error("Error in generating questions (OpenAI API)");
    return new NextResponse('Internal Server Error', { status: 500 });
  };  
};

// interface Message {
//   role: string;
//   content: string;
// };

// interface Choice {
//   message: Message;
//   finish_reason: string;
//   index: number
// };

function destructureChoices(choices: any) {
  let questions = []
  for (let i = 0; i < choices.length; i++) {
    questions.push(choices[i].message.content)
  };
  return questions;
};

