import { NextResponse } from "next/server";
import { pusherServer } from "@root/lib/pusher";

export async function POST(request: Request) {        
    const body = await request.json();

    try {        
        await pusherServer.trigger(body.gameId, "receiveNumRounds", body.numRounds)
            .catch((error: any) => {
                console.log(error);
            });
        
            return new NextResponse('numRounds sent', { status: 200 });

    } catch(error) {
        console.error("Error in sending numRounds") 
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};