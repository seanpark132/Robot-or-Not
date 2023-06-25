import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

export async function POST(request: Request) {        
    const body = await request.json();

    try {
        await updateUserIsReady(); 
        
        if (body.readyStatus === true) {
            pusherServer.trigger(body.gameId, "checkAllReady", body.nextGamePeriod)
            .catch((error: any) => {
                console.log(error);
            });
        };  

        return NextResponse.json({});

    } catch(error) {
        console.error("error in updating userIsReady") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
    
    async function updateUserIsReady() {        
        await prisma.user.update({
            where: {
                id: body.userId 
            },
            data: {
                isReady: body.readyStatus
            }
        });         
    };
};