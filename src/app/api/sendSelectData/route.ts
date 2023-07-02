import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

export async function POST(request: Request) {        
    const body = await request.json();

    try {        
        const user = await findUser();
        const receiverId = user?.sendToUserId;      

        await pusherServer.trigger(body.gameId, "receiveSelectData", {receiverId: receiverId, selectData: body.selectData})
            .catch((error: any) => {
                console.log(error);
            });
        
        return new NextResponse('Sent SelectData', { status: 200 });

    } catch(error) {
        console.error("Error in sending selectData") 
        return new NextResponse('Internal Server Error', { status: 500 });
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