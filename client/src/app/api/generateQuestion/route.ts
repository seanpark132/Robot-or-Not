import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {  

  try {
    const questionCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: 
        [{"role": "user", "content": `Generate a random question that people and ChatGPT would have unique responses to, limited to 30 words. Here are two examples:
        What is a funny joke?   
        If you could have dinner with any historical figure, who would it be?`}],
      temperature: 1.5,
      n: 5,
      max_tokens: 1100   
    });
  
    const choices = questionCompletion.data.choices; 
    const questions = destructureChoices(choices);  

    return NextResponse.json({response: questions});
    
  } catch(error) {
    console.error("An error has occured when generating questions (OpenAI API)");
    return;
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

