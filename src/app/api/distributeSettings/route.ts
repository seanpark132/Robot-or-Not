import { NextResponse } from "next/server";
import { pusherServer } from "../../../../lib/pusher";

export async function POST(request: Request) {        
    const body = await request.json();

    try {        
        pusherServer.trigger(body.gameId, "receiveSettings", body.settings)
            .catch((error: any) => {
                console.log(error);
            });
        
        return NextResponse.json({});

    } catch(error) {
        console.error("error in distributing settings") 
        return new NextResponse('InternalError', { status: 500 });
    };
};