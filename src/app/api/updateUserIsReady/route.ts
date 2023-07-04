import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

export async function POST(request: Request) {        
    const body = await request.json();

    try {
        await updateUserIsReady(body.readyStatus); 
        
        if (body.readyStatus === true) {
            await pusherServer.trigger(body.gameId, "checkAllReady", body.nextGamePeriod)
                .catch((error: any) => {
                    console.log(error);
                });        
        };  

        return new NextResponse('Updated user ready status', { status: 200 });

    } catch(error) {
        console.error("error in updating userIsReady") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
    
    async function updateUserIsReady(readyStatus: boolean) {        
        await prisma.user.update({
            where: {
                id: body.userId 
            },
            data: {
                isReady: readyStatus
            }
        });         
    };
};