import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

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

        pusherServer.trigger(body.gameId, "updateNames", names)
            .catch((error) => {
                console.log(error);
            });
        
        return NextResponse.json({});

    } catch(error) {
        console.error("error in retrieving names") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
};