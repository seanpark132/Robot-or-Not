import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();  

    async function initGame() {        
        await prisma.game.create({
            data: {
                id: body.gameId,
                rounds: 5,
                timer: true,
                timerSeconds: 30,
                isRandomized: false             
            }
        });                  
    };

    try {      
        await initGame();
        return new NextResponse("Initialized game", {status: 200});

    } catch(error) {
        console.error("error"); 
        return new NextResponse('Database Error', { status: 500 });
    };
};