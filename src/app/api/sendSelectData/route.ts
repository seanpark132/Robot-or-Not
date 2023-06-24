import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

export async function POST(request: Request) {        
    const body = await request.json();

    try {        
        const user = await findUser();
        const receiverId = user?.sendToUserId;      

        pusherServer.trigger(body.gameId, "receiveSelectData", {receiverId: receiverId, selectData: body.selectData})
            .catch((error) => {
                console.log(error);
            });
        
        return NextResponse.json({});

    } catch(error) {
        console.error("error in sending selectData") 
        return new NextResponse('InternalError', { status: 500 });
    };

    async function findUser() {        
        const user = await prisma.user.findFirst({
            where: {
                id: body.userId
            }   
        });       
        return user;
    };
};