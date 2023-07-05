import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) { 

  try {
    const body = await request.json();    
    const gameInfo = await findGameInfo(body.gameId);
    const numRounds = gameInfo?.rounds;
    const numPlayers = gameInfo?.numPlayers;
    const totalQuestions = numRounds! * numPlayers!;    

    const questionCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: 
        [{"role": "user", "content": `Generate 1 random question that people and ChatGPT would have unique responses to, limited to 150 characters. 
        Do not generate a controversial question that ChatGPT would not be able to answer. Here are two examples:
        If you could only eat one food for the rest of your life, what would it be? 
        If you could have dinner with any historical figure, who would it be?`}],
      temperature: 1.4,
      n: totalQuestions,
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

async function findGameInfo(gameId: string) {
  const gameInfo = await prisma.game.findFirst({
    where: {
      id: gameId
    }
  });

  return gameInfo
};

function destructureChoices(choices: any) {
  let questions = []
  for (let i = 0; i < choices.length; i++) {
    questions.push(choices[i].message.content)
  };
  
  return questions;
};

