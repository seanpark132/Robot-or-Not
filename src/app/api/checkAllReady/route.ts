import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    try {
        const users = await findUsers(); 
        const isReadyArray = users.map(user => user.isReady);          
        
        const isAllReady = isReadyArray.every((bool) => bool === true);
        
        return NextResponse.json({response: isAllReady});

    } catch(error) {
        console.error("error checking all ready") 
        return new NextResponse('DatabaseError', { status: 500 });
    };

    async function findUsers() {        
        const users = await prisma.user.findMany({
            where: {
                gameId: body.gameId                
            }
        });       
        return users;
    };

};