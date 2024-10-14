import OpenAI from "openai";
import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gameInfo = await findGameInfo(body.gameId);
    const numRounds = gameInfo?.rounds;
    const numPlayers = gameInfo?.numPlayers;
    const totalQuestions = numRounds! * numPlayers!;

    const questionCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Generate ${totalQuestions} random questions that people and ChatGPT would have unique responses to, limited to 150 characters each. Put each question as a string in an array. In the response ONLY return the array, no other text. 
        Do not generate a controversial question that ChatGPT would not be able to answer. Make sure that each question is different. Here are two examples:
        If you could only eat one food for the rest of your life, what would it be? 
        If you could have dinner with any historical figure, who would it be?`,
        },
      ],
      temperature: 1.4,
      max_tokens: 80 * totalQuestions,
    });

    const questions = JSON.parse(
      questionCompletion.choices[0].message.content!.replace(
        /```json\s*|\s*```/g,
        ""
      )
    );
    console.log(questions);

    if (
      !Array.isArray(questions) ||
      !questions.every((q: string) => typeof q === "string")
    ) {
      throw new Error("Response content is not a valid array of strings");
    }
    return NextResponse.json({ response: questions });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function findGameInfo(gameId: string) {
  const gameInfo = await prisma.game.findFirst({
    where: {
      id: gameId,
    },
  });

  return gameInfo;
}
