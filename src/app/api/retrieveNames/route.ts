import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    async function findUsers() {        
        const users = await prisma.user.findMany({
            where: {
                gameId: body.gameId                
            }
        });       
        return users;
    };

    try {
        const users = await findUsers(); 
        const names = users.map(obj => obj.nickname);       

        return NextResponse.json({response: names});

    } catch(error) {
        console.error("error") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
};