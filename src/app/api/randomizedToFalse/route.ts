import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    try {           
        const game = await findGame();            
        if (game!.isRandomized === false) {
            return NextResponse.json({});
        };
               
        await updateIsRandomized();       
       
        console.log("set isRandomized to false")                     
        return NextResponse.json({});
    } catch(error) {
        console.error("error in setting isRandomized to false") 
        return new NextResponse('DatabaseError', { status: 500 });
    };

    async function findGame() {        
        const game = await prisma.game.findFirst({
            where: {
                id: body.gameId
            }   
        });       
        return game;
    };

    async function updateIsRandomized() {
        await prisma.game.update({
            where: {
                id: body.gameId
            },
            data: {
                isRandomized: false
            }
        });
    };
};