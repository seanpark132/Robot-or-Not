import { NextResponse } from "next/server";
import { pusherServer } from "@root/lib/pusher";

export async function POST(request: Request) {        
    const body = await request.json();

    try {        
        await pusherServer.trigger(body.gameId, "receiveSettings", body.settings)
            .catch((error: any) => {
                console.log(error);
            });
        
            return new NextResponse('Settings distributed', { status: 200 });

    } catch(error) {
        console.error("Error in distributing settings") 
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};