import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

export async function PATCH(request: Request) {        
    const body = await request.json();

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

    try {
        await updateUserIsReady(); 

        pusherServer.trigger(body.gameId, "checkAllReady", null)
            .catch((error) => {
                console.log(error);
            });

        return NextResponse.json({});

    } catch(error) {
        console.error("error in updating userResponse") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
};