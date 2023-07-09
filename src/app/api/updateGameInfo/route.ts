import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    try {
        await updateGameInfo(body.gameId, body.numPlayers, body.numRounds);    

        return new NextResponse('Updated numPlayers', { status: 200 });

    } catch(error) {
        console.error("error in updating numPlayers") 
        return new NextResponse('DatabaseError', { status: 500 });
    };

    async function updateGameInfo(gameId: string, numPlayers: number, numRounds: number) {        
        await prisma.game.update({
            where: {
                id: gameId        
            },
            data: {
                numPlayers: numPlayers,
                rounds: numRounds
            }
        });         
    };
};