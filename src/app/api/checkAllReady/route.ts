import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    try {
        const users = await findUsers(body.gameId); 
        const isReadyArray = users.map(user => user.isReady);          
        
        const isAllReady = isReadyArray.every((bool) => bool === true);
        
        return NextResponse.json({ response: isAllReady });

    } catch(error) {
        console.error("Error checking all ready") 
        return new NextResponse('Database Error', { status: 500 });
    };

    async function findUsers(gameId: string) {        
        const users = await prisma.user.findMany({
            where: {
                gameId: gameId                
            }
        });       
        return users;
    };

};