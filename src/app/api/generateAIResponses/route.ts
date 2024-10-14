import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const openai = new OpenAI();

  try {
    const body = await request.json();
    const questions: string[] = body.questions;

    const responseCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `For each of the questions in this array, generate a response that a normal person might respond with: ${questions}. 
          Put each response into an array of strings and make sure that the responses are placed in the array in the same order as the corresponding questions. In the response ONLY return the array, no other text.
          Please limit each response to a maximum of 100 characters.`,
        },
      ],
      temperature: 1.5,
      max_tokens: 80 * questions.length,
    });

    const responseContent = responseCompletion.choices[0].message.content;
    console.log(responseContent);
    const responsesArray = JSON.parse(
      responseContent!.replace(/```json\s*|\s*```/g, "")
    );
    console.log(responsesArray);
    if (
      !Array.isArray(responsesArray) ||
      !responsesArray.every((q: string) => typeof q === "string")
    ) {
      throw new Error("Response content is not a valid array of strings");
    }

    return NextResponse.json({ response: responsesArray });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
