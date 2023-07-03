import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();  

    try {       
        const users = await findUsers(); 
        const userIds = users.map(user => user.id);  
        const numRounds = body.questions.length / userIds.length;
        const assignedUserIds = userIds.flatMap((userId) => Array(numRounds).fill(userId));  // if userIds = [a, b, c] and numRounds = 5, generate [a,a,a,a,a, b,b,b,b,b, c,c,c,c,c]
        
        await Promise.all(assignedUserIds.map(async (id, i) => {
            await addGameData(body.questions[i], body.responses[i], id)
        }));
        
        return new NextResponse('Added GameData', { status: 200 });

    } catch(error) {
        console.error("error in adding gameData");
        return new NextResponse('Database Error', { status: 500 });
    };

    async function findUsers() {        
        const users = await prisma.user.findMany({
            where: {
                gameId: body.gameId                
            }
        });       
        return users;
    };

    async function addGameData(question: string, aiResponse: string, userId: string) {        
        await prisma.gameData.create({
            data: {
                question: question,
                aiResponse: aiResponse,
                gameId: body.gameId, 
                userId: userId
            }
        });              
    };
};

    